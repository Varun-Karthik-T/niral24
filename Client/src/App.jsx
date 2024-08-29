import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function App() {
  const [selectedTab, setSelectedTab] = useState("text");
  const [fileFormat, setFileFormat] = useState("pdf");

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background text-foreground">
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
                  <TabsList className="flex justify-center">
                    <TabsTrigger value="text" className="p-2">Text</TabsTrigger>
                    <TabsTrigger value="file" className="p-2">File</TabsTrigger>
                  </TabsList>

                  <TabsContent value="text">
                    <div className="mt-4">
                      <Label htmlFor="largeTextInput" className="block mb-2">Enter Text</Label>
                      <Textarea
                        id="largeTextInput"
                        placeholder="Type or paste your text here..."
                        rows={10}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <Button className="mt-4 w-full bg-gray-800 text-white hover:bg-gray-950">Submit</Button>
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
                      <Button className="mt-4 w-full bg-gray-800 text-white hover:bg-gray-950">Upload</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
      </div>
    </ThemeProvider>
  );
}