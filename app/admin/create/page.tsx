"use client";

import { MarkdownRenderer } from "@/components/customs/markdown-renderer";
import { ThemeToggle } from "@/components/customs/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreatePostPage() {
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to create post: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800   sticky top-0 z-10 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant={"ghost"}
            asChild
            className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <Link href={"/"}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Create New Post
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Write your post in Markdown and see a live preview
            </p>
          </div>

          {/* Editor and Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Card */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                    Editor
                  </CardTitle>
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => setPreview(!preview)}
                    className="lg:hidden border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {preview ? "Hide" : "Show"} Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter an engaging title..."
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="content"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Content
                      </Label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Markdown supported
                      </span>
                    </div>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post in markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

- List item 1
- List item 2"
                      rows={20}
                      required
                      className="min-h-[500px] font-mono text-sm resize-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Switch
                        id="published"
                        checked={published}
                        onCheckedChange={setPublished}
                        className="data-[state=checked]:bg-green-600"
                      />
                      <div>
                        <Label
                          htmlFor="published"
                          className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
                        >
                          {published ? "Published" : "Draft"}
                        </Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {published
                            ? "Visible to everyone"
                            : "Only visible to you"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-medium py-6 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="animate-pulse">Creating...</span>
                      </>
                    ) : (
                      "Create Post"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <div className={`${preview ? "block" : "hidden"} lg:block`}>
              <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm sticky top-24">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-gray-500" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 wrap-break-word">
                      {title || (
                        <span className="text-gray-400 dark:text-gray-600">
                          Untitled Post
                        </span>
                      )}
                    </h2>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <MarkdownRenderer
                        content={
                          content ||
                          "_Start writing to see your content here..._"
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
