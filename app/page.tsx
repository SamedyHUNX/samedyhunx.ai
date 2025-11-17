import { AuthButton } from "@/components/ui/customs/auth-button";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProfileCard } from "@/components/ui/customs/profile-card";

export default async function Home() {
  const isAdmin = true;
  const posts = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href={"/"}
            className="font-cormorantGaramond font-light text-4xl text-neutral-900 hover:text-neutral-700 transition-colors"
          >
            <h1>samedyhunx.ai</h1>
          </Link>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Button asChild>
                <Link href="/admin/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </Button>
            )}
            <AuthButton />
          </div>
        </div>
      </header>
      <ProfileCard
        image="/profile.jpg"
        name="Samedy Hun"
        description="I like to train deep neural nets on large datasets 🧠🤖💥"
        gitHubLink="https://github.com/SamedyHUNX"
        xLink=""
        email="samedyhunx@gmail.com"
      />
    </div>
  );
}
