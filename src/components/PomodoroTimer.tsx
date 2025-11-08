import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  
  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "work") {
        setMode("break");
        setTimeLeft(breakDuration);
      } else {
        setMode("work");
        setTimeLeft(workDuration);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "work" ? workDuration : breakDuration);
  };

  return (
    <Card className="bg-background shadow-lg w-72">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-base">Помодоро</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
            {String(timeLeft % 60).padStart(2, '0')}
          </div>
          <p className="text-xs text-muted-foreground">
            {mode === 'work' ? 'Работа' : 'Перерыв'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsRunning(!isRunning)} 
            className="flex-1"
            size="sm"
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button 
            onClick={handleReset} 
            variant="outline"
            size="sm"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
