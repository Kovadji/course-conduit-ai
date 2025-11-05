import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MessageSquare } from "lucide-react";

interface Post {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  isAnswer?: boolean;
}

const threadData: Record<string, { title: string; category: string; posts: Post[] }> = {
  "1": {
    title: "Добро пожаловать на форум!",
    category: "Общее",
    posts: [
      {
        id: "1",
        author: "Admin",
        content:
          "Привет! Это сообщество школьников изучающих науку на углубленном уровне. Здесь вы можете попросить помощь с пониманием темы или решением школьных задач. Этот форум - место, где вам помогут научиться понимать науку.",
        date: "апр. 2021",
        likes: 25,
      },
    ],
  },
  "2": {
    title: "Помогите понять механизм реакции",
    category: "Органическая химия",
    posts: [
      {
        id: "1",
        author: "Student123",
        content:
          "Изучаем органическую химию и никак не могу разобраться с механизмами реакций замещения. Понимаю отдельные шаги, но не вижу общую картину. Помогите разобраться!",
        date: "7 дн назад",
        likes: 3,
      },
      {
        id: "2",
        author: "ChemExpert",
        content:
          "Чтобы понять механизмы реакций, нужно представлять движение электронов. Рекомендую использовать стрелки для показа переноса электронной пары. Начните с простых реакций SN1 и SN2, потом переходите к более сложным.",
        date: "6 дн назад",
        likes: 8,
        isAnswer: true,
      },
    ],
  },
  "3": {
    title: "Как начать решать математические задачи правильно?",
    category: "Математика",
    posts: [
      {
        id: "1",
        author: "MathStudent",
        content:
          "Даже решая задачи все время, не могу дойти до 5. Видимо я не то чтобы не знаю математику, я ее не понимаю. Пишу сюда чтобы спросить советов. Репетиторы уже были, но после уроков я все равно не вижу результата.",
        date: "29 окт.",
        likes: 1,
      },
      {
        id: "2",
        author: "Janibek",
        content:
          "Чтобы 'понять' математику нужно выработать своего рода интуицию, чтобы решение задач сходилось не к следованию заученным инструкциям, а к очевидным имеющим смысл шагам. Для этого нужно представлять математические идеи с разных сторон и связывать их с уже имеющимися знаниями. Так теоремы и формулы не нужно будет учить, так как они будут сами выходить как правильный подход.",
        date: "7 дн",
        likes: 5,
        isAnswer: true,
      },
    ],
  },
};

const ForumThread = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>(
    threadData[threadId || "1"]?.posts || []
  );

  const thread = threadData[threadId || "1"];

  if (!thread) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Тема не найдена</h1>
          <Button onClick={() => navigate("/forum")}>Вернуться на форум</Button>
        </div>
      </div>
    );
  }

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: String(posts.length + 1),
        author: "Вы",
        content: newPost,
        date: "только что",
        likes: 0,
      };
      setPosts([...posts, post]);
      setNewPost("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/forum")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к форуму
        </Button>

        <div className="mb-6">
          <Badge variant="outline" className="mb-2">
            {thread.category}
          </Badge>
          <h1 className="text-3xl font-bold">{thread.title}</h1>
        </div>

        {/* Posts */}
        <div className="space-y-4 mb-8">
          {posts.map((post, index) => (
            <Card key={post.id} className={post.isAnswer ? "border-green-500/50" : ""}>
              <CardContent className="p-6">
                {post.isAnswer && (
                  <Badge variant="secondary" className="mb-3 bg-green-500/10 text-green-600">
                    ✓ Ответ решён
                  </Badge>
                )}
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {post.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{post.author}</span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <p className="text-foreground mb-4 whitespace-pre-wrap">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Ответить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New post form */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Написать ответ</h3>
            <Textarea
              placeholder="Поделитесь своими мыслями..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[120px] mb-4"
            />
            <Button onClick={handleAddPost}>Опубликовать</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForumThread;
