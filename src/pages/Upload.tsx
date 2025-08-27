import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload as UploadIcon, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    sector: "",
    level: "",
    accessType: "free",
    file: null as File | null
  });

  const educationSectors = {
    "+2": ["Grade 11", "Grade 12"],
    "Bachelors": ["BBA", "BBS", "BIT", "BSc.IT", "BCA"],
    "Masters": ["MBA", "MBS", "MIT", "MSc.IT"],
    "Loksewa": ["PSC", "Banking", "Administrative", "Technical"]
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf", "text/markdown"];
      if (!allowedTypes.includes(file.type) && !file.name.endsWith('.md')) {
        toast({
          title: "Invalid file type",
          description: "Please upload only PDF or Markdown files.",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.sector || !formData.level || !formData.file) {
      toast({
        title: "Missing information",
        description: "Please fill all fields and select a file.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with Supabase for file upload and database storage
    toast({
      title: "Upload successful!",
      description: `${formData.title} has been uploaded successfully.`,
    });

    // Reset form
    setFormData({
      title: "",
      sector: "",
      level: "",
      accessType: "free",
      file: null
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Notes</h1>
            <p className="text-muted-foreground">Share educational content with students</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload New Note
              </CardTitle>
              <CardDescription>
                Upload PDF or Markdown files for students to access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Note Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter the title of the note"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Education Sector</Label>
                    <Select value={formData.sector} onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, sector: value, level: "" }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
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
                    <Label>Education Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))} disabled={!formData.sector}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.sector && educationSectors[formData.sector as keyof typeof educationSectors]?.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Access Type</Label>
                  <RadioGroup 
                    value={formData.accessType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, accessType: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free">Free Access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium">Premium Access (Requires Payment)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="flex items-center justify-center w-full">
                    <label 
                      htmlFor="file" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF or MD files only</p>
                        {formData.file && (
                          <p className="text-sm text-primary mt-2 font-medium">
                            Selected: {formData.file.name}
                          </p>
                        )}
                      </div>
                      <input 
                        id="file" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.md,.markdown"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload Note
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;