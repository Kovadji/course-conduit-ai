import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const interests = [
  { id: "math", name: "Математика", icon: "📐", category: "science" },
  { id: "physics", name: "Физика", icon: "⚛️", category: "science" },
  { id: "chemistry", name: "Химия", icon: "🧪", category: "science" },
  { id: "biology", name: "Биология", icon: "🧬", category: "science" },
  { id: "history", name: "История", icon: "📚", category: "humanities" },
  { id: "literature", name: "Литература", icon: "📖", category: "humanities" },
  { id: "english", name: "Английский", icon: "🇬🇧", category: "languages" },
  { id: "ielts", name: "IELTS", icon: "🎓", category: "languages" },
  { id: "programming", name: "Программирование", icon: "💻", category: "tech" },
  { id: "art", name: "Искусство", icon: "🎨", category: "creative" },
  { id: "music", name: "Музыка", icon: "🎵", category: "creative" },
  { id: "sports", name: "Спорт", icon: "⚽", category: "health" },
];

const Interests = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      toast.error("Выберите хотя бы один интерес");
      return;
    }
    
    localStorage.setItem("userInterests", JSON.stringify(selected));
    localStorage.setItem("interestsCompleted", "true");
    toast.success("Интересы сохранены!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Выберите что вы хотите изучать</h1>
          <p className="text-muted-foreground text-lg">
            Выберите интересующие вас предметы для персонализированных рекомендаций
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {interests.map((interest) => {
            const isSelected = selected.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary shadow-lg"
                    : "border-border hover:border-muted-foreground hover:bg-muted/30"
                }`}
              >
                <span className="text-4xl">{interest.icon}</span>
                <span className="text-sm font-medium text-center">{interest.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="w-full"
          >
            Продолжить
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="w-full"
          >
            Может быть позже
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interests;
