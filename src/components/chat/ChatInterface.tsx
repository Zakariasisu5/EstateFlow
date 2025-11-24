import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickReplyButtons from "./QuickReplyButtons";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyDetail from "@/components/properties/PropertyDetail";
import BookingModal from "@/components/booking/BookingModal";
import { dummyProperties, Property } from "@/data/dummyProperties";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";

interface Message {
  id: string;
  text: string | React.ReactNode;
  isBot: boolean;
  timestamp: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const { toast } = useToast();
  const { streamChat, isStreaming } = useRealtimeChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Real Estate Concierge. 🏡 I'm here to help you find your dream home. What type of property are you looking for?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentBotMessageRef = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const initialQuickReplies = [
    "🏢 Apartment",
    "🏡 Family Home",
    "✨ Luxury Property",
    "🎨 Studio Loft",
  ];

  const addMessage = (text: string | React.ReactNode, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleBotResponse = async (userMessage: string) => {
    setShowQuickReplies(false);
    currentBotMessageRef.current = '';
    
    // Add user message to conversation history
    const newHistory: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];
    setConversationHistory(newHistory);

    // Create a temporary bot message that will be updated with streaming content
    const botMessageId = Date.now().toString();
    let botMessageContent = '';
    let propertyIdsToShow: string[] = [];

    const updateBotMessage = (content: string) => {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.id === botMessageId && lastMessage.isBot) {
          return prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: content }
              : msg
          );
        }
        return [
          ...prev,
          {
            id: botMessageId,
            text: content,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ];
      });
    };

    await streamChat({
      messages: newHistory,
      onDelta: (chunk) => {
        botMessageContent += chunk;
        currentBotMessageRef.current = botMessageContent;
        // Remove PROPERTIES: line from display
        const displayContent = botMessageContent.replace(/PROPERTIES:\s*\[[\d,\s]+\]/g, '').trim();
        updateBotMessage(displayContent);
      },
      onPropertyIds: (ids) => {
        propertyIdsToShow = ids;
      },
      onDone: () => {
        // Update conversation history with complete bot response
        const finalContent = botMessageContent.replace(/PROPERTIES:\s*\[[\d,\s]+\]/g, '').trim();
        setConversationHistory([
          ...newHistory,
          { role: 'assistant', content: finalContent }
        ]);

        // Show property cards if any were recommended
        if (propertyIdsToShow.length > 0) {
          const recommendedProperties = dummyProperties.filter(p => 
            propertyIdsToShow.includes(p.id)
          );

          setTimeout(() => {
            addMessage(
              <div className="space-y-3">
                {recommendedProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={() => {
                      setSelectedProperty(property);
                      setShowPropertyDetail(true);
                    }}
                    onBookTour={() => {
                      setSelectedProperty(property);
                      setShowBooking(true);
                    }}
                  />
                ))}
              </div>,
              true
            );
          }, 300);
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        updateBotMessage("I apologize, but I'm having trouble connecting right now. Please try again.");
      },
    });
  };

  const handleSend = () => {
    if (!inputValue.trim() || isStreaming) return;

    addMessage(inputValue, false);
    handleBotResponse(inputValue);
    setInputValue("");
  };

  const handleQuickReply = (option: string) => {
    addMessage(option, false);
    handleBotResponse(option);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          
          {isStreaming && <TypingIndicator />}
          
          {showQuickReplies && !isStreaming && (
            <QuickReplyButtons options={initialQuickReplies} onSelect={handleQuickReply} />
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-background/95 backdrop-blur p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about properties..."
              className="flex-1 rounded-full"
            />
            <Button
              onClick={handleSend}
              size="icon"
              disabled={isStreaming}
              className="rounded-full bg-primary hover:bg-primary-dark shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <PropertyDetail
        property={selectedProperty}
        open={showPropertyDetail}
        onClose={() => setShowPropertyDetail(false)}
        onBookTour={() => {
          setShowPropertyDetail(false);
          setShowBooking(true);
        }}
      />

      <BookingModal
        property={selectedProperty}
        open={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </>
  );
};

export default ChatInterface;
