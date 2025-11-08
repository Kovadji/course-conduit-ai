import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PomodoroTimer } from "@/components/PomodoroTimer";

const Calendar = () => {
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 6)); // June 6, 2025
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [eventType, setEventType] = useState<"personal" | "course">("personal");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Tue", "Thu", "Sun"]);
  const [recurringEnd, setRecurringEnd] = useState(true);
  const [eventTitle, setEventTitle] = useState("UI/UX Design");
  const [startDate, setStartDate] = useState("June 6");
  const [startTime, setStartTime] = useState("9:50");
  const [endDate, setEndDate] = useState("June 6");
  const [endTime, setEndTime] = useState("11:30");


  const [events, setEvents] = useState([
    { day: 4, time: "10:00", duration: "40m", title: "Math", start: "9:40", end: "10:20" },
    { day: 5, time: "11:00", duration: "1h 40m", title: "English", start: "10:50", end: "12:30" },
    { day: 6, time: "10:00", duration: "1h 40m", title: "English", start: "9:50", end: "11:30" },
    { day: 7, time: "12:00", duration: "1h 40m", title: "Design", start: "11:50", end: "13:30", highlight: true },
  ]);

  const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const firstDayOfMonth = 0; // Monday

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleCreateEvent = () => {
    // Parse start and end times
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Calculate duration in minutes
    const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationText = hours > 0 ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}` : `${minutes}m`;
    
    // Get the day from the current date for simplicity
    const targetDay = currentDate.getDate();
    
    const newEvent = {
      day: targetDay,
      time: startTime,
      duration: durationText,
      title: eventTitle,
      start: startTime,
      end: endTime,
      highlight: false
    };
    setEvents([...events, newEvent]);
    setShowNewEvent(false);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex gap-6">
      {/* Main Calendar Area */}
      <Card className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Calendar</h1>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => view === 'week' ? navigateWeek('prev') : navigateDay('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium px-4">
                {view === "week" 
                  ? `${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => view === 'week' ? navigateWeek('next') : navigateDay('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={view === "month" ? "secondary" : "ghost"}
                onClick={() => setView("month")}
              >
                Month
              </Button>
              <Button
                variant={view === "week" ? "default" : "ghost"}
                onClick={() => setView("week")}
                className={view === "week" ? "bg-primary text-primary-foreground" : ""}
              >
                Week
              </Button>
              <Button
                variant={view === "day" ? "default" : "ghost"}
                onClick={() => setView("day")}
                className={view === "day" ? "bg-primary text-primary-foreground" : ""}
              >
                Day
              </Button>
              <Button className="ml-2" onClick={() => setShowNewEvent(true)}>Create new</Button>
            </div>
          </div>

          {/* New Event Dialog */}
          <Dialog open={showNewEvent} onOpenChange={setShowNewEvent}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>New event</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <Tabs value={eventType} onValueChange={(v) => setEventType(v as "personal" | "course")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="course">Course</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <Label>{eventType === "personal" ? "Type of event" : "Course"}</Label>
                  <Select value={eventTitle} onValueChange={setEventTitle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventType === "personal" ? (
                        <>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Meeting">Meeting</SelectItem>
                          <SelectItem value="Task">Task</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                          <SelectItem value="Math">Math</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start</Label>
                    <div className="space-y-2">
                      <Input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
        </div>
        
        {/* Fixed Pomodoro Timer at bottom right */}
        <div className="fixed bottom-4 right-4 z-40">
          <PomodoroTimer />
        </div>
      </div>
                  <div className="space-y-2">
                    <Label>End</Label>
                    <div className="space-y-2">
                      <Input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recurrence</Label>
                  <div className="flex gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        variant={selectedDays.includes(day) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleDay(day)}
                        className="flex-1"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recurrence end</Label>
                  <div className="flex items-center justify-between">
                    <Input type="text" defaultValue="June 17" className="flex-1" />
                    <Switch checked={recurringEnd} onCheckedChange={setRecurringEnd} className="ml-3" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowNewEvent(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleCreateEvent}>
                    Create event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Calendar Grid */}
          {view === "week" && (
            <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-px bg-border rounded-lg overflow-hidden">
              {/* Header Row */}
              <div className="bg-background"></div>
              {weekDates.map((date, i) => {
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <div key={i} className="bg-background p-4 text-center">
                    <div className={`inline-flex flex-col items-center gap-1 ${isToday ? 'text-primary' : ''}`}>
                      <span className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-lg ${
                        isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {date.getDate()}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Time Rows */}
              {Array.from({ length: 7 }, (_, hour) => {
                const timeHour = 9 + hour;
                return (
                  <>
                    <div key={`time-${hour}`} className="bg-background p-2 text-sm text-muted-foreground text-right pr-4">
                      {timeHour}:00
                    </div>
                    {weekDates.map((date, dayIndex) => {
                      const dayEvents = events.filter(e => 
                        e.day === date.getDate() && 
                        parseInt(e.start.split(':')[0]) === timeHour
                      );
                      
                      return (
                        <div key={`${date.getDate()}-${hour}`} className="bg-background p-1 min-h-[80px] relative">
                          {dayEvents.map((event, idx) => {
                            // Calculate height based on duration
                            const [startH, startM] = event.start.split(':').map(Number);
                            const [endH, endM] = event.end.split(':').map(Number);
                            const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
                            const heightMultiplier = durationMinutes / 60;
                            const height = heightMultiplier * 80; // 80px per hour
                            
                            return (
                              <div 
                                key={idx}
                                className={`absolute inset-x-1 top-1 rounded-lg p-2 ${
                                  event.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                }`}
                                style={{ height: `${height}px` }}
                              >
                                <p className="font-medium text-sm">{event.title}</p>
                                <p className="text-xs opacity-90">{event.duration}</p>
                                <p className="text-xs opacity-75 mt-1">{event.start}-{event.end}</p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                );
              })}
            </div>
          )}

          {view === "day" && (
            <div className="grid grid-cols-[auto_1fr] gap-px bg-border rounded-lg overflow-hidden">
              {/* Header Row */}
              <div className="bg-background"></div>
              <div className="bg-background p-4 text-center">
                <div className="inline-flex flex-col items-center gap-1 text-primary">
                  <span className="text-sm font-medium">
                    {currentDate.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {currentDate.getDate()}
                  </span>
                </div>
              </div>

              {/* Time Rows */}
              {Array.from({ length: 10 }, (_, hour) => {
                const timeHour = 9 + hour;
                const dayEvents = events.filter(e => 
                  e.day === currentDate.getDate() && 
                  parseInt(e.start.split(':')[0]) === timeHour
                );
                
                return (
                  <>
                    <div key={`time-${hour}`} className="bg-background p-2 text-sm text-muted-foreground text-right pr-4">
                      {timeHour}:00
                    </div>
                    <div className="bg-background p-1 min-h-[80px] relative">
                      {dayEvents.map((event, idx) => {
                        const [startH, startM] = event.start.split(':').map(Number);
                        const [endH, endM] = event.end.split(':').map(Number);
                        const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
                        const heightMultiplier = durationMinutes / 60;
                        const height = heightMultiplier * 80;
                        
                        return (
                          <div 
                            key={idx}
                            className={`absolute inset-x-1 top-1 rounded-lg p-2 ${
                              event.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}
                            style={{ height: `${height}px` }}
                          >
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs opacity-90">{event.duration}</p>
                            <p className="text-xs opacity-75 mt-1">{event.start}-{event.end}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Right Sidebar - Mini Calendar and Pomodoro */}
      <div className="w-80 space-y-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Напоминания</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Тест по математике</p>
                  <p className="text-xs text-muted-foreground">Завтра в 14:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Курс по химии</p>
                  <p className="text-xs text-muted-foreground">Пятница в 16:30</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <PomodoroTimer />
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(currentDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">{formatMonthYear(currentDate)}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(currentDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day) => {
              const isCurrentDay = day === currentDate.getDate();
              return (
                <button
                  key={day}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(day);
                    setCurrentDate(newDate);
                  }}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-muted transition-colors ${
                    isCurrentDay ? "bg-primary text-primary-foreground font-medium" : ""
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
