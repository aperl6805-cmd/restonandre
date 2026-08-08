import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Copy, Github, Linkedin, Send, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { uiSound } from "./SoundToggle";

const EMAIL = "restonchris9@gmail.com";

export function FooterSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      uiSound.success();
      setTimeout(() => setCopied(false), 2000);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — try selecting the address");
    }
  };

  const celebrate = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 34,
      scalar: 0.9,
      origin: { y: 0.75 },
      colors: ["#10b981", "#34d399", "#f8fafc"],
    });
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
    setSent(true);
    uiSound.success();
    celebrate();
    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }, 700);
    setTimeout(() => setSent(false), 4000);
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
                <MagneticButton
                  onMouseEnter={uiSound.hover}
                  onClick={copyEmail}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow transition-colors hover:bg-primary-glow"
                >
                  {copied ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? "Copied!" : EMAIL}
                </MagneticButton>
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
                      onMouseEnter={uiSound.hover}
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
              className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-glow"
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

              <MagneticButton
                type="submit"
                onMouseEnter={uiSound.hover}
                className="relative mt-5 inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-glow"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className="inline-flex items-center"
                    >
                      <motion.span
                        initial={{ rotate: -20, x: -6 }}
                        animate={{ rotate: 0, x: 0 }}
                        className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/20"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </motion.span>
                      Message on its way
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="inline-flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4" /> Send message
                    </motion.span>
                  )}
                </AnimatePresence>
              </MagneticButton>
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
