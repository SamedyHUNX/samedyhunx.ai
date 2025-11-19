import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MoonIcon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="w-5 h-5" />
    </button>
  );
};
