import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export const ReturnHome = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </header>
  );
};
