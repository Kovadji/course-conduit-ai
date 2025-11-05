import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
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
      // Auto switch between work and break
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "work" ? workDuration : breakDuration);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const totalDuration = mode === "work" ? workDuration : breakDuration;
  const progressPercentage = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          {mode === "work" ? "Фокус сессия" : "Перерыв"}
        </h3>
        <div className="relative">
          <div className="text-5xl font-bold tabular-nums mb-4">
            {formatTime(timeLeft)}
          </div>
          <div className="relative h-2 mb-4">
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button
          size="lg"
          variant="outline"
          onClick={handleReset}
          className="rounded-full w-12 h-12 p-0"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          onClick={toggleTimer}
          className="rounded-full w-16 h-16 p-0"
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          variant={mode === "work" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setMode("work");
            setTimeLeft(workDuration);
            setIsRunning(false);
          }}
        >
          Работа (25м)
        </Button>
        <Button
          variant={mode === "break" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setMode("break");
            setTimeLeft(breakDuration);
            setIsRunning(false);
          }}
        >
          Перерыв (5м)
        </Button>
      </div>
    </div>
  );
};
