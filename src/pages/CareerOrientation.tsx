import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Как вы предпочитаете решать проблемы?",
    options: ["Логически и систематически", "Креативно и интуитивно", "Практически и быстро", "Совместно с другими"]
  },
  {
    id: 2,
    question: "Что вам больше нравится?",
    options: ["Работа с числами и данными", "Работа с людьми", "Работа с технологиями", "Творческая работа"]
  },
  {
    id: 3,
    question: "Как вы принимаете решения?",
    options: ["На основе фактов и логики", "Интуитивно", "Спонтанно", "После обсуждения с другими"]
  },
  {
    id: 4,
    question: "Что вас больше мотивирует?",
    options: ["Достижение целей", "Помощь другим", "Новые идеи", "Стабильность и порядок"]
  },
  {
    id: 5,
    question: "Как вы работаете лучше всего?",
    options: ["Самостоятельно", "В команде", "С четким планом", "Гибко и адаптивно"]
  },
  {
    id: 6,
    question: "Что вас вдохновляет?",
    options: ["Сложные задачи", "Творческие проекты", "Общение с людьми", "Изучение нового"]
  },
  {
    id: 7,
    question: "Какая работа вам ближе?",
    options: ["Аналитическая", "Организационная", "Креативная", "Социальная"]
  },
  {
    id: 8,
    question: "Ваш подход к обучению?",
    options: ["Структурированный", "Практический", "Экспериментальный", "Коллаборативный"]
  }
];

const CareerOrientation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalityTraits, setPersonalityTraits] = useState<{
    logic: number;
    creativity: number;
    social: number;
    practical: number;
  } | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzeResults();
    }
  };

  const analyzeResults = async () => {
    setIsAnalyzing(true);
    
    // Calculate personality traits
    const traits = {
      logic: 0,
      creativity: 0,
      social: 0,
      practical: 0
    };

    Object.values(answers).forEach(answer => {
      if (answer.includes("Логически") || answer.includes("фактов") || answer.includes("Аналитическая")) {
        traits.logic += 12.5;
      }
      if (answer.includes("Креативно") || answer.includes("Творческая") || answer.includes("идеи")) {
        traits.creativity += 12.5;
      }
      if (answer.includes("людьми") || answer.includes("Социальная") || answer.includes("другими")) {
        traits.social += 12.5;
      }
      if (answer.includes("Практически") || answer.includes("Практический")) {
        traits.practical += 12.5;
      }
    });

    setPersonalityTraits(traits);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: `Проанализируй результаты теста по профориентации. Ответы пользователя: ${JSON.stringify(answers)}. 
          
          Личностные характеристики:
          - Логика: ${traits.logic}%
          - Креативность: ${traits.creativity}%
          - Социальность: ${traits.social}%
          - Практичность: ${traits.practical}%
          
          Дай детальный анализ:
          1. Тип личности
          2. Сильные стороны характера
          3. 3-5 подходящих профессий с объяснением почему
          4. Рекомендации по развитию
          
          Ответ должен быть структурированным и мотивирующим.`
        }
      });

      if (error) throw error;

      setAnalysis(data.reply);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error analyzing results:', error);
      toast.error("Ошибка при анализе результатов");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isCompleted && personalityTraits) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Результаты профориентации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ваши характеристики:</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Логика</span>
                    <span className="text-sm text-muted-foreground">{personalityTraits.logic}%</span>
                  </div>
                  <Progress value={personalityTraits.logic} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Креативность</span>
                    <span className="text-sm text-muted-foreground">{personalityTraits.creativity}%</span>
                  </div>
                  <Progress value={personalityTraits.creativity} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Социальность</span>
                    <span className="text-sm text-muted-foreground">{personalityTraits.social}%</span>
                  </div>
                  <Progress value={personalityTraits.social} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Практичность</span>
                    <span className="text-sm text-muted-foreground">{personalityTraits.practical}%</span>
                  </div>
                  <Progress value={personalityTraits.practical} className="h-2" />
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold mb-3">AI Анализ:</h3>
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-4 rounded-lg">
                {analysis || "Анализирую ваши результаты..."}
              </div>
            </div>

            <Button onClick={() => window.location.reload()} className="w-full">
              Пройти тест заново
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Тест по профориентации</CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Вопрос {currentQuestion + 1} из {questions.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {questions[currentQuestion].question}
            </h3>
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Анализирую..." : currentQuestion < questions.length - 1 ? "Далее" : "Завершить"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerOrientation;
