import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Menu,
  Pause,
  Play,
  Volume2,
  X,
} from "lucide-react";

import heroImage from "@/assets/jaystrings-studio-hero.jpg";
import laboratoryImage from "@/assets/jaystrings-laboratory.jpg";
import consoleImage from "@/assets/jaystrings-console.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const description =
  "JAYSTRINGS® is a sonic architecture studio building distinct records, cinematic scores, and artist worlds without limits.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JAYSTRINGS® — Sound Without Limits" },
      { name: "description", content: description },
      { property: "og:title", content: "JAYSTRINGS® — Sound Without Limits" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navItems = [
  ["Philosophy", "#philosophy"],
  ["Works", "#works"],
  ["Disciplines", "#disciplines"],
  ["Laboratory", "#laboratory"],
];

const tracks = [
  {
    number: "01",
    title: "After the Rain",
    artist: "Aṣa River",
    role: "Production · Arranging",
    year: "2026",
    duration: 23,
    frequency: 146.83,
  },
  {
    number: "02",
    title: "Mercury House",
    artist: "NOVA//LAGOS",
    role: "Production · Engineering",
    year: "2025",
    duration: 26,
    frequency: 174.61,
  },
  {
    number: "03",
    title: "The Distance Between",
    artist: "Original Motion Picture",
    role: "Score · Spatial Mix",
    year: "2026",
    duration: 21,
    frequency: 130.81,
  },
];

type AudioNodes = {
  context: AudioContext;
  oscillators: OscillatorNode[];
  startedAt: number;
};

function formatTime(seconds: number) {
  return `0:${Math.floor(seconds).toString().padStart(2, "0")}`;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="font-sans font-semibold tracking-normal text-foreground" aria-label="JAYSTRINGS home">
      JAYSTRINGS<span className={compact ? "text-[0.45em] align-super" : "text-[0.4em] align-super"}>®</span>
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <BrandMark compact />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-[11px] uppercase text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </a>
          ))}
          <a href="#inquiries" className="border-b border-primary pb-1 text-[11px] uppercase text-foreground transition-colors hover:text-primary">
            Start a project
          </a>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-6 md:hidden" aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="flex border-b border-border py-4 font-serif text-3xl text-foreground">
              <span className="mr-5 font-sans text-[10px] text-primary">0{index + 1}</span>{label}
            </a>
          ))}
          <a href="#inquiries" onClick={() => setOpen(false)} className="mt-6 flex items-center justify-between text-sm uppercase text-primary">
            Start a project <ArrowRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[94svh] overflow-hidden border-b border-border pt-16">
      <img src={heroImage} alt="Producer working at an analog console in the JAYSTRINGS studio" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
      <div className="absolute inset-0 bg-hero-wash" />
      <div className="relative z-10 mx-auto flex min-h-[calc(94svh-4rem)] max-w-[1600px] flex-col justify-between px-5 py-8 md:px-10 md:py-12">
        <div className="grid grid-cols-12 gap-4 border-t border-foreground/30 pt-3 text-[10px] uppercase text-foreground/70">
          <span className="col-span-6">Sonic Architecture Studio</span>
          <span className="col-span-3 hidden md:block">Lagos · Global</span>
          <span className="col-span-6 text-right md:col-span-3">Est. MMXVIII</span>
        </div>
        <div>
          <p className="mb-4 max-w-sm font-serif text-xl text-foreground/85 md:ml-[50%] md:text-2xl">
            We build records.<br />We don’t sell beats.
          </p>
          <h1 className="font-sans text-[clamp(3.35rem,11.8vw,12rem)] font-semibold leading-[0.78] text-foreground">
            JAYSTRINGS<span className="align-top text-[0.18em]">®</span>
          </h1>
          <div className="mt-7 flex items-end justify-between border-t border-foreground/30 pt-4">
            <p className="font-serif text-[clamp(1.8rem,4vw,4.25rem)] leading-none text-foreground">Sound Without Limits.</p>
            <a href="#philosophy" aria-label="Discover our philosophy" className="hidden h-12 w-12 items-center justify-center border border-foreground/40 text-foreground transition-colors hover:bg-foreground hover:text-background md:flex">
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="flex items-center gap-4 text-[10px] uppercase text-muted-foreground">
      <span className="text-primary">{number}</span><span>{children}</span>
    </div>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="scroll-mt-16 border-b border-border px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel number="01">Sonic Architecture</SectionLabel>
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-5">
          <h2 className="font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.93] md:col-span-8">
            A record is not a file.<br /><em className="text-primary">It is a world.</em>
          </h2>
          <div className="space-y-7 md:col-span-3 md:col-start-10 md:pt-3">
            <p className="text-base leading-7 text-muted-foreground">
              JAYSTRINGS® works beyond production. We listen for the architecture already living inside an artist—the tension, memory, rhythm, and silence that make their voice impossible to mistake.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              Then we build around it. From the first conversation to the final master, every choice serves emotion before fashion.
            </p>
          </div>
        </div>
        <div className="mt-24 grid border-t border-border md:grid-cols-3">
          {[
            ["I", "Identity Before Industry", "No templates. We uncover the musical language only this artist could speak."],
            ["II", "Emotion Before Excess", "Arrangement, tone, and space are measured by what they make the listener feel."],
            ["III", "Longevity Before Noise", "We make records designed to outlive cycles, feeds, and fleeting attention."],
          ].map(([number, title, copy]) => (
            <article key={number} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <span className="text-xs text-primary">{number}</span>
              <h3 className="mt-16 font-serif text-3xl">{title}</h3>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works() {
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<AudioNodes | null>(null);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.oscillators.forEach((oscillator) => oscillator.stop());
      void audio.context.close();
      audioRef.current = null;
    }
  };

  useEffect(() => () => stopAudio(), []);

  useEffect(() => {
    if (active === null || !audioRef.current) return;
    const track = tracks[active];
    if (!track) return;
    const timer = window.setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const elapsed = audio.context.currentTime - audio.startedAt;
      const duration = track.duration;
      if (elapsed >= duration) {
        stopAudio();
        setActive(null);
        setProgress(0);
      } else {
        setProgress(elapsed);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [active]);

  const toggleTrack = (index: number) => {
    const track = tracks[index];
    if (!track) return;
    if (active === index) {
      stopAudio();
      setActive(null);
      setProgress(0);
      return;
    }
    stopAudio();
    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.11, context.currentTime + 1.4);
    master.connect(context.destination);
    const base = track.frequency;
    const oscillators = [1, 1.5, 2.01].map((ratio, layer) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = layer === 0 ? "sine" : "triangle";
      oscillator.frequency.value = base * ratio;
      oscillator.detune.value = layer * 4;
      gain.gain.value = 0.42 / (layer + 1);
      oscillator.connect(gain).connect(master);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, oscillators, startedAt: context.currentTime };
    setProgress(0);
    setActive(index);
  };

  return (
    <section id="works" className="scroll-mt-16 bg-secondary px-5 py-24 text-secondary-foreground md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between border-b border-secondary-foreground/25 pb-8">
          <div>
            <SectionLabel number="02">Selected Works</SectionLabel>
            <h2 className="mt-7 font-serif text-[clamp(3.25rem,7vw,7rem)] leading-none">Listen closely.</h2>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-5 text-secondary-foreground/60 md:block">Original generative sound studies.<br />Headphones recommended.</p>
        </div>
        <div>
          {tracks.map((track, index) => {
            const playing = active === index;
            return (
              <article key={track.title} className="group border-b border-secondary-foreground/25 py-6 md:py-8">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-12 md:gap-5">
                  <span className="hidden text-xs text-secondary-foreground/45 md:col-span-1 md:block">{track.number}</span>
                  <Button variant="outline" size="icon" onClick={() => toggleTrack(index)} className="h-12 w-12 rounded-full border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-primary hover:text-primary-foreground md:col-span-1" aria-label={`${playing ? "Pause" : "Play"} ${track.title}`}>
                    {playing ? <Pause /> : <Play className="translate-x-px" />}
                  </Button>
                  <div className="min-w-0 md:col-span-4">
                    <h3 className="truncate font-serif text-2xl md:text-4xl">{track.title}</h3>
                    <p className="mt-1 text-[10px] uppercase text-secondary-foreground/55">{track.artist}</p>
                  </div>
                  <p className="hidden text-xs uppercase text-secondary-foreground/55 md:col-span-3 md:block">{track.role}</p>
                  <div className="hidden md:col-span-2 md:block">
                    <div className="h-px bg-secondary-foreground/20"><div className="h-px bg-primary transition-[width] duration-100" style={{ width: playing ? `${(progress / track.duration) * 100}%` : "0%" }} /></div>
                  </div>
                  <span className="text-[10px] text-secondary-foreground/55 md:col-span-1 md:text-right">{playing ? formatTime(progress) : track.year}</span>
                </div>
                <div className="mt-4 flex items-center gap-3 md:hidden">
                  <span className="text-[9px] uppercase text-secondary-foreground/50">{track.role}</span>
                  <div className="h-px flex-1 bg-secondary-foreground/20"><div className="h-px bg-primary" style={{ width: playing ? `${(progress / track.duration) * 100}%` : "0%" }} /></div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between text-[9px] uppercase text-secondary-foreground/45">
          <span className="flex items-center gap-2"><Volume2 size={12} /> Generative previews</span><span>Studio Archive / Vol. 01</span>
        </div>
      </div>
    </section>
  );
}

const disciplines = [
  ["01", "Sonic Architecture", "Defining the emotional, cultural, and sonic world a body of work will inhabit."],
  ["02", "Record Production", "End-to-end creative direction—from first voice note to final approved master."],
  ["03", "Film & Cinematic Scoring", "Original music that carries narrative, tension, place, and the unsaid."],
  ["04", "Artist Development", "Long-view partnership shaping identity, repertoire, performance, and creative language."],
  ["05", "Mixing & Spatial Audio", "Depth, movement, detail, and translation across every listening environment."],
];

function Disciplines() {
  return (
    <section id="disciplines" className="scroll-mt-16 border-b border-border px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel number="03">Services & Disciplines</SectionLabel>
        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <h2 className="font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] md:col-span-5">One vision.<br /><em className="text-primary">Every detail.</em></h2>
          <div className="md:col-span-6 md:col-start-7">
            {disciplines.map(([number, title, copy]) => (
              <article key={number} className="group grid grid-cols-[2.5rem_1fr] border-t border-border py-7 md:grid-cols-[4rem_1fr]">
                <span className="pt-1 text-[10px] text-primary">{number}</span>
                <div>
                  <h3 className="font-serif text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">{title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Laboratory() {
  return (
    <section id="laboratory" className="scroll-mt-16 border-b border-border px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel number="04">The Laboratory</SectionLabel>
        <div className="mt-14 grid gap-5 md:grid-cols-12">
          <div className="relative overflow-hidden md:col-span-5 md:row-span-2">
            <img src={laboratoryImage} alt="Producer shaping sound on modular equipment in the laboratory" width={1200} height={1504} loading="lazy" className="aspect-[4/5] h-full w-full object-cover grayscale-[15%] transition-transform duration-700 hover:scale-[1.02]" />
            <span className="absolute bottom-4 left-4 bg-background px-2 py-1 text-[9px] uppercase text-foreground">Lagos / Session 042</span>
          </div>
          <div className="flex flex-col justify-between border-t border-border pt-6 md:col-span-7 md:pl-8">
            <h2 className="font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.94]">Technology serves the story. <em className="text-primary">Never the reverse.</em></h2>
            <p className="mt-14 max-w-xl text-base leading-7 text-muted-foreground md:ml-auto">Our laboratory brings analog instinct and digital precision into the same room. Vintage circuits, new spatial tools, live musicianship, field recordings, and silence are all materials—not status symbols.</p>
          </div>
          <div className="grid gap-5 md:col-span-7 md:grid-cols-2 md:pl-8">
            <img src={consoleImage} alt="Hands shaping a mix on an analog recording console" width={1200} height={800} loading="lazy" className="aspect-[3/2] h-full w-full object-cover" />
            <div className="border-t border-border pt-5">
              <p className="font-serif text-3xl">Rooted here.<br />Built for everywhere.</p>
              <p className="mt-7 text-sm leading-6 text-muted-foreground">A global African perspective is not a genre. It is a way of hearing: rhythm as language, memory as texture, and innovation without permission.</p>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 border-y border-border md:grid-cols-4">
          {["Listen", "Design", "Build", "Refine"].map((step, index) => (
            <div key={step} className="border-r border-border px-4 py-7 last:border-r-0 md:px-7">
              <span className="text-[9px] text-primary">0{index + 1}</span><p className="mt-8 font-serif text-2xl">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Press() {
  return (
    <section className="overflow-hidden bg-accent px-5 py-24 text-accent-foreground md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel number="05">Notes on the Work</SectionLabel>
        <blockquote className="mx-auto mt-20 max-w-6xl text-center font-serif text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.98]">
          “Music should not decorate a moment. It should <em>change the temperature</em> of the room.”
        </blockquote>
        <p className="mt-10 text-center text-[10px] uppercase text-accent-foreground/55">JAYSTRINGS® / On creative intention</p>
        <div className="mt-24 grid border-t border-accent-foreground/25 md:grid-cols-3">
          {[
            ["A&R Editorial", "A producer with the patience to find the record beneath the song."],
            ["New African Sound", "Part engineer, part director, part cultural translator."],
            ["The Listening Room", "Every silence feels composed. Every detail earns its place."],
          ].map(([source, quote]) => (
            <article key={source} className="border-b border-accent-foreground/25 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
              <p className="text-sm leading-6">“{quote}”</p><p className="mt-10 text-[9px] uppercase text-accent-foreground/50">{source}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-[9px] text-accent-foreground/45">Editorial copy shown for presentation; publication details to be confirmed.</p>
      </div>
    </section>
  );
}

function Inquiry() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section id="inquiries" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel number="06">Private Inquiries</SectionLabel>
          <h2 className="mt-12 font-serif text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.9]">Begin with the <em className="text-primary">right question.</em></h2>
          <p className="mt-10 max-w-md text-sm leading-6 text-muted-foreground">For artists, labels, filmmakers, and creative directors building work with a point of view. Selected projects only.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {sent ? (
            <div className="flex min-h-[32rem] flex-col justify-between border-t border-border py-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary"><Check size={18} /></span>
              <div><h3 className="font-serif text-5xl">Inquiry received.</h3><p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">Thank you for bringing us into the conversation. We’ll review the brief and respond if the alignment is right.</p></div>
              <Button variant="outline" onClick={() => setSent(false)} className="w-fit rounded-none">Send another inquiry</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-7" aria-label="Production inquiry form">
              <div className="grid gap-7 md:grid-cols-2">
                <label className="form-label">Name / Organization<Input required name="name" autoComplete="name" placeholder="Your name" className="editorial-input" /></label>
                <label className="form-label">Email<Input required type="email" name="email" autoComplete="email" placeholder="name@studio.com" className="editorial-input" /></label>
              </div>
              <div className="grid gap-7 md:grid-cols-2">
                <label className="form-label">Project type<select required name="type" defaultValue="" className="editorial-select"><option value="" disabled>Select one</option><option>Artist project</option><option>Label commission</option><option>Film / TV score</option><option>Brand / cultural project</option></select></label>
                <label className="form-label">Timeline<Input required name="timeline" placeholder="Target dates" className="editorial-input" /></label>
              </div>
              <label className="form-label">Working budget<select required name="budget" defaultValue="" className="editorial-select"><option value="" disabled>Select a range</option><option>$5k–$15k</option><option>$15k–$40k</option><option>$40k+</option><option>To be discussed</option></select></label>
              <label className="form-label">The brief<Textarea required name="brief" placeholder="Tell us what you are building, why it matters, and where you are in the process." className="editorial-input min-h-36 resize-none" /></label>
              <Button type="submit" size="lg" className="h-14 w-full justify-between rounded-none px-5 uppercase">Submit private inquiry <ArrowRight size={16} /></Button>
              <p className="text-[9px] uppercase text-muted-foreground">Your material is treated as confidential.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary px-5 pb-8 pt-20 text-secondary-foreground md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7"><p className="font-serif text-4xl md:text-6xl">Sound Without Limits.</p><p className="mt-5 text-xs text-secondary-foreground/50">Lagos · London · Worldwide</p></div>
          <div className="grid grid-cols-2 gap-8 text-xs md:col-span-4 md:col-start-9">
            <div><p className="mb-4 text-secondary-foreground/40">Navigate</p>{navItems.slice(0, 3).map(([label, href]) => <a key={href} href={href} className="mb-2 block hover:text-primary">{label}</a>)}</div>
            <div><p className="mb-4 text-secondary-foreground/40">Connect</p><a href="mailto:studio@jaystrings.com" className="mb-2 block hover:text-primary">Email</a><a href="#top" className="mb-2 block hover:text-primary">Instagram</a><a href="#top" className="block hover:text-primary">YouTube</a></div>
          </div>
        </div>
        <div className="mt-20 border-t border-secondary-foreground/20 pt-6">
          <p className="font-sans text-[clamp(3rem,10vw,10rem)] font-semibold leading-none">JAYSTRINGS<span className="align-top text-[0.18em]">®</span></p>
          <div className="mt-5 flex justify-between text-[9px] uppercase text-secondary-foreground/40"><span>© 2026 JAYSTRINGS®</span><a href="#top" className="hover:text-secondary-foreground">Back to top ↑</a></div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SiteHeader /><Hero /><Philosophy /><Works /><Disciplines /><Laboratory /><Press /><Inquiry /><Footer />
    </main>
  );
}