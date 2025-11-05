import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Calendar, Target } from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: "single" | "multiple" | "input";
  options?: string[];
}

interface Goal {
  title: string;
  deadline: string;
  milestones: string[];
}

const questions: Question[] = [
  {
    id: "ielts",
    question: "Будешь ли ты готовиться к IELTS?",
    type: "single",
    options: ["Да", "Нет", "Пока не решил"],
  },
  {
    id: "ielts_level",
    question: "Какой у тебя текущий уровень английского?",
    type: "single",
    options: ["Beginner (A1-A2)", "Intermediate (B1-B2)", "Advanced (C1-C2)"],
  },
  {
    id: "ent",
    question: "Хочешь ли ты сдавать ЕНТ?",
    type: "single",
    options: ["Да", "Нет"],
  },
  {
    id: "ent_subjects",
    question: "Какие предметы ты будешь выбирать для ЕНТ?",
    type: "multiple",
    options: ["Математика", "Физика", "Химия", "Биология", "География", "История", "Информатика"],
  },
  {
    id: "timeline",
    question: "Сколько времени у тебя есть на подготовку? (в месяцах)",
    type: "input",
  },
];

const StudentRoadmap = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showRoadmap, setShowRoadmap] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSingleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleMultipleAnswer = (option: string, checked: boolean) => {
    const current = answers[currentQuestion.id] || [];
    if (checked) {
      setAnswers({ ...answers, [currentQuestion.id]: [...current, option] });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: current.filter((o: string) => o !== option),
      });
    }
  };

  const handleInputAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowRoadmap(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRoadmap = (): Goal[] => {
    const roadmap: Goal[] = [];
    const timeline = parseInt(answers.timeline) || 6;
    const today = new Date();

    if (answers.ielts === "Да") {
      const level = answers.ielts_level;
      const months = level === "Beginner (A1-A2)" ? 6 : level === "Intermediate (B1-B2)" ? 4 : 3;
      const deadline = new Date(today);
      deadline.setMonth(deadline.getMonth() + Math.min(months, timeline));

      roadmap.push({
        title: `Подготовка к IELTS (целевой балл: ${level === "Advanced (C1-C2)" ? "7.5+" : level === "Intermediate (B1-B2)" ? "6.5-7.0" : "5.5-6.0"})`,
        deadline: deadline.toLocaleDateString('ru-RU'),
        milestones: [
          "Пройти пробный тест и определить слабые стороны",
          "Изучить формат экзамена и стратегии",
          "Ежедневная практика Reading (30 мин)",
          "Ежедневная практика Listening (30 мин)",
          "Практика Writing эссе (3 раза в неделю)",
          "Практика Speaking с партнером (2 раза в неделю)",
          "Пройти 3-5 полных mock тестов",
        ],
      });
    }

    if (answers.ent === "Да") {
      const subjects = answers.ent_subjects || [];
      const deadline = new Date(today);
      deadline.setMonth(deadline.getMonth() + timeline);

      subjects.forEach((subject: string) => {
        roadmap.push({
          title: `Подготовка к ЕНТ: ${subject}`,
          deadline: deadline.toLocaleDateString('ru-RU'),
          milestones: [
            `Изучить программу и темы по ${subject}`,
            "Пройти базовый уровень теории",
            "Решать 10-15 задач ежедневно",
            "Пройти тематические тесты",
            "Разобрать ошибки и слабые темы",
            "Пройти 5+ пробных тестов ЕНТ",
            "Повторение всех тем за месяц до экзамена",
          ],
        });
      });
    }

    return roadmap;
  };

  if (showRoadmap) {
    const roadmap = generateRoadmap();

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Твой персональный план обучения</h1>
            <p className="text-muted-foreground">
              На основе твоих ответов мы составили пошаговый план достижения твоих целей
            </p>
          </div>

          <div className="space-y-6">
            {roadmap.map((goal, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Дедлайн: {goal.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {goal.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{milestone}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={() => {
                setShowRoadmap(false);
                setCurrentStep(0);
                setAnswers({});
              }}
            >
              Пройти заново
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Вопрос {currentStep + 1} из {questions.length}
            </p>
          </div>
          <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestion.type === "single" && (
            <RadioGroup
              value={answers[currentQuestion.id]}
              onValueChange={handleSingleAnswer}
            >
              {currentQuestion.options?.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "multiple" && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50">
                  <Checkbox
                    id={option}
                    checked={(answers[currentQuestion.id] || []).includes(option)}
                    onCheckedChange={(checked) =>
                      handleMultipleAnswer(option, checked as boolean)
                    }
                  />
                  <Label htmlFor={option} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === "input" && (
            <Input
              type="number"
              placeholder="Введите количество месяцев"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleInputAnswer(e.target.value)}
              className="text-lg p-6"
            />
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Назад
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id] || 
                (currentQuestion.type === "multiple" && answers[currentQuestion.id]?.length === 0)}
            >
              {currentStep === questions.length - 1 ? "Получить план" : "Далее"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRoadmap;
