import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Code2,
  Copy,
  ExternalLink,
  GraduationCap,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { toast } from "sonner";

const EMAIL = "restonchris9@gmail.com";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (hash: string) => {
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = hash;
  };

  const copyEmail = async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy");
    }
  };

  const toggleTheme = () => {
    setOpen(false);
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    root.classList.remove("dark", "light");
    root.classList.add(isDark ? "light" : "dark");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search sections, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("#top")}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => go("#about")}>
            <User className="mr-2 h-4 w-4" /> About
          </CommandItem>
          <CommandItem onSelect={() => go("#projects")}>
            <Code2 className="mr-2 h-4 w-4" /> Projects
          </CommandItem>
          <CommandItem onSelect={() => go("#education")}>
            <GraduationCap className="mr-2 h-4 w-4" /> Education
          </CommandItem>
          <CommandItem onSelect={() => go("#contact")}>
            <Mail className="mr-2 h-4 w-4" /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={copyEmail}>
            <Copy className="mr-2 h-4 w-4" /> Copy email address
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.open("https://dreflow.netlify.app/", "_blank", "noopener,noreferrer");
            }}
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Open Dreflow
          </CommandItem>
          <CommandItem onSelect={toggleTheme}>
            <Sun className="mr-2 h-4 w-4 dark:hidden" />
            <Moon className="mr-2 hidden h-4 w-4 dark:inline" />
            Toggle theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
