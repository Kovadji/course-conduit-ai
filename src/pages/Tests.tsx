import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  difficulty: string;
}

const Tests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const tests: Test[] = [
    {
      id: "ielts",
      title: "IELTS Academic",
      description: "Complete IELTS Academic test with Reading, Writing, Listening, and Speaking sections",
      duration: "2h 45min",
      questions: 40,
      difficulty: "Advanced"
    },
    {
      id: "toefl",
      title: "TOEFL iBT",
      description: "Full TOEFL iBT test covering all four sections",
      duration: "3h",
      questions: 80,
      difficulty: "Advanced"
    },
    {
      id: "duolingo",
      title: "Duolingo English Test",
      description: "Adaptive English proficiency test",
      duration: "1h",
      questions: 50,
      difficulty: "Intermediate"
    },
    {
      id: "cambridge",
      title: "Cambridge English",
      description: "Cambridge English placement test",
      duration: "1h 30min",
      questions: 60,
      difficulty: "All Levels"
    }
  ];

  const filteredTests = tests.filter(test =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Practice Tests</h1>
        <p className="text-muted-foreground">Choose a test to practice and improve your skills</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search tests..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <Card
            key={test.id}
            className="p-6 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {test.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{test.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  {test.duration}
                </span>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  {test.questions} questions
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {test.difficulty}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tests found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default Tests;
