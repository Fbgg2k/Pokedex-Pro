
"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "original" | "blue" | "pink";

const themes: { value: Theme; label: string }[] = [
  { value: "original", label: "Original (Red)" },
  { value: "blue", label: "Blue" },
  { value: "pink", label: "Pink" },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const [activeTheme, setActiveTheme] = React.useState<Theme>("original");

  React.useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("pokedex-app-theme") as Theme | null;
    // Ensure "original" is a valid theme option if nothing is stored or value is invalid
    const initialTheme = themes.some(t => t.value === storedTheme) ? storedTheme! : "original";
    
    document.documentElement.setAttribute("data-theme", initialTheme);
    setActiveTheme(initialTheme);
    if (!storedTheme || !themes.some(t => t.value === storedTheme)) {
      localStorage.setItem("pokedex-app-theme", "original");
    }
  }, []);

  const setTheme = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pokedex-app-theme", theme);
    setActiveTheme(theme);
  };

  if (!mounted) {
    return <div className="w-9 h-9" />; 
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9" aria-label="Switch theme">
          <Palette className="h-5 w-5 text-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem key={theme.value} onClick={() => setTheme(theme.value)}>
            {theme.label}
            {activeTheme === theme.value && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
