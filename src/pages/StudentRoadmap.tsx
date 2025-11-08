import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Circle, Calendar, Target } from "lucide-react";

interface Question {
  id: number;
  type: "single" | "multiple" | "input";
  question: string;
  options?: string[];
  placeholder?: string;
  condition?: (answers: Record<number, any>) => boolean;
}

interface Goal {
  title: string;
  deadline: string;
  milestones: string[];
}

const StudentRoadmap = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showRoadmap, setShowRoadmap] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      type: "single",
      question: "Будете ли вы готовиться к IELTS?",
      options: ["Да", "Нет"],
      condition: () => true
    },
    {
      id: 2,
      type: "single",
      question: "Какой у вас текущий уровень английского?",
      options: ["Beginner (A1)", "Elementary (A2)", "Intermediate (B1)", "Upper-Intermediate (B2)", "Advanced (C1)", "Proficiency (C2)"],
      condition: (answers) => answers[1] === "Да"
    },
    {
      id: 3,
      type: "single",
      question: "Какой балл IELTS вы хотите получить?",
      options: ["6.0", "6.5", "7.0", "7.5", "8.0+"],
      condition: (answers) => answers[1] === "Да"
    },
    {
      id: 4,
      type: "single",
      question: "Хотите ли вы сдавать ЕНТ?",
      options: ["Да", "Нет"],
      condition: () => true
    },
    {
      id: 5,
      type: "multiple",
      question: "Какие предметы вы будете выбирать для ЕНТ?",
      options: ["Математика", "Физика", "Химия", "Биология", "История Казахстана", "География", "Всемирная история", "Английский язык"],
      condition: (answers) => answers[4] === "Да"
    },
    {
      id: 6,
      type: "single",
      question: "Какой балл ЕНТ вы хотите получить?",
      options: ["100-110", "110-120", "120-130", "130-140"],
      condition: (answers) => answers[4] === "Да"
    },
    {
      id: 7,
      type: "input",
      question: "Сколько времени у вас есть на подготовку? (в месяцах)",
      placeholder: "Например: 6",
      condition: () => true
    },
    {
      id: 8,
      type: "single",
      question: "Сколько часов в день вы можете уделять учебе?",
      options: ["1-2 часа", "2-3 часа", "3-4 часа", "4+ часов"],
      condition: () => true
    },
    {
      id: 9,
      type: "multiple",
      question: "Какие у вас хобби?",
      options: ["Спорт", "Музыка", "Искусство", "Программирование", "Чтение", "Игры", "Фотография", "Видеомонтаж"],
      condition: () => true
    },
    {
      id: 10,
      type: "multiple",
      question: "Что вы хотите развивать больше всего?",
      options: ["Логическое мышление", "Креативность", "Коммуникация", "Лидерство", "Технические навыки", "Языки"],
      condition: () => true
    }
  ];

  const getVisibleQuestions = () => {
    return questions.filter(q => !q.condition || q.condition(answers));
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentStep];
  const progress = ((currentStep + 1) / visibleQuestions.length) * 100;

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
    if (currentStep < visibleQuestions.length - 1) {
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
    const timeline = parseInt(answers[7]) || 6;
    const today = new Date();

    if (answers[1] === "Да") {
      const level = answers[2];
      const targetScore = answers[3];
      const deadline = new Date(today);
      deadline.setMonth(deadline.getMonth() + timeline);

      roadmap.push({
        title: `Подготовка к IELTS (целевой балл: ${targetScore})`,
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

    if (answers[4] === "Да") {
      const subjects = answers[5] || [];
      const targetScore = answers[6];
      const deadline = new Date(today);
      deadline.setMonth(deadline.getMonth() + timeline);

      subjects.forEach((subject: string) => {
        roadmap.push({
          title: `Подготовка к ЕНТ: ${subject} (цель: ${targetScore})`,
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
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Твой персональный план обучения</h1>
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
                      <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg md:text-xl">{goal.title}</CardTitle>
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Вопрос {currentStep + 1} из {visibleQuestions.length}
            </p>
          </div>
          <CardTitle className="text-xl md:text-2xl">{currentQuestion.question}</CardTitle>
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
              placeholder={currentQuestion.placeholder}
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
              {currentStep === visibleQuestions.length - 1 ? "Получить план" : "Далее"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRoadmap;
