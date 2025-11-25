import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import ChatInterface from "@/components/chat/ChatInterface";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <ThemeToggle />
        <header className="border-b bg-card/50 backdrop-blur px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Home className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-semibold">EstateFlow</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/properties")}
              className="gap-2"
            >
              <Building2 className="w-4 h-4" />
              Browse Properties
            </Button>
          </div>
          <LanguageSelector />
        </header>
        <ChatInterface />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent flex items-center justify-center p-4">
      <ThemeToggle />
      <div className="max-w-lg w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-lg animate-scale-in">
            <Home className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Find Your Dream Home Worldwide 🌍
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Welcome to EstateFlow! Your personal Real Estate Concierge for properties across the globe. From New York to Accra, London to Lagos - let's find your perfect home! 🏡
          </p>
        </div>

        <div className="space-y-4">
          <LanguageSelector />
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setShowChat(true)}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary-dark text-lg py-6 shadow-lg hover:shadow-xl transition-all animate-scale-in"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with AI
            </Button>
            <Button
              onClick={() => navigate("/properties")}
              size="lg"
              variant="outline"
              className="rounded-full text-lg py-6 shadow-lg hover:shadow-xl transition-all animate-scale-in"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Browse All
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Available 24/7 • Multilingual Support • Global Coverage
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-8">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-2xl">🇺🇸</div>
            <p className="text-xs text-muted-foreground">United States</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="text-2xl">🇬🇭</div>
            <p className="text-xs text-muted-foreground">Ghana</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-2xl">🇬🇧</div>
            <p className="text-xs text-muted-foreground">United Kingdom</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="text-2xl">🇳🇬</div>
            <p className="text-xs text-muted-foreground">Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
