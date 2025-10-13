import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calendar = () => {
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [currentDate] = useState(new Date(2025, 5, 6)); // June 6, 2025
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [eventType, setEventType] = useState<"personal" | "course">("personal");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Tue", "Thu", "Sun"]);
  const [recurringEnd, setRecurringEnd] = useState(true);
  const [eventTitle, setEventTitle] = useState("UI/UX Design");
  const [startDate, setStartDate] = useState("June 6");
  const [startTime, setStartTime] = useState("9:50");
  const [endDate, setEndDate] = useState("June 6");
  const [endTime, setEndTime] = useState("11:30");

  const weekDays = ["Thu", "Fri", "Sut", "Sun", "Mon", "Tue", "Wed"];
  const dates = [4, 5, 6, 7, 8, 9, 10];

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
    const newEvent = {
      day: 6, // Default to current day
      time: startTime,
      duration: "1h 40m",
      title: eventTitle,
      start: startTime,
      end: endTime,
      highlight: false
    };
    setEvents([...events, newEvent]);
    setShowNewEvent(false);
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
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium px-4">
                {view === "week" ? "June 4- June 11" : "Saturday, June 6"}
              </span>
              <Button variant="outline" size="icon">
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
              {weekDays.map((day, i) => (
                <div key={day} className="bg-background p-4 text-center">
                  <div className={`inline-flex flex-col items-center gap-1 ${i === 2 ? 'text-primary' : ''}`}>
                    <span className="text-sm font-medium">{day}</span>
                    <span className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-lg ${
                      i === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {dates[i]}
                    </span>
                  </div>
                </div>
              ))}

              {/* Time Rows */}
              {Array.from({ length: 7 }, (_, hour) => (
                <>
                  <div key={`time-${hour}`} className="bg-background p-2 text-sm text-muted-foreground text-right pr-4">
                    {9 + hour}:00
                  </div>
                  {dates.map((date, dayIndex) => {
                    const event = events.find(e => e.day === date && parseInt(e.start.split(':')[0]) === 9 + hour);
                    return (
                      <div key={`${date}-${hour}`} className="bg-background p-1 min-h-[80px] relative">
                        {event && (
                          <div className={`absolute inset-1 rounded-lg p-2 ${
                            event.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs opacity-90">{event.duration}</p>
                            <p className="text-xs opacity-75 mt-1">{event.start}-{event.end}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          )}

          {view === "day" && (
            <div className="grid grid-cols-[auto_repeat(3,1fr)] gap-px bg-border rounded-lg overflow-hidden">
              {/* Header Row */}
              <div className="bg-background"></div>
              {["Fri", "Sut", "Sun"].map((day, i) => (
                <div key={day} className="bg-background p-4 text-center">
                  <div className={`inline-flex flex-col items-center gap-1 ${i === 1 ? 'text-primary' : ''}`}>
                    <span className="text-sm font-medium">{day}</span>
                    <span className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-lg ${
                      i === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {5 + i}
                    </span>
                  </div>
                </div>
              ))}

              {/* Time Rows */}
              {Array.from({ length: 6 }, (_, hour) => (
                <>
                  <div key={`time-${hour}`} className="bg-background p-2 text-sm text-muted-foreground text-right pr-4">
                    {9 + hour}:00
                  </div>
                  {[5, 6, 7].map((date, dayIndex) => {
                    const event = events.find(e => e.day === date && parseInt(e.start.split(':')[0]) === 9 + hour);
                    return (
                      <div key={`${date}-${hour}`} className="bg-background p-1 min-h-[80px] relative">
                        {event && (
                          <div className={`absolute inset-1 rounded-lg p-2 ${
                            event.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs opacity-90">{event.duration}</p>
                            <p className="text-xs opacity-75 mt-1">{event.start}-{event.end}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Right Sidebar - Mini Calendar */}
      <div className="w-80 space-y-4">
        <Card className="p-4">
          <Select defaultValue="june-2025">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="june-2025">June 2025</SelectItem>
              <SelectItem value="july-2025">July 2025</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day) => (
              <button
                key={day}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-muted transition-colors ${
                  day === 6 ? "bg-primary text-primary-foreground font-medium" : ""
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
