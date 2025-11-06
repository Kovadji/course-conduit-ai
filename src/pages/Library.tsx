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
    coverColor: "bg-blue-500",
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
    coverColor: "bg-purple-500",
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
    coverColor: "bg-red-500",
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
    coverColor: "bg-green-500",
    description: "Строение и функции живой клетки",
    content: [
      "Глава 1: Строение клетки\n\nКлетка — основная структурная и функциональная единица живых организмов. Различают прокариотические и эукариотические клетки...",
      "Глава 2: Клеточные органеллы\n\nМитохондрии, рибосомы, эндоплазматический ретикулум, аппарат Гольджи и другие органеллы выполняют специфические функции...",
      "Глава 3: Клеточный цикл\n\nЖизненный цикл клетки включает интерфазу и митоз. Регуляция клеточного деления и апоптоз..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card 
            key={book.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedBook(book)}
          >
            <CardContent className="pt-6">
              <div className={`${book.coverColor} rounded-lg p-6 mb-4 flex items-center justify-center h-48`}>
                <BookOpen className="w-16 h-16 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{book.category}</Badge>
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
