import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Camera, Trophy, TrendingUp, Award, Star, Target } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [username, setUsername] = useState("Batyrkhan");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile photo updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
        toast.success("Background updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const achievements = [
    {
      icon: Trophy,
      title: "Lifelong Learner",
      description: "Log-in and learn 100 days in a row",
      progress: 100,
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Habit Builder",
      description: "Log-in and learn 30 days in a row",
      progress: 100,
      color: "text-blue-500"
    },
    {
      icon: Star,
      title: "Streak Starter",
      description: "Log-in and learn 7 days in a row",
      progress: 100,
      color: "text-orange-500"
    },
    {
      icon: Award,
      title: "Foundation Starter",
      description: "Complete your first module in any course",
      progress: 100,
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Foundation Builder",
      description: "Complete your first course on Thunmm.",
      progress: 75,
      color: "text-green-500"
    }
  ];

  const testStats = [
    { subject: "Mathematics", score: 85, total: 100, tests: 12 },
    { subject: "English", score: 92, total: 100, tests: 8 },
    { subject: "Physics", score: 78, total: 100, tests: 10 },
    { subject: "Chemistry", score: 88, total: 100, tests: 9 }
  ];

  const courseStats = [
    { course: "UI/UX Design", progress: 75, hours: 24 },
    { course: "Speaking", progress: 50, hours: 18 },
    { course: "Leadership", progress: 10, hours: 3 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        {/* Background */}
        <div className="h-48 w-full relative overflow-hidden">
          {backgroundImage ? (
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20" />
          )}
          <label className="absolute top-4 right-4 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleBackgroundUpload} />
            <Button size="sm" variant="secondary">
              <Camera className="w-4 h-4 mr-2" />
              Change Background
            </Button>
          </label>
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-6 -mt-16">
          <div className="flex items-end gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary/50" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </div>
              </label>
            </div>
            <div className="flex-1 pb-4">
              <h1 className="text-3xl font-bold">{username}</h1>
              <p className="text-muted-foreground">Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Edit Profile Tab */}
          <TabsContent value="edit" className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="batyrkhan@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Passionate learner and achiever" />
                </div>
                <Button onClick={() => toast.success("Profile updated!")}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Statistics */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Test Performance</h3>
                  <div className="space-y-4">
                    {testStats.map((stat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stat.subject}</span>
                          <span className="text-muted-foreground">
                            {stat.score}/{stat.total} • {stat.tests} tests
                          </span>
                        </div>
                        <Progress value={(stat.score / stat.total) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Statistics */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Course Progress</h3>
                  <div className="space-y-4">
                    {courseStats.map((stat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stat.course}</span>
                          <span className="text-muted-foreground">
                            {stat.progress}% • {stat.hours}h
                          </span>
                        </div>
                        <Progress value={stat.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">39</div>
                  <div className="text-sm text-muted-foreground">Tests Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">86%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">45h</div>
                  <div className="text-sm text-muted-foreground">Study Time</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full bg-muted ${achievement.color}`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress}/100</span>
                          </div>
                          <Progress value={achievement.progress} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
