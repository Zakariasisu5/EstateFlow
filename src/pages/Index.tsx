import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import ChatInterface from "@/components/chat/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Estate Concierge</h1>
          </div>
          <LanguageSelector />
        </header>
        <ChatInterface />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-lg animate-scale-in">
            <Home className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Find Your Dream Home
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Welcome to your personal Real Estate Concierge! Let's explore beautiful properties together and find the perfect place for you. 🏡
          </p>
        </div>

        <div className="space-y-4">
          <LanguageSelector />
          
          <Button
            onClick={() => setShowChat(true)}
            size="lg"
            className="w-full max-w-xs rounded-full bg-primary hover:bg-primary-dark text-lg py-6 shadow-lg hover:shadow-xl transition-all animate-scale-in"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Exploring
          </Button>

          <p className="text-sm text-muted-foreground">
            Available 24/7 • Multilingual Support • Virtual Tours
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-8">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-2xl">🏢</div>
            <p className="text-xs text-muted-foreground">Apartments</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-2xl">🏡</div>
            <p className="text-xs text-muted-foreground">Family Homes</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="text-2xl">✨</div>
            <p className="text-xs text-muted-foreground">Luxury</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
