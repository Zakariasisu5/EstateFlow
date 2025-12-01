import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import ChatInterface from "@/components/chat/ChatInterface";
import ThemeToggle from "@/components/ThemeToggle";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <ThemeToggle />
        <header className="border-b bg-card/50 backdrop-blur px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h1 className="text-base sm:text-lg font-semibold">EstateFlow</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/properties")}
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Browse Properties</span>
              <span className="sm:hidden">Browse</span>
            </Button>
          </div>
          <LanguageSelector />
        </header>
        <ChatInterface />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <ThemeToggle />
      <div className="relative z-10 max-w-lg w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
        <div className="space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-primary-foreground shadow-lg animate-scale-in">
            <Home className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white px-2 drop-shadow-lg">
            Find Your Dream Home Worldwide 🌍
          </h1>
          
          <p className="text-base sm:text-lg text-white/90 max-w-md mx-auto leading-relaxed px-4 drop-shadow-md">
            Welcome to EstateFlow! Your personal Real Estate Concierge for properties across the globe. From New York to Accra, London to Lagos - let's find your perfect home! 🏡
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 px-2">
          <LanguageSelector />
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setShowChat(true)}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary-dark text-base sm:text-lg py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all animate-scale-in"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Chat with AI
            </Button>
            <Button
              onClick={() => navigate("/properties")}
              size="lg"
              variant="outline"
              className="rounded-full text-base sm:text-lg py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all animate-scale-in"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Browse All
            </Button>
            <Button
              onClick={() => navigate("/map")}
              size="lg"
              variant="outline"
              className="rounded-full text-base sm:text-lg py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all animate-scale-in"
            >
              🗺️ World Map
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-white/80">
            Available 24/7 • Multilingual Support • Global Coverage
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto pt-6 sm:pt-8 px-2">
          <div className="text-center space-y-1 sm:space-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-xl sm:text-2xl">🇺🇸</div>
            <p className="text-xs text-white/70">United States</p>
          </div>
          <div className="text-center space-y-1 sm:space-y-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="text-xl sm:text-2xl">🇬🇭</div>
            <p className="text-xs text-white/70">Ghana</p>
          </div>
          <div className="text-center space-y-1 sm:space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-xl sm:text-2xl">🇬🇧</div>
            <p className="text-xs text-white/70">United Kingdom</p>
          </div>
          <div className="text-center space-y-1 sm:space-y-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="text-xl sm:text-2xl">🇳🇬</div>
            <p className="text-xs text-white/70">Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
