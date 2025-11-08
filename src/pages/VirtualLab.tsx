import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Zap, Play, CheckCircle2 } from "lucide-react";
import ElectricCircuit from "@/components/ElectricCircuit";

interface Experiment {
  id: string;
  title: string;
  subject: "chemistry" | "physics";
  difficulty: string;
  description: string;
  videoUrl: string;
  steps: string[];
  completed?: boolean;
}

const experiments: Experiment[] = [
  {
    id: "1",
    title: "Реакция кислот и оснований",
    subject: "chemistry",
    difficulty: "Начальный",
    description: "Изучите реакцию нейтрализации между кислотами и основаниями",
    videoUrl: "https://www.youtube.com/embed/example1",
    steps: [
      "Наденьте защитные очки и перчатки",
      "Налейте 10 мл соляной кислоты в пробирку",
      "Добавьте несколько капель индикатора",
      "Медленно добавляйте раствор NaOH",
      "Наблюдайте изменение цвета"
    ]
  },
  {
    id: "2",
    title: "Закон Ома",
    subject: "physics",
    difficulty: "Средний",
    description: "Исследуйте зависимость силы тока от напряжения",
    videoUrl: "https://www.youtube.com/embed/example2",
    steps: [
      "Соберите электрическую цепь",
      "Подключите амперметр последовательно",
      "Подключите вольтметр параллельно",
      "Измерьте напряжение и силу тока",
      "Рассчитайте сопротивление"
    ]
  },
  {
    id: "3",
    title: "Электролиз воды",
    subject: "chemistry",
    difficulty: "Средний",
    description: "Разложение воды на водород и кислород",
    videoUrl: "https://www.youtube.com/embed/example3",
    steps: [
      "Заполните U-образную трубку водой с электролитом",
      "Подключите электроды к источнику питания",
      "Наблюдайте образование пузырьков газа",
      "Соберите газы в пробирки",
      "Проверьте газы на водород и кислород"
    ]
  },
  {
    id: "4",
    title: "Маятник и период колебаний",
    subject: "physics",
    difficulty: "Начальный",
    description: "Изучите зависимость периода колебаний от длины маятника",
    videoUrl: "https://www.youtube.com/embed/example4",
    steps: [
      "Подвесьте груз на нити известной длины",
      "Отклоните маятник на небольшой угол",
      "Измерьте время 10 колебаний",
      "Повторите с другой длиной нити",
      "Постройте график зависимости"
    ]
  }
];

const VirtualLab = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [activeSubject, setActiveSubject] = useState<"all" | "chemistry" | "physics">("all");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const filteredExperiments = experiments.filter(exp => 
    activeSubject === "all" || exp.subject === activeSubject
  );

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (selectedExperiment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => {
            setSelectedExperiment(null);
            setCompletedSteps([]);
          }}
          className="mb-4"
        >
          ← Назад к экспериментам
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedExperiment.title}</CardTitle>
                  <Badge variant="outline">{selectedExperiment.difficulty}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedExperiment.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-12 h-12 text-muted-foreground" />
                  <p className="ml-2 text-sm text-muted-foreground">Видео инструкция</p>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Experiment Area */}
            <Card>
              <CardHeader>
                <CardTitle>Интерактивная лаборатория</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedExperiment.subject === "physics" ? (
                  <ElectricCircuit />
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg p-6 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <FlaskConical className="w-16 h-16 mx-auto text-primary animate-pulse" />
                      <p className="text-sm text-muted-foreground">
                        Химический эксперимент
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Следуйте шагам справа для выполнения эксперимента
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Шаги эксперимента</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedExperiment.steps.map((step, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => toggleStep(index)}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm ${completedSteps.includes(index) ? 'line-through text-muted-foreground' : ''}`}>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Прогресс</span>
                    <span>{completedSteps.length}/{selectedExperiment.steps.length}</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(completedSteps.length / selectedExperiment.steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Виртуальная лаборатория</h1>
        <p className="text-muted-foreground">
          Проводите эксперименты по физике и химии в безопасной виртуальной среде
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={(v) => setActiveSubject(v as any)}>
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="chemistry">
            <FlaskConical className="w-4 h-4 mr-2" />
            Химия
          </TabsTrigger>
          <TabsTrigger value="physics">
            <Zap className="w-4 h-4 mr-2" />
            Физика
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiments.map((experiment) => (
          <Card 
            key={experiment.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedExperiment(experiment)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                {experiment.subject === "chemistry" ? (
                  <FlaskConical className="w-5 h-5 text-blue-500" />
                ) : (
                  <Zap className="w-5 h-5 text-yellow-500" />
                )}
                <Badge variant="outline">{experiment.difficulty}</Badge>
              </div>
              <CardTitle className="text-lg">{experiment.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {experiment.description}
              </p>
              <Button className="w-full">
                Начать эксперимент
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VirtualLab;
