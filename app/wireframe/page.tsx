import { LetsConnect } from "./lets-connect";

export default function WireframePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main">
        <Hero />
        <Introduction />
        <SelectedWork />
        <Experience />
        <SkillStack />
        <Recognition />
        <Certifications />
        <LetsConnectSection />
      </main>
    </div>
  );
}

function Nav() {
  const anchors = [
    ["#work", "Work"],
    ["#experience", "Experience"],
    ["#stack", "Stack"],
    ["#recognition", "Awards"],
    ["#certifications", "Certs"],
    ["#connect", "Connect"],
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-bg/80 border-b border-line">
      <div className="mx-auto max-w-[1280px] px-6 h-full flex items-center justify-between">
        <span className="font-display font-medium">[Name]</span>
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-ink-2"
        >
          {anchors.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-ink">
              [{label}]
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Section({
  id,
  label,
  width = "content",
  children,
}: {
  id?: string;
  label?: string;
  width?: "reading" | "content" | "wide";
  children: React.ReactNode;
}) {
  const maxW =
    width === "reading"
      ? "max-w-[720px]"
      : width === "wide"
        ? "max-w-[1440px]"
        : "max-w-[1280px]";
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="py-32 md:py-40 border-b border-line"
    >
      <div className={`mx-auto px-6 ${maxW}`}>
        {label && (
          <div className="font-mono text-xs uppercase tracking-wider text-ink-3 border border-line inline-block px-2 py-1 mb-10">
            {label}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center border-b border-line pt-16">
      <div className="mx-auto max-w-[1280px] px-6 w-full">
        <div className="font-mono text-xs uppercase tracking-wider text-ink-3 border border-line inline-block px-2 py-1 mb-10">
          00 — Hero
        </div>
        <h1 className="font-display font-bold text-6xl md:text-8xl tracking-tight leading-[0.95]">
          [Full Name]
        </h1>
        <p className="mt-8 text-ink-2 text-xl md:text-2xl">[Role Title]</p>
        <p className="mt-4 text-ink-2 text-lg md:text-xl max-w-[720px]">
          [One-line positioning statement goes here describing curiosity, product
          thinking, and building experiences people enjoy using.]
        </p>
        <div className="mt-16 text-ink-3 font-mono text-sm">[scroll ↓]</div>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <Section id="intro" label="01 — Introduction" width="reading">
      <h2
        id="intro-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-tight"
      >
        [Section Heading]
      </h2>
      <div className="mt-10 space-y-6 text-ink-2 text-lg leading-relaxed">
        <p>
          [Short editorial paragraph describing how this person thinks about
          building products, exploring systems, and creating experiences people
          enjoy using.]
        </p>
        <p>
          [Second paragraph expanding on learning through building and the
          breadth of work spanning web, mobile, developer tools, recommendation
          systems, and interactive visualizations.]
        </p>
        <p>
          [Third paragraph reinforcing curiosity and a growth mindset through
          hands-on construction.]
        </p>
      </div>
      <p className="mt-10 text-ink-3 font-mono text-sm">
        [Education: B.Tech CSE, Pre-final Year]
      </p>
    </Section>
  );
}

function Placeholder({ label = "[Screenshot]" }: { label?: string }) {
  return (
    <div
      className="bg-placeholder border border-line aspect-[16/10] flex items-center justify-center text-ink-3 font-mono text-sm"
      role="img"
      aria-label="Placeholder screenshot"
    >
      {label}
    </div>
  );
}

function KeywordCluster({ keywords }: { keywords: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {keywords.map((k) => (
        <span
          key={k}
          className="border border-line px-3 py-1 font-mono text-xs text-ink-2"
        >
          {k}
        </span>
      ))}
    </div>
  );
}

function MetricRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="text-ink-3 text-xs font-mono uppercase tracking-wider">
            [Label {i}]
          </div>
          <div className="text-ink text-xl md:text-2xl font-display mt-1">
            [Value]
          </div>
        </div>
      ))}
    </div>
  );
}

function LinkRow() {
  return (
    <div className="mt-8 flex flex-wrap gap-6 text-sm">
      <a href="#" className="underline underline-offset-4 hover:text-ink-2">
        [GitHub]
      </a>
      <a href="#" className="underline underline-offset-4 hover:text-ink-2">
        [Live]
      </a>
      <a href="#" className="underline underline-offset-4 hover:text-ink-2">
        [Case Study]
      </a>
    </div>
  );
}

function FeaturedProject({
  index,
  keywords,
}: {
  index: number;
  keywords: string[];
}) {
  return (
    <article className="border-t border-line pt-12">
      <div className="font-mono text-xs uppercase tracking-wider text-ink-3 mb-4">
        MODE: Featured Narrative
      </div>
      <h3 className="font-display font-bold text-3xl md:text-[2.75rem] tracking-tight leading-tight">
        [Project {index}]
      </h3>
      <p className="mt-3 text-ink-2 text-lg max-w-[720px]">
        [Project subtitle describing the product in one sentence.]
      </p>
      <KeywordCluster keywords={keywords} />

      <div className="mt-8">
        <Placeholder />
      </div>

      <div className="mt-10 space-y-8">
        {(["Context", "Approach", "Outcome"] as const).map((intent) => (
          <div key={intent}>
            <div className="font-mono text-xs uppercase tracking-wider text-ink-3 mb-2">
              {intent}
            </div>
            <h4 className="font-display font-bold text-xl md:text-2xl tracking-tight">
              [Narrative heading]
            </h4>
            <p className="mt-3 text-ink-2 text-base md:text-lg leading-relaxed max-w-[720px]">
              [Narrative paragraph telling the story of this phase of the
              project, the problem, the thinking, and the result.]
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-[720px]">
        <Placeholder label="[Secondary screenshot]" />
      </div>

      <MetricRow />
      <LinkRow />
      <p className="mt-6 text-ink-3 font-mono text-sm">
        [Expandable in-page detail ↓]
      </p>
    </article>
  );
}

function EditorialProject({
  index,
  keywords,
}: {
  index: number;
  keywords: string[];
}) {
  return (
    <article className="border-t border-line pt-12">
      <div className="font-mono text-xs uppercase tracking-wider text-ink-3 mb-4">
        MODE: Editorial
      </div>
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7">
          <Placeholder />
        </div>
        <div className="md:col-span-5">
          <h3 className="font-display font-bold text-2xl md:text-[2.5rem] tracking-tight leading-tight">
            [Project {index}]
          </h3>
          <p className="mt-3 text-ink-2 text-base md:text-lg leading-relaxed">
            [Project summary describing what was built, why, and what it
            demonstrates.]
          </p>
          <KeywordCluster keywords={keywords} />
          <MetricRow />
          <LinkRow />
        </div>
      </div>
    </article>
  );
}

function SelectedWork() {
  return (
    <Section id="work" label="02 — Selected Work" width="content">
      <h2
        id="work-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        [Selected Work]
      </h2>
      <p className="mt-6 text-ink-2 text-lg max-w-[720px]">
        [Framing line introducing the body of work.]
      </p>
      <div className="mt-12 space-y-20">
        <FeaturedProject
          index={1}
          keywords={["Full Stack", "Product", "Open Source", "Infrastructure"]}
        />
        <FeaturedProject
          index={2}
          keywords={["Developer Experience", "Systems", "Visualization", "Learning"]}
        />
        <EditorialProject
          index={3}
          keywords={["React", "TypeScript", "PostgreSQL", "Mobile"]}
        />
        <EditorialProject
          index={4}
          keywords={["Recommendation Systems", "Backend", "Data"]}
        />
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" label="03 — Experience" width="reading">
      <h2
        id="experience-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        [Experience]
      </h2>
      <div className="mt-10">
        <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
          [Role] · [Organization]
        </h3>
        <p className="mt-2 text-ink-3 font-mono text-sm">[Period]</p>
        <p className="mt-4 text-ink-2 text-lg leading-relaxed">
          [Short editorial entry describing the role and craft beyond project
          artifacts.]
        </p>
        <ul className="mt-8 space-y-3 text-ink-2 text-lg leading-relaxed list-disc list-inside marker:text-ink-3">
          <li>[Highlight one: technical event infrastructure]</li>
          <li>[Highlight two: mentorship of junior developers]</li>
          <li>[Highlight three: event operations and technical reviews]</li>
          <li>[Highlight four: community initiatives]</li>
        </ul>
      </div>
    </Section>
  );
}

function LogoPlaceholder() {
  return (
    <div
      className="w-24 h-16 md:w-28 md:h-20 border border-line bg-surface flex items-center justify-center font-mono text-[10px] text-ink-3 text-center px-1"
      role="img"
      aria-label="Logo placeholder"
    >
      [Logo Placeholder]
    </div>
  );
}

function StackGroup({ name, count }: { name: string; count: number }) {
  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start border-t border-line pt-8">
      <div className="md:col-span-3">
        <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight">
          [{name}]
        </h3>
      </div>
      <div className="md:col-span-9 flex flex-wrap gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <LogoPlaceholder key={i} />
        ))}
      </div>
    </div>
  );
}

function SkillStack() {
  const groups = [
    { name: "Frontend", count: 4 },
    { name: "Backend", count: 3 },
    { name: "Mobile", count: 3 },
    { name: "Languages", count: 6 },
    { name: "Databases", count: 3 },
    { name: "Tools", count: 4 },
    { name: "Cloud", count: 2 },
  ];
  return (
    <Section id="stack" label="04 — Skill Stack" width="content">
      <h2
        id="stack-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        [Skill Stack]
      </h2>
      <p className="mt-6 text-ink-2 text-lg max-w-[720px]">
        [Framing line describing the technologies used across the work.]
      </p>
      <div className="mt-16 space-y-10">
        {groups.map((g) => (
          <StackGroup key={g.name} name={g.name} count={g.count} />
        ))}
      </div>
    </Section>
  );
}

function Recognition() {
  const awards = [
    { name: "[Award Name]", result: "[Result · Competition]" },
    { name: "[Award Name]", result: "[Result · Competition]" },
  ];
  return (
    <Section id="recognition" label="05 — Recognition" width="reading">
      <h2
        id="recognition-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        [Recognition]
      </h2>
      <ul className="mt-10 space-y-8">
        {awards.map((a, i) => (
          <li key={i}>
            <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight">
              {a.name}
            </h3>
            <p className="mt-1 text-ink-3 font-mono text-sm">{a.result}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CertificationEntry() {
  return (
    <article className="py-8 grid md:grid-cols-12 gap-4 md:gap-10 items-baseline">
      <div className="md:col-span-7">
        <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight">
          [Certification Name]
        </h3>
        <p className="mt-1 text-ink-2 text-base">[Issuer]</p>
      </div>
      <div className="md:col-span-5 flex flex-col md:items-end gap-2">
        <p className="text-ink-3 font-mono text-sm">[Completed: MM YYYY]</p>
        <a
          href="#"
          className="text-sm underline underline-offset-4 hover:text-ink-2"
        >
          [View Credential ↗]
        </a>
      </div>
    </article>
  );
}

function Certifications() {
  return (
    <Section id="certifications" label="06 — Certifications" width="content">
      <h2
        id="certifications-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        [Certifications]
      </h2>
      <p className="mt-6 text-ink-2 text-lg max-w-[720px]">
        [Framing line about credentials and ongoing learning.]
      </p>
      <div className="mt-10 divide-y divide-line border-b border-line">
        {[1, 2, 3].map((i) => (
          <CertificationEntry key={i} />
        ))}
      </div>
    </Section>
  );
}

function LetsConnectSection() {
  return (
    <Section id="connect" label="07 — Let's Connect" width="content">
      <h2
        id="connect-heading"
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        [Let&apos;s Connect]
      </h2>
      <p className="mt-6 text-ink-2 text-lg max-w-[720px]">
        [Closing line inviting connection — open to opportunities, collaboration,
        or a conversation about building things.]
      </p>

      <div className="mt-12 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <LetsConnect />
        </div>
        <div className="md:col-span-5">
          <div className="font-mono text-xs uppercase tracking-wider text-ink-3 mb-4">
            Elsewhere
          </div>
          <ul className="space-y-4 text-lg">
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:text-ink-2"
              >
                [GitHub]
              </a>
            </li>
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:text-ink-2"
              >
                [LinkedIn]
              </a>
            </li>
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:text-ink-2"
              >
                [Email]
              </a>
            </li>
          </ul>
          <p className="mt-8 text-ink-3 font-mono text-sm">
            [Prefer email? The form opens your mail client with everything
            prefilled.]
          </p>
        </div>
      </div>

      <footer className="mt-32 pt-10 border-t border-line text-ink-3 font-mono text-sm flex flex-wrap justify-between gap-4">
        <span>[Name] · © [Year]</span>
        <span>[Built with note]</span>
      </footer>
    </Section>
  );
}
