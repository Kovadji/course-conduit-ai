import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Bookmark, Users, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("popular");

  const courses = [
    {
      id: 1,
      title: "UI/UX design",
      price: "120$",
      description: "Design interfaces. Perfect UX. Launch projects.",
      students: "9.5K",
      rating: 4.3,
      author: "Zh.Tair",
      image: "colorful-bulb"
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search" className="pl-10" />
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
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
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

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Course Card with Image */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">UI/UX design</h3>
                  <span className="font-bold text-primary">120$</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Design interfaces. Perfect UX. Launch projects.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>9.5K</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>4.3</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-foreground rounded-full"></div>
                    <span className="text-xs">Zh.Tair</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Placeholder Cards */}
            {Array.from({ length: 11 }).map((_, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] bg-muted"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
