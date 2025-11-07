import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  description: string;
  coverColor: string;
  content: string[];
}

const books: Book[] = [
  {
    id: "1",
    title: "Основы органической химии",
    author: "Иванов И.И.",
    category: "Химия",
    pages: 45,
    coverColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
    description: "Полное руководство по органической химии для начинающих",
    content: [
      "Глава 1: Введение в органическую химию\n\nОрганическая химия — это раздел химии, изучающий соединения углерода. Углерод является уникальным элементом благодаря своей способности образовывать длинные цепи и кольца атомов...",
      "Глава 2: Алканы\n\nАлканы — это насыщенные углеводороды с общей формулой CnH2n+2. Они содержат только одинарные связи между атомами углерода...",
      "Глава 3: Алкены и алкины\n\nАлкены содержат двойные связи, а алкины — тройные связи между атомами углерода. Эти непредельные углеводороды обладают большей реакционной способностью..."
    ]
  },
  {
    id: "2",
    title: "Механика для школьников",
    author: "Петров П.П.",
    category: "Физика",
    pages: 52,
    coverColor: "bg-gradient-to-br from-purple-500 to-pink-600",
    description: "Классическая механика с примерами и задачами",
    content: [
      "Глава 1: Кинематика\n\nКинематика изучает движение тел без рассмотрения причин этого движения. Основные понятия: траектория, путь, перемещение, скорость и ускорение...",
      "Глава 2: Динамика\n\nЗаконы Ньютона лежат в основе классической механики. Первый закон (закон инерции), второй закон (F=ma) и третий закон (действие и противодействие)...",
      "Глава 3: Энергия и работа\n\nРабота силы определяется как произведение силы на перемещение. Кинетическая и потенциальная энергия, закон сохранения энергии..."
    ]
  },
  {
    id: "3",
    title: "Математический анализ",
    author: "Сидоров С.С.",
    category: "Математика",
    pages: 67,
    coverColor: "bg-gradient-to-br from-red-500 to-orange-600",
    description: "Введение в дифференциальное и интегральное исчисление",
    content: [
      "Глава 1: Пределы и непрерывность\n\nПонятие предела является основой математического анализа. Предел функции f(x) при x стремящемся к a...",
      "Глава 2: Производная\n\nПроизводная характеризует скорость изменения функции. Геометрический и физический смысл производной...",
      "Глава 3: Интеграл\n\nОпределенный и неопределенный интегралы. Связь интегрирования и дифференцирования (основная теорема анализа)..."
    ]
  },
  {
    id: "4",
    title: "Биология клетки",
    author: "Смирнова А.А.",
    category: "Биология",
    pages: 38,
    coverColor: "bg-gradient-to-br from-green-500 to-emerald-600",
    description: "Строение и функции живой клетки",
    content: [
      "Глава 1: Строение клетки\n\nКлетка — основная структурная и функциональная единица живых организмов. Различают прокариотические и эукариотические клетки...",
      "Глава 2: Клеточные органеллы\n\nМитохондрии, рибосомы, эндоплазматический ретикулум, аппарат Гольджи и другие органеллы выполняют специфические функции...",
      "Глава 3: Клеточный цикл\n\nЖизненный цикл клетки включает интерфазу и митоз. Регуляция клеточного деления и апоптоз..."
    ]
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Literature",
    pages: 218,
    coverColor: "bg-gradient-to-br from-amber-500 to-yellow-600",
    description: "A classic American novel set in the Jazz Age",
    content: [
      "Chapter 1\n\nIn my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since...",
      "Chapter 2\n\nAbout halfway between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile...",
      "Chapter 3\n\nThere was music from my neighbor's house through the summer nights. In his blue gardens men and girls came and went like moths..."
    ]
  },
  {
    id: "6",
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    pages: 328,
    coverColor: "bg-gradient-to-br from-gray-600 to-slate-700",
    description: "A dystopian social science fiction novel",
    content: [
      "Part One: Chapter I\n\nIt was a bright cold day in April, and the clocks were striking thirteen...",
      "Part One: Chapter II\n\nWinston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working...",
      "Part One: Chapter III\n\nWinston was dreaming of his mother. He must, he thought, have been ten or eleven years old when his mother had disappeared..."
    ]
  },
  {
    id: "7",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    pages: 443,
    coverColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
    description: "A brief history of humankind",
    content: [
      "Part One: The Cognitive Revolution\n\nAbout 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang...",
      "Chapter 1: An Animal of No Significance\n\nHumans first evolved in East Africa about 2.5 million years ago from an earlier genus of apes called Australopithecus...",
      "Chapter 2: The Tree of Knowledge\n\nFor the entire length of this long saga, humans of all species lived exclusively on the Afro-Asian landmass..."
    ]
  },
  {
    id: "8",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    pages: 320,
    coverColor: "bg-gradient-to-br from-teal-500 to-cyan-600",
    description: "An easy and proven way to build good habits and break bad ones",
    content: [
      "Introduction\n\nMy story begins with a tragedy. It's September 17, 1995...",
      "Chapter 1: The Surprising Power of Atomic Habits\n\nThe fate of British Cycling changed one day in 2003. The organization had endured...",
      "Chapter 2: How Your Habits Shape Your Identity\n\nWhy is it so easy to repeat bad habits and so hard to form good ones?..."
    ]
  }
];

const Library = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedBook) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedBook(null);
              setCurrentPage(0);
            }}
          >
            <X className="w-4 h-4 mr-2" />
            Закрыть книгу
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Страница {currentPage + 1} из {selectedBook.content.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(selectedBook.content.length - 1, currentPage + 1))}
              disabled={currentPage === selectedBook.content.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedBook.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedBook.author} • {selectedBook.category}
            </p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="prose prose-sm max-w-none whitespace-pre-line">
                {selectedBook.content[currentPage]}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Библиотека</h1>
        <p className="text-muted-foreground">
          Коллекция учебных материалов и книг по разным предметам
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Поиск книг по названию, автору или категории..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <Card 
            key={book.id}
            className="hover:shadow-2xl transition-all cursor-pointer group"
            onClick={() => setSelectedBook(book)}
          >
            <CardContent className="pt-6">
              <div className={`${book.coverColor} rounded-lg p-8 mb-4 flex items-center justify-center h-64 group-hover:scale-105 transition-transform`}>
                <BookOpen className="w-20 h-20 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{book.category}</Badge>
                <span className="text-xs text-muted-foreground">{book.pages} стр.</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {book.description}
              </p>
              <Button className="w-full mt-4">
                Читать книгу
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Library;
