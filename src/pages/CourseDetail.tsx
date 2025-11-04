import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Star, Users, Clock, FileText, Video, Award, CheckCircle, Play } from "lucide-react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>(["week1"]);

  // Mock course data based on the design
  const course = {
    id: courseId,
    title: "Beginner's Guide to Successful Company Management: Business and User Goals",
    description: "Hello Student! Hi Are you ready to embark on a comprehensive journey into the realm of successful company management with our Beginner's Guide course? During this course it help you delve deep into the intricacies of business strategy, organizational dynamics, and user-centric approaches. Ready to join? Send me a message and let's start! 👉",
    instructor: {
      name: "Jenny Wilson",
      avatar: "",
      students: "250+ students bought this course"
    },
    rating: 4.8,
    reviews: 238,
    price: 87.99,
    originalPrice: 183.00,
    discount: 55,
    image: "gradient",
    totalSections: 24,
    totalLectures: 490,
    totalHours: 72,
    recommendPercent: 68,
    features: [
      "65 hours on demand video",
      "45 downloadable resources",
      "Access on mobile and TV",
      "86 articles",
      "30 min personal weekly session",
      "Meeting with Oxford Professor",
      "Certificate of completion"
    ],
    curriculum: [
      {
        id: "week1",
        title: "Week 1 - Beginner - Introduction to Business Management",
        progress: 22,
        lessons: [
          { title: "Read before you start", duration: "4min", type: "reading" },
          { title: "Introduction to Business Foundations & Principals of Management", duration: "1h 10min", type: "video" },
          { title: "Introduction to Brand Management: Aligning Business, Brand and Behaviour", duration: "1h 23min", type: "video" },
          { title: "Business Analysis & Process Management", duration: "43min", type: "video" },
          { title: "Major terms from the section", duration: "5 min", type: "reading" },
          { title: "Practice analyse", duration: "1 Question", type: "quiz" },
          { title: "Module 1", duration: "24 Questions", type: "quiz" }
        ]
      },
      {
        id: "week2",
        title: "Week 2 - Intermediate - Strategic Planning",
        progress: 0,
        lessons: [
          { title: "Strategic Planning Overview", duration: "50min", type: "video" },
          { title: "SWOT Analysis", duration: "35min", type: "video" },
          { title: "Module 2 Test", duration: "15 Questions", type: "quiz" }
        ]
      }
    ]
  };

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks(prev =>
      prev.includes(weekId)
        ? prev.filter(id => id !== weekId)
        : [...prev, weekId]
    );
  };

  const handleStartCourse = () => {
    navigate(`/course/${courseId}/learn`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span className="hover:text-foreground cursor-pointer">Courses</span>
          {" / "}
          <span className="hover:text-foreground cursor-pointer">Popular courses</span>
          {" / "}
          <span className="text-foreground">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-sm text-muted-foreground">based on {course.reviews} reviews</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-primary" />
              <div>
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-sm text-muted-foreground">
                  <Users className="inline h-3 w-3 mr-1" />
                  {course.instructor.students}
                </p>
              </div>
              <div className="ml-auto">
                <p className="text-sm text-muted-foreground">
                  <CheckCircle className="inline h-4 w-4 mr-1 text-green-500" />
                  {course.recommendPercent}% students recommend this course
                </p>
              </div>
            </div>

            <Separator />

            {/* Course Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Course content</h2>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {course.totalSections} sections
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    {course.totalLectures} lectures
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.totalHours} hours total lenght
                  </span>
                </div>
              </div>

              {/* Curriculum Accordion */}
              <div className="space-y-2">
                {course.curriculum.map((week) => (
                  <Card key={week.id} className="overflow-hidden">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleWeek(week.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedWeeks.includes(week.id) ? "rotate-180" : ""
                          }`}
                        />
                        <div>
                          <h3 className="font-medium">{week.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {week.progress > 0 && (
                          <Badge variant="secondary">{week.progress}%</Badge>
                        )}
                      </div>
                    </div>

                    {expandedWeeks.includes(week.id) && (
                      <div className="border-t">
                        {week.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 hover:bg-muted/50 border-b last:border-b-0"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {lesson.type === "video" && <Play className="h-4 w-4" />}
                              {lesson.type === "reading" && <FileText className="h-4 w-4" />}
                              {lesson.type === "quiz" && <CheckCircle className="h-4 w-4" />}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="overflow-hidden sticky top-6">
              {/* Course Image */}
              {course.image === "gradient" ? (
                <div className="aspect-video bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <img src={course.image} alt={course.title} className="w-full aspect-video object-cover" />
              )}

              <div className="p-6 space-y-4">
                {/* Pricing */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">${course.price}</span>
                  <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                  <Badge variant="destructive">{course.discount}% sale</Badge>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleStartCourse}>
                    <Play className="mr-2 h-5 w-5" />
                    Buy course now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Send message to teacher
                  </Button>
                </div>

                <Separator />

                {/* Course Includes */}
                <div className="space-y-3">
                  <h3 className="font-semibold">This course includes</h3>
                  <div className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Trial Info */}
                <Card className="bg-muted p-4 space-y-2">
                  <h4 className="font-semibold">10 min trial course</h4>
                  <p className="text-sm text-muted-foreground">Have a look and feel at the course with a quick trial.</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Review
                  </Button>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
