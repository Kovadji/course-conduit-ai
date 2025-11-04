import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  type: "multiple-choice" | "fill-in" | "essay";
  question: string;
  options?: string[];
  correctAnswer?: string;
}

const TestTaking = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock questions based on test type
  const getQuestions = (): Question[] => {
    if (testId === "ielts") {
      return [
        {
          id: 1,
          type: "multiple-choice",
          question: "What is the main idea of the passage?",
          options: [
            "Climate change is a serious global issue",
            "Technology can solve environmental problems",
            "Renewable energy is the future",
            "Economic growth is more important"
          ],
          correctAnswer: "Climate change is a serious global issue"
        },
        {
          id: 2,
          type: "fill-in",
          question: "Complete the sentence: The author suggests that _____ is crucial for sustainable development.",
          correctAnswer: "international cooperation"
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "According to the text, which factor is NOT mentioned as a cause of global warming?",
          options: [
            "Industrial emissions",
            "Deforestation",
            "Agricultural practices",
            "Space exploration"
          ],
          correctAnswer: "Space exploration"
        },
        {
          id: 4,
          type: "essay",
          question: "Write a short essay (150-200 words) discussing the advantages and disadvantages of renewable energy sources.",
          correctAnswer: ""
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "What does the author imply about future energy consumption?",
          options: [
            "It will decrease significantly",
            "It will remain stable",
            "It will increase dramatically",
            "It will become more efficient"
          ],
          correctAnswer: "It will increase dramatically"
        }
      ];
    }
    
    // Default questions for other tests
    return [
      {
        id: 1,
        type: "multiple-choice",
        question: "Choose the correct answer:",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A"
      },
      {
        id: 2,
        type: "fill-in",
        question: "Fill in the blank: The capital of France is _____.",
        correctAnswer: "Paris"
      },
      {
        id: 3,
        type: "essay",
        question: "Write a short paragraph about your favorite hobby.",
        correctAnswer: ""
      }
    ];
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    
    setIsSubmitted(true);
    
    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (q.type !== "essay" && answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / questions.filter(q => q.type !== "essay").length) * 100);
    toast.success(`Test completed! Your score: ${score}%`);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto animate-fade-in">
        <Card className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Test Completed!</h2>
            <p className="text-muted-foreground">Great job on completing the test</p>
          </div>
          
          <div className="py-6">
            <div className="text-6xl font-bold text-primary">
              {Math.round((Object.values(answers).filter((ans, i) => 
                questions[i].type !== "essay" && ans === questions[i].correctAnswer
              ).length / questions.filter(q => q.type !== "essay").length) * 100)}%
            </div>
            <p className="text-muted-foreground mt-2">Your Score</p>
          </div>

          <div className="space-y-2">
            <Button onClick={() => navigate("/tests")} className="w-full">
              Back to Tests
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              Retake Test
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/tests")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Tests
        </Button>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="space-y-2">
        <Progress value={progress} />
        <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}% Complete</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Question {currentQuestion.id}</h2>
            <p className="text-lg">{currentQuestion.question}</p>
          </div>

          {currentQuestion.type === "multiple-choice" && (
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswerChange}
            >
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {currentQuestion.type === "fill-in" && (
            <Input
              placeholder="Type your answer here..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="text-lg"
            />
          )}

          {currentQuestion.type === "essay" && (
            <Textarea
              placeholder="Write your answer here..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-[200px] text-lg"
            />
          )}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button onClick={handleSubmit}>
            Submit Test
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestTaking;
