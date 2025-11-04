import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Play, 
  FileText, 
  CheckCircle,
  Menu,
  X
} from "lucide-react";

const CourseLearn = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>(["module1"]);

  // Mock course structure
  const course = {
    id: courseId,
    title: "Beginner's Guide to Successful Company Management",
    totalProgress: 22,
    modules: [
      {
        id: "module1",
        title: "Week 1 - Introduction to Business Management",
        progress: 40,
        lessons: [
          { 
            id: 1, 
            title: "Read before you start", 
            type: "reading",
            content: `
              <h2>Welcome to the Course!</h2>
              <p>Before we dive into the exciting world of business management, let's set the stage for your learning journey.</p>
              
              <h3>What You'll Learn</h3>
              <p>This course is designed to provide you with a comprehensive understanding of:</p>
              <ul>
                <li>Fundamental business principles and management theories</li>
                <li>Strategic planning and organizational dynamics</li>
                <li>User-centric approaches to business development</li>
                <li>Real-world application of management concepts</li>
              </ul>

              <h3>Course Structure</h3>
              <p>The course is divided into modules, each focusing on specific aspects of business management. You'll encounter:</p>
              <ul>
                <li><strong>Video Lectures:</strong> Comprehensive explanations of key concepts</li>
                <li><strong>Reading Materials:</strong> In-depth articles and case studies</li>
                <li><strong>Quizzes:</strong> Test your understanding at the end of each module</li>
              </ul>

              <h3>Tips for Success</h3>
              <p>To get the most out of this course:</p>
              <ol>
                <li>Take notes as you progress through each lesson</li>
                <li>Complete all assignments and quizzes</li>
                <li>Participate in discussion forums</li>
                <li>Apply concepts to real-world scenarios</li>
              </ol>

              <p><strong>Ready to begin?</strong> Click "Next" to start your first video lesson!</p>
            `,
            completed: true
          },
          { 
            id: 2, 
            title: "Introduction to Business Foundations", 
            type: "video",
            content: `
              <div class="video-placeholder">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); aspect-ratio: 16/9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                  <div style="text-align: center;">
                    <p style="font-size: 48px; margin-bottom: 16px;">▶</p>
                    <p>Video: Introduction to Business Foundations</p>
                    <p style="font-size: 14px; margin-top: 8px;">Duration: 1h 10min</p>
                  </div>
                </div>
              </div>
              
              <h2>Lesson Overview</h2>
              <p>In this lesson, we'll explore the fundamental principles that form the foundation of successful business management.</p>

              <h3>Key Topics Covered:</h3>
              <ul>
                <li>Understanding organizational structures</li>
                <li>Core management principles</li>
                <li>Leadership fundamentals</li>
                <li>Business ethics and responsibility</li>
              </ul>

              <h3>Learning Objectives:</h3>
              <p>By the end of this lesson, you will be able to:</p>
              <ol>
                <li>Identify different types of organizational structures</li>
                <li>Explain the four main functions of management</li>
                <li>Recognize the importance of ethical leadership</li>
                <li>Apply basic management principles to real-world scenarios</li>
              </ol>
            `,
            completed: true
          },
          { 
            id: 3, 
            title: "Brand Management Essentials", 
            type: "video",
            content: `
              <div class="video-placeholder">
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); aspect-ratio: 16/9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                  <div style="text-align: center;">
                    <p style="font-size: 48px; margin-bottom: 16px;">▶</p>
                    <p>Video: Brand Management Essentials</p>
                    <p style="font-size: 14px; margin-top: 8px;">Duration: 1h 23min</p>
                  </div>
                </div>
              </div>
              
              <h2>Building Strong Brands</h2>
              <p>Learn how to align business strategy with brand identity and customer behavior.</p>

              <h3>Core Concepts:</h3>
              <ul>
                <li>Brand identity and positioning</li>
                <li>Customer perception and brand equity</li>
                <li>Aligning brand with business goals</li>
                <li>Brand consistency across touchpoints</li>
              </ul>
            `,
            completed: false
          },
          { 
            id: 4, 
            title: "Module 1 Quiz", 
            type: "quiz",
            content: `
              <h2>Module 1 Assessment</h2>
              <p>Test your understanding of the concepts covered in this module.</p>
              
              <div style="margin-top: 24px;">
                <div style="background: var(--muted); padding: 24px; border-radius: 8px; margin-bottom: 16px;">
                  <h3 style="margin-bottom: 16px;">Question 1 of 10</h3>
                  <p style="margin-bottom: 16px;"><strong>What are the four main functions of management?</strong></p>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label style="display: flex; align-items: center; padding: 12px; background: var(--background); border-radius: 6px; cursor: pointer;">
                      <input type="radio" name="q1" style="margin-right: 12px;" />
                      Planning, Organizing, Leading, Controlling
                    </label>
                    <label style="display: flex; align-items: center; padding: 12px; background: var(--background); border-radius: 6px; cursor: pointer;">
                      <input type="radio" name="q1" style="margin-right: 12px;" />
                      Hiring, Training, Managing, Firing
                    </label>
                    <label style="display: flex; align-items: center; padding: 12px; background: var(--background); border-radius: 6px; cursor: pointer;">
                      <input type="radio" name="q1" style="margin-right: 12px;" />
                      Marketing, Sales, Production, Finance
                    </label>
                    <label style="display: flex; align-items: center; padding: 12px; background: var(--background); border-radius: 6px; cursor: pointer;">
                      <input type="radio" name="q1" style="margin-right: 12px;" />
                      Strategy, Operations, Innovation, Growth
                    </label>
                  </div>
                </div>
              </div>
            `,
            completed: false
          }
        ]
      },
      {
        id: "module2",
        title: "Week 2 - Strategic Planning",
        progress: 0,
        lessons: [
          { id: 5, title: "Strategic Planning Overview", type: "video", content: "<p>Coming soon...</p>", completed: false },
          { id: 6, title: "SWOT Analysis", type: "video", content: "<p>Coming soon...</p>", completed: false }
        ]
      }
    ]
  };

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[currentLesson];

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleNextLesson = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex">
      {/* Sidebar Navigation */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 border-r overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold truncate">{course.title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/course/${courseId}`)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="font-medium">{course.totalProgress}%</span>
            </div>
            <Progress value={course.totalProgress} className="h-2" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {course.modules.map((module) => (
              <div key={module.id}>
                <div
                  className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedModules.includes(module.id) ? "rotate-180" : ""
                      }`}
                    />
                    <span className="text-sm font-medium">{module.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{module.progress}%</span>
                </div>

                {expandedModules.includes(module.id) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {module.lessons.map((lesson, idx) => {
                      const lessonIndex = allLessons.findIndex(l => l.id === lesson.id);
                      const isActive = lessonIndex === currentLesson;

                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-2 p-2 rounded cursor-pointer text-sm ${
                            isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                          }`}
                          onClick={() => setCurrentLesson(lessonIndex)}
                        >
                          {lesson.type === "video" && <Play className="h-3 w-3" />}
                          {lesson.type === "reading" && <FileText className="h-3 w-3" />}
                          {lesson.type === "quiz" && <CheckCircle className="h-3 w-3" />}
                          <span className="flex-1 truncate">{lesson.title}</span>
                          {lesson.completed && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {currentLessonData?.type === "video" && <Play className="h-4 w-4" />}
              {currentLessonData?.type === "reading" && <FileText className="h-4 w-4" />}
              {currentLessonData?.type === "quiz" && <CheckCircle className="h-4 w-4" />}
              <span className="font-medium">{currentLessonData?.title}</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            Exit Course
          </Button>
        </div>

        {/* Lesson Content */}
        <ScrollArea className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div 
                className="prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentLessonData?.content || "" }}
              />
            </Card>
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="h-16 border-t flex items-center justify-between px-8">
          <Button
            variant="outline"
            onClick={handlePreviousLesson}
            disabled={currentLesson === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Lesson {currentLesson + 1} of {allLessons.length}
          </div>

          <Button
            onClick={handleNextLesson}
            disabled={currentLesson === allLessons.length - 1}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
