import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Home } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import QuickReplyButtons from "./QuickReplyButtons";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyDetail from "@/components/properties/PropertyDetail";
import BookingModal from "@/components/booking/BookingModal";
import { dummyProperties, Property } from "@/data/dummyProperties";

interface Message {
  id: string;
  text: string | React.ReactNode;
  isBot: boolean;
  timestamp: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Real Estate Concierge. 🏡 I'm here to help you find your dream home. What type of property are you looking for?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  const handleBotResponse = (userMessage: string) => {
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      setIsTyping(false);

      if (userMessage.toLowerCase().includes("apartment") || userMessage.toLowerCase().includes("studio")) {
        const apartmentProperties = dummyProperties.filter(p => 
          p.title.toLowerCase().includes("apartment") || p.title.toLowerCase().includes("studio")
        );
        
        addMessage(
          "Great choice! Here are some beautiful apartments I found for you:",
          true
        );

        setTimeout(() => {
          addMessage(
            <div className="space-y-3">
              {apartmentProperties.map(property => (
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
        }, 500);
      } else if (userMessage.toLowerCase().includes("family") || userMessage.toLowerCase().includes("home")) {
        const familyProperties = dummyProperties.filter(p => 
          p.title.toLowerCase().includes("family") || p.bedrooms >= 3
        );
        
        addMessage(
          "Perfect for a family! Check out these spacious homes:",
          true
        );

        setTimeout(() => {
          addMessage(
            <div className="space-y-3">
              {familyProperties.map(property => (
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
        }, 500);
      } else if (userMessage.toLowerCase().includes("luxury") || userMessage.toLowerCase().includes("penthouse")) {
        const luxuryProperties = dummyProperties.filter(p => 
          p.title.toLowerCase().includes("luxury") || p.title.toLowerCase().includes("penthouse")
        );
        
        addMessage(
          "Excellent taste! Here are our premium luxury properties:",
          true
        );

        setTimeout(() => {
          addMessage(
            <div className="space-y-3">
              {luxuryProperties.map(property => (
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
        }, 500);
      } else {
        addMessage(
          "I'd love to help you find the perfect property! Here are all our available listings:",
          true
        );

        setTimeout(() => {
          addMessage(
            <div className="space-y-3">
              {dummyProperties.map(property => (
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
        }, 500);
      }

      setTimeout(() => {
        addMessage(
          "Would you like to see more properties or schedule a tour? 😊",
          true
        );
      }, 1000);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

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
          
          {isTyping && <TypingIndicator />}
          
          {showQuickReplies && !isTyping && (
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
              className="rounded-full bg-primary hover:bg-primary-dark shrink-0"
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
