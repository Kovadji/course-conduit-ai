import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Bookmark, Users, Star, Upload, GripVertical, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Courses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("popular");
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults] = useState({
    last: ["Leadership and comunication", "Speaking", "UI/UX Design"],
    others: ["Speaking", "Speaking"]
  });
  const [courseTags, setCourseTags] = useState(["Design", "UI/UX", "Web app"]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [courseName, setCourseName] = useState("Design for beginners");
  const [courseDescription, setCourseDescription] = useState("Hi anyone! In this course you learn Design interfaces / Perfect UX / Launch projects");
  const [coursePrice, setCoursePrice] = useState("120");
  const [courses, setCourses] = useState<any[]>([
    {
      id: "1",
      title: "UI/UX design",
      price: "120$",
      description: "Design interfaces. Perfect UX. Launch projects.",
      students: "9.5K",
      rating: 4.3,
      author: "zh.fair",
      image: "gradient"
    },
    {
      id: "2",
      title: "Advanced Mathematics",
      price: "89$",
      description: "Master calculus, linear algebra and differential equations.",
      students: "12.3K",
      rating: 4.7,
      author: "Dr.Khan",
      image: "gradient"
    },
    {
      id: "3",
      title: "IELTS Speaking Mastery",
      price: "99$",
      description: "Achieve band 7+ in IELTS speaking with expert strategies.",
      students: "8.7K",
      rating: 4.5,
      author: "Emma.L",
      image: "gradient"
    },
    {
      id: "4",
      title: "Physics for ENT",
      price: "110$",
      description: "Complete physics preparation for ENT exam.",
      students: "15.2K",
      rating: 4.8,
      author: "Prof.T",
      image: "gradient"
    }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCourse = () => {
    const newCourse = {
      id: Date.now().toString(),
      title: courseName,
      price: `${coursePrice}$`,
      description: courseDescription,
      students: "0",
      rating: 5.0,
      author: "Author",
      image: coverImage || "gradient"
    };

    setCourses([newCourse, ...courses]);
    toast.success("Курс успешно создан!");
    setShowCreateCourse(false);
    
    // Reset form
    setCourseName("Design for beginners");
    setCourseDescription("Hi anyone! In this course you learn Design interfaces / Perfect UX / Launch projects");
    setCoursePrice("120");
    setCoverImage(null);
    setCourseTags(["Design", "UI/UX", "Web app"]);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search" 
            className="pl-10"
            onFocus={() => setSearchOpen(true)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="popular" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Popular
          </TabsTrigger>
          <TabsTrigger 
            value="it-design"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            IT&Design
          </TabsTrigger>
          <TabsTrigger 
            value="english"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            English
          </TabsTrigger>
          <TabsTrigger 
            value="science"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Science
          </TabsTrigger>
          <TabsTrigger 
            value="soft-skills"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Soft skills
          </TabsTrigger>
          </TabsList>
          <Button onClick={() => setShowCreateCourse(true)}>Create new</Button>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navigate(`/course/${course.id}`)}>
                {course.image === "gradient" ? (
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{course.title}</h3>
                    <span className="font-bold text-primary">{course.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-foreground rounded-full"></div>
                      <span className="text-xs">{course.author}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Course Dialog */}
      <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Design for beginners</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-6">
            {/* Left Side - Main Form */}
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Basic info</h3>
                
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cover image</Label>
                  <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                    {coverImage ? (
                      <img src={coverImage} alt="Cover" className="w-full h-32 object-cover rounded-lg" />
                    ) : (
                      <>
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 rounded backdrop-blur-sm"></div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Upload className="h-4 w-4" />
                          <span>Upload cover image</span>
                        </div>
                      </>
                    )}
                  </label>
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <div className="space-y-2">
                    {["Acquaintance with Figma", "UI / UX rules", "Light regulation"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <span className="flex-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Settings */}
            <div className="w-72 space-y-4">
              <div className="space-y-2">
                <Label>Course level</Label>
                <Select defaultValue="beginner">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Course tag</Label>
                <div className="flex flex-wrap gap-2">
                  {courseTags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                      <span>{tag}</span>
                      <button onClick={() => setCourseTags(courseTags.filter((_, idx) => idx !== i))}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pricing</Label>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Price</Label>
                  <div className="flex gap-2">
                    <Input value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} className="flex-1" />
                    <Select defaultValue="usd">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reward</Label>
                <Input defaultValue="137 Exp" />
              </div>

              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full">Share</Button>
                <Button className="w-full" onClick={handleCreateCourse}>Apply</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-background/95 z-50 animate-fade-in">
          <div className="container max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Last</h3>
                <div className="space-y-2">
                  {searchResults.last.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 bg-muted-foreground/20 rounded" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Others</h3>
                <div className="space-y-2">
                  {searchResults.others.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 bg-muted-foreground/20 rounded" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
