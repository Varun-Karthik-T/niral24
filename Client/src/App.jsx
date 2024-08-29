import React, { useState } from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import d from "./data/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import axios from "axios";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("text");
  const [fileFormat, setFileFormat] = useState("pdf");
  const [fileName, setFileName] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [fetchedData, setFetchedData] = useState(d.data[0].conversations);
  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (selectedTab === "text" && textValue.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    if (selectedTab === "file" && !fileName) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setShowLoader(true); 

    const formData = new FormData();
    if (selectedTab === "text") {
      formData.append("text", textValue);
      formData.append("type", "text");
    } else {
      const fileInput = document.getElementById("fileUpload");
      formData.append("file", fileInput.files[0]); 
      formData.append("format", fileFormat);
      formData.append("type", "file");
    }

    axios.post("http://localhost:3000/pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      console.log(response.data);
      setAlertMessage("Extracted successfully!");
      setTextValue("");  // Clear text
      setFileName(null); // Clear file
    })
    .catch(error => {
      setAlertMessage("Upload failed. Please try again.");
    })
    .finally(() => {
      setLoading(false);
      setShowLoader(false);
      setShowAlert(true);
    });
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className={`min-h-screen bg-background text-foreground ${showLoader ? 'blurred' : ''}`}>
        <nav className="p-4 bg-gray-800 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-wide">Text-ract</h1>
            <ModeToggle />
          </div>
        </nav>
        <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900">
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">Input Section</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="flex w-full rounded-none">
                  <TabsTrigger
                    value="text"
                    className={`flex-1 p-2 text-center border-b-2 transition-colors rounded-none ${
                      selectedTab === "text" ? "border-gray-800" : "border-transparent"
                    }`}
                  >
                    Text
                  </TabsTrigger>
                  <TabsTrigger
                    value="file"
                    className={`flex-1 p-2 text-center border-b-2 transition-colors rounded-none ${
                      selectedTab === "file" ? "border-gray-800" : "border-transparent"
                    }`}
                  >
                    File
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                  <div className="mt-4">
                    <Label htmlFor="largeTextInput" className="block mb-2">Enter Text</Label>
                    <Textarea
                      id="largeTextInput"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      placeholder="Type or paste your text here..."
                      rows={10}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <Button
                      className={`mt-4 w-full ${loading ? 'bg-gray-500' : 'bg-gray-800'} text-white hover:bg-gray-950`}
                      onClick={handleSubmit}
                    >
                      {loading ? <div className="w-full h-2 bg-gray-800 animate-fill" /> : "Submit"}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="file">
                  <div className="mt-4">
                    <Label className="block mb-2">Select File Format</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">{fileFormat.toUpperCase()}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFileFormat("pdf")}>PDF</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFileFormat("txt")}>Text File</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="fileUpload" className="block mb-2">Upload {fileFormat.toUpperCase()}</Label>
                    <div className="relative">
                      <input
                        id="fileUpload"
                        type="file"
                        accept={fileFormat === "pdf" ? ".pdf" : ".txt"}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        aria-label="Upload file"
                        onChange={handleFileChange}
                      />
                      <Button
                        as="label"
                        htmlFor="fileUpload"
                        variant="outline"
                        className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
                      >
                        Choose File
                      </Button>
                    </div>
                    {fileName && (
                      <p className="mt-2 text-center text-gray-600 dark:text-gray-400">{fileName}</p>
                    )}
                    <Button
                      className={`mt-4 w-full ${loading ? 'bg-gray-500' : 'bg-gray-800'} text-white hover:bg-gray-950`}
                      onClick={handleSubmit}
                    >
                      {loading ? <div className="w-full h-2 bg-gray-800 animate-fill" /> : "Upload"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogTrigger asChild>
                  <div />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Notification</AlertDialogTitle>
                  <AlertDialogDescription>
                    {alertMessage}
                  </AlertDialogDescription>
                  <div className="flex gap-4 mt-4">
                    <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
                    <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
              {showLoader && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}