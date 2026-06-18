import SectionReveal from "@/components/animations/section-reveal";
import SectionTitle from "@/components/section-title";
import PillButton from "@/components/pill-button";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="bg-putty min-h-screen">
      <Header />

      {/* Hero Section */}
      <SectionReveal>
        <section className="px-16 py-96 text-center">
          <h1 className="font-davinci text-6xl font-medium text-ink mb-8 leading-tight">
            Renaissance gallery on putty paper
          </h1>
          <p className="font-helvetica-now text-base text-graphite max-w-xl mx-auto mb-12">
            Where every pixel is intentional. A minimal, editorial portfolio
            celebrating the intersection of design and craft.
          </p>
          <PillButton href="#work">View Work</PillButton>
        </section>
      </SectionReveal>

      {/* Divider */}
      <div className="h-px bg-vellum mx-16"></div>

      {/* Featured Projects Section */}
      <SectionReveal delay={0.1}>
        <section className="px-16 py-96">
          <SectionTitle className="mb-52">Featured Work</SectionTitle>

          {/* Placeholder for featured projects */}
          <div className="grid grid-cols-1 gap-96">
            <div className="h-96 bg-bone rounded-md flex items-center justify-center">
              <p className="font-helvetica-now text-base text-graphite">
                Project 1 — Coming Soon
              </p>
            </div>
            <div className="h-96 bg-bone rounded-md flex items-center justify-center">
              <p className="font-helvetica-now text-base text-graphite">
                Project 2 — Coming Soon
              </p>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Footer */}
      <footer className="px-16 py-20 bg-chalk border-t border-vellum text-center">
        <p className="font-helvetica-now text-xs text-graphite">
          © {new Date().getFullYear()} Structured. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
