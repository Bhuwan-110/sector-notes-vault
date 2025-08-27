import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, FileText, Users } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const educationSectors = {
    "+2": ["Grade 11", "Grade 12"],
    "Bachelors": ["BBA", "BBS", "BIT", "BSc.IT", "BCA"],
    "Masters": ["MBA", "MBS", "MIT", "MSc.IT"],
    "Loksewa": ["PSC", "Banking", "Administrative", "Technical"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-gradient)] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Nepal Notes Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Access comprehensive study materials for +2, Bachelor's, Master's, and Loksewa preparation. Your success starts here.
            </p>
            
            {/* Education Level Selection */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Education Sector</label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="h-12 bg-card border-2">
                    <SelectValue placeholder="Choose your sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(educationSectors).map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel} disabled={!selectedSector}>
                  <SelectTrigger className="h-12 bg-card border-2">
                    <SelectValue placeholder="Choose your level" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSector && educationSectors[selectedSector as keyof typeof educationSectors]?.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button size="lg" className="h-12 px-8 text-lg font-semibold">
              Login to Access Notes
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Comprehensive Notes</CardTitle>
              <CardDescription>
                Quality study materials for all education levels from +2 to Masters
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>PDF & Interactive Notes</CardTitle>
              <CardDescription>
                Download PDF files or read interactive markdown notes online
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Loksewa Preparation</CardTitle>
              <CardDescription>
                Specialized materials for Public Service Commission and Banking exams
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
