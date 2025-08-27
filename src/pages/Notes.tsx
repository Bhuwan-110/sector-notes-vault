import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Download, Lock, Search } from "lucide-react";
import { useState } from "react";

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Mock data - this will be replaced with real data from Supabase
  const mockNotes = [
    {
      id: 1,
      title: "Mathematics - Calculus Fundamentals",
      sector: "+2",
      level: "Grade 12",
      accessType: "free",
      filePath: "/uploads/math-calculus.pdf"
    },
    {
      id: 2,
      title: "Business Studies - Marketing Principles",
      sector: "Bachelors",
      level: "BBA",
      accessType: "premium",
      filePath: "/uploads/business-marketing.pdf"
    },
    {
      id: 3,
      title: "Data Structures and Algorithms",
      sector: "Bachelors",
      level: "BIT",
      accessType: "free",
      filePath: "/uploads/dsa-notes.pdf"
    },
    {
      id: 4,
      title: "PSC General Knowledge",
      sector: "Loksewa",
      level: "PSC",
      accessType: "premium",
      filePath: "/uploads/psc-gk.pdf"
    }
  ];

  const educationSectors = {
    "+2": ["Grade 11", "Grade 12"],
    "Bachelors": ["BBA", "BBS", "BIT", "BSc.IT", "BCA"],
    "Masters": ["MBA", "MBS", "MIT", "MSc.IT"],
    "Loksewa": ["PSC", "Banking", "Administrative", "Technical"]
  };

  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || note.sector === selectedSector;
    const matchesLevel = !selectedLevel || note.level === selectedLevel;
    return matchesSearch && matchesSector && matchesLevel;
  });

  const handleDownload = (note: any) => {
    if (note.accessType === "premium") {
      // Redirect to payment
      alert("This is a premium note. Payment integration will be implemented with eSewa.");
    } else {
      // Handle free download
      alert(`Downloading: ${note.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Notes</h1>
          <p className="text-muted-foreground">Find and download notes for your education level</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger>
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sectors</SelectItem>
              {Object.keys(educationSectors).map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              {selectedSector && educationSectors[selectedSector as keyof typeof educationSectors]?.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setSelectedSector("");
            setSelectedLevel("");
          }}>
            Clear Filters
          </Button>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{note.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex gap-2">
                        <Badge variant="secondary">{note.sector}</Badge>
                        <Badge variant="outline">{note.level}</Badge>
                      </div>
                    </CardDescription>
                  </div>
                  {note.accessType === "premium" && (
                    <Lock className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleDownload(note)}
                  className="w-full"
                  variant={note.accessType === "premium" ? "default" : "outline"}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {note.accessType === "premium" ? "Get Premium Access" : "Download Free"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;