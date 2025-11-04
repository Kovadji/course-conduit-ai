import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLearn from "./pages/CourseLearn";
import AiTutor from "./pages/AiTutor";
import Chat from "./pages/Chat";
import Calendar from "./pages/Calendar";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Tests from "./pages/Tests";
import TestTaking from "./pages/TestTaking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <SidebarProvider defaultOpen={true}>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex-1">
                      <Header />
                      <main className="pt-16">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/courses" element={<Courses />} />
                          <Route path="/course/:courseId" element={<CourseDetail />} />
                          <Route path="/course/:courseId/learn" element={<CourseLearn />} />
                          <Route path="/ai-tutor" element={<AiTutor />} />
                          <Route path="/chat" element={<Chat />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/tests" element={<Tests />} />
                          <Route path="/test/:testId" element={<TestTaking />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
