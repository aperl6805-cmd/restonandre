import { useState } from "react";
import { Copy, Github, Linkedin, Send, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "./Reveal";

const EMAIL = "christian.reston@example.com";

export function FooterSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — try selecting the address");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <footer id="contact" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Get in touch</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Have a project in mind or just want to say hello? Drop a note below or
              copy my email directly.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Direct line</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prefer email? Tap to copy and I'll get back within a day or two.
                </p>
                <Button
                  onClick={copyEmail}
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {EMAIL}
                </Button>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Find me online
                </p>
                <div className="mt-3 flex gap-2">
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
                      className="rounded-full border-border bg-background hover:border-primary/60 hover:text-primary"
                    >
                      <a href={href} aria-label={label}>
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border bg-surface p-6 shadow-glow"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project…"
                  className="mt-2 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary-glow"
              >
                <Send className="mr-2 h-4 w-4" /> Send message
              </Button>
            </form>
          </Reveal>
        </div>

        <p className="mt-16 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Christian Andre C. Reston. Built with care.
        </p>
      </div>
    </footer>
  );
}
