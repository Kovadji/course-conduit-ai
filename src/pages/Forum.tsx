import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, Clock } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  preview: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isPinned?: boolean;
}

const categories = [
  { id: "chemistry", name: "Химия", color: "bg-blue-500" },
  { id: "math", name: "Математика", color: "bg-red-500" },
  { id: "physics", name: "Физика", color: "bg-purple-500" },
  { id: "biology", name: "Биология", color: "bg-green-500" },
  { id: "geography", name: "География", color: "bg-slate-700" },
  { id: "informatics", name: "Информатика", color: "bg-pink-500" },
  { id: "general", name: "Общее", color: "bg-amber-600" },
];

const defaultTopics: Topic[] = [
  {
    id: "1",
    title: "Добро пожаловать на форум!",
    preview: "Привет! Это сообщество школьников изучающих науку на углубленном уровне. Здесь вы можете попросить помощь с пониманием темы или решением школьных задач.",
    category: "general",
    replies: 25,
    views: 9100,
    lastActivity: "янв. 2022",
    isPinned: true,
  },
  {
    id: "2",
    title: "Помогите понять механизм реакции",
    preview: "Изучаем органическую химию и никак не могу разобраться с механизмами реакций замещения...",
    category: "chemistry",
    replies: 4,
    views: 59,
    lastActivity: "12 мин",
  },
  {
    id: "3",
    title: "Как начать решать математические задачи правильно?",
    preview: "Даже решая задачи все время, не могу дойти до 5. Понимаю, надо выработать интуицию для решения задач...",
    category: "math",
    replies: 2,
    views: 10,
    lastActivity: "12 мин",
  },
];

const Forum = () => {
  const navigate = useNavigate();
  const [topics] = useState<Topic[]>(defaultTopics);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"latest" | "hot" | "categories">("latest");

  const filteredTopics = selectedCategory
    ? topics.filter((t) => t.category === selectedCategory)
    : topics;

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || categoryId;
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.color || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Наука ждет тебя!</h1>
          <p className="text-muted-foreground">
            Присоединяйся к сообществу школьников изучающих науку на углубленном уровне
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <span>📚</span> КАТЕГОРИИ
                </h2>
                <div className="space-y-1">
                  <Button
                    variant={selectedCategory === null ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Все категории
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
              <Button
                variant="ghost"
                className={`rounded-none border-b-2 ${
                  activeTab === "latest"
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("latest")}
              >
                Последние
              </Button>
              <Button
                variant="ghost"
                className={`rounded-none border-b-2 ${
                  activeTab === "hot"
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("hot")}
              >
                Горячие
              </Button>
              <Button
                variant="ghost"
                className={`rounded-none border-b-2 ${
                  activeTab === "categories"
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveTab("categories")}
              >
                Категории
              </Button>
            </div>

            {/* Topics list */}
            <div className="space-y-4">
              {filteredTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/forum/${topic.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {topic.isPinned && (
                            <Badge variant="secondary" className="text-xs">
                              📌 Закреплено
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${getCategoryColor(topic.category)} text-white border-0`}
                          >
                            {getCategoryName(topic.category)}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">{topic.preview}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 min-w-[120px]">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{topic.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{topic.views}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{topic.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
