import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Award, Info, HelpCircle, LogOut, ClipboardList, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Header() {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };
  return (
    <header className="fixed top-0 right-0 left-0 h-16 border-b border-border bg-background z-50 flex items-center justify-between px-6">
      <SidebarTrigger className="ml-2" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-muted">BK</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-2 text-sm font-medium">Batyrkhan</div>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            <span>About us</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/tests')}>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Tests</span>
          </DropdownMenuItem>
          <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>FAQ</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Часто задаваемые вопросы</DialogTitle>
              </DialogHeader>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Как начать учиться на платформе?</AccordionTrigger>
                  <AccordionContent>
                    После регистрации выберите интересующие вас предметы. Система автоматически подберет курсы и тесты под ваши цели.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Сколько стоит обучение?</AccordionTrigger>
                  <AccordionContent>
                    Базовый доступ к курсам бесплатный. Premium подписка открывает доступ к дополнительным материалам и индивидуальным занятиям с AI тьютором.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Как работает AI тьютор?</AccordionTrigger>
                  <AccordionContent>
                    AI тьютор анализирует ваши ответы и прогресс, адаптирует материалы под ваш уровень и дает персональные рекомендации по улучшению знаний.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Можно ли получить сертификат?</AccordionTrigger>
                  <AccordionContent>
                    Да, после успешного завершения курса и прохождения финального теста вы получите сертификат об окончании.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Как подготовиться к ЕНТ?</AccordionTrigger>
                  <AccordionContent>
                    Используйте раздел "Дорожная карта студента", выберите подготовку к ЕНТ и укажите предметы. Система составит индивидуальный план подготовки.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Как работает виртуальная лаборатория?</AccordionTrigger>
                  <AccordionContent>
                    Виртуальная лаборатория позволяет проводить эксперименты по физике и химии в безопасной среде. Можно собирать электрические цепи, проводить химические реакции и наблюдать результаты в реальном времени.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>Что такое профориентация?</AccordionTrigger>
                  <AccordionContent>
                    Тест по профориентации помогает определить ваши сильные стороны, тип личности и подходящие профессии на основе анализа AI. Результаты включают детальный разбор характера и рекомендации.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DialogContent>
          </Dialog>
          <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
