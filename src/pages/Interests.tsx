import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Music, Shirt, Gamepad2, Dog, Plane, Laptop, 
  Sparkles, Pizza, Theater, Dumbbell, Film, Heart,
  Calendar, Printer, Frown, Package, Home, Paintbrush
} from "lucide-react";

const interests = [
  { id: "music", label: "Music", icon: Music },
  { id: "fashion", label: "Fashion", icon: Shirt },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "pet", label: "Pet", icon: Dog },
  { id: "travelling", label: "Travelling", icon: Plane },
  { id: "technology", label: "Technology", icon: Laptop },
  { id: "beauty", label: "Beauty", icon: Sparkles },
  { id: "food", label: "Food", icon: Pizza },
  { id: "comedy", label: "Comedy", icon: Theater },
  { id: "skincare", label: "Skincare", icon: Heart },
  { id: "wellness", label: "Wellness", icon: Dumbbell },
  { id: "bag", label: "Bag", icon: Package },
  { id: "accessories", label: "Accessories", icon: Package },
  { id: "architecture", label: "Architecture", icon: Home },
  { id: "art", label: "Art", icon: Paintbrush },
  { id: "sport", label: "Sport", icon: Dumbbell },
  { id: "film", label: "Film", icon: Film },
  { id: "drama", label: "Drama", icon: Theater },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "printer", label: "Printer", icon: Printer },
  { id: "sad", label: "Sad", icon: Frown }
];

const Interests = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    // Save interests to localStorage or backend
    localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Choose The Topics You Truly Love</h1>
          <p className="text-muted-foreground text-lg">
            Choose the topics you truly love and personalize your feed with inspiring content.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{interest.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={selectedInterests.length === 0}
            className="w-full"
          >
            Continue
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interests;
