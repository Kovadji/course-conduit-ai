import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i + 1);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0),
      date: date.getDate(),
      isToday: date.toDateString() === currentDate.toDateString()
    };
  });

  const chatMessages = [
    { name: "Temir", message: "Hi", time: "23:53", unread: 5 },
    { name: "Era", message: "How it's going", time: "12:51", unread: 7 },
    { name: "Yelzhas", message: "What was your question", time: "22:05", unread: 2 },
    { name: "Yelzhas", message: "Nice work", time: "22:05", unread: 2 },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Welcome Back Batyrkhan!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Test Results and Upcoming Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/tests')}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select defaultValue="math">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">Score: 15/20</span>
                </div>
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.75)}`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">75%</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Start next</Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Speaking</h3>
                <p className="text-sm text-muted-foreground">Chapter 3 : Confident speaking and cohirance</p>
                <p className="text-sm text-muted-foreground">From 11:00 to 12:00</p>
                <Button className="w-full">Join now</Button>
              </div>
            </Card>
          </div>

          {/* Course Progress */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Leadership and comunication</span>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Speaking</span>
                  <span className="text-sm text-muted-foreground">50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Progress Chart */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Progress</h3>
                <div className="flex gap-2">
                  <Select defaultValue="speaking">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="speaking">Speaking</SelectItem>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">This week</Button>
                  <Button variant="ghost" size="sm">This month</Button>
                  <Button variant="ghost" size="sm">This year</Button>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-4 pt-4">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-muted rounded-t" style={{ height: `${Math.random() * 100 + 50}px` }}></div>
                    <span className="text-xs text-muted-foreground">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Calendar Widget */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/calendar')}>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-1">{day.day}</span>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                      day.isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>8:00</span>
                  <div className="flex-1 border-b border-dashed"></div>
                </div>
                <div className="bg-primary/10 border-l-4 border-primary rounded p-2">
                  <p className="font-medium text-sm">Math</p>
                  <p className="text-xs text-muted-foreground">8:00-9:50</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>9:00</span>
                  <div className="flex-1 border-b border-dashed"></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>10:00</span>
                  <div className="flex-1 border-b border-dashed"></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>11:00</span>
                  <div className="flex-1 border-b border-dashed"></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Chat Widget */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/chat')}>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-9" />
              </div>
              <div className="space-y-2">
                {chatMessages.map((chat, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-destructive/80 rounded flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{chat.name}</p>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{chat.message}</p>
                    </div>
                    <div className="w-5 h-5 bg-foreground text-background rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {chat.unread}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
