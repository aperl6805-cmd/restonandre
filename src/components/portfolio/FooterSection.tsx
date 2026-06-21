import { Copy, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const EMAIL = "christian.reston@example.com";

export function FooterSection() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — try selecting the address");
    }
  };

  return (
    <footer id="contact" className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Get in touch</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Have a project in mind or just want to say hello? My inbox is always
          open — I'll get back to you within a day or two.
        </p>

        <Button
          onClick={copyEmail}
          size="lg"
          className="mt-8 bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow"
        >
          <Copy className="mr-2 h-4 w-4" />
          {EMAIL}
        </Button>

        <div className="mt-8 flex gap-2">
          {[
            { Icon: Github, href: "#", label: "GitHub" },
            { Icon: Linkedin, href: "#", label: "LinkedIn" },
            { Icon: Twitter, href: "#", label: "Twitter" },
          ].map(({ Icon, href, label }) => (
            <Button
              key={label}
              asChild
              variant="outline"
              size="icon"
              className="rounded-full border-border bg-surface hover:border-primary/60 hover:text-primary"
            >
              <a href={href} aria-label={label}>
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Christian Andre C. Reston. Built with care.
        </p>
      </div>
    </footer>
  );
}
