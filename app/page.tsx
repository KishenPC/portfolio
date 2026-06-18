import SectionReveal from "@/components/animations/section-reveal";
import SectionTitle from "@/components/section-title";
import PillButton from "@/components/pill-button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-section";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Where every pixel is intentional. A minimal, editorial portfolio celebrating the intersection of design and craft.",
};

export default function Home() {
  return (
    <main className="bg-putty min-h-screen">
      <Header />

      {/* Hero Section */}
      <SectionReveal>
        <section className="px-16 py-96 overflow-hidden">
          <div className="max-w-[60vw]">
            <h1 className="font-davinci text-6xl font-medium text-ink leading-[0.84] tracking-tight mb-16">
              Renaissance gallery on putty paper
            </h1>
            <p className="font-davinci text-xl text-graphite opacity-50 max-w-lg mb-16">
              Where every pixel is intentional. A minimal, editorial portfolio
              celebrating the intersection of design and craft.
            </p>
            <div className="flex justify-end">
              <PillButton href="/projects">View Work</PillButton>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Divider */}
      <div className="h-px bg-vellum mx-16"></div>

      {/* Featured Projects Section */}
      <SectionReveal delay={0.1}>
        <section className="px-16 py-96" id="work">
          <SectionTitle className="mb-52">Featured Work</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-96">
            <Link
              href="/projects"
              className="block min-h-[400px] bg-bone rounded-lg flex items-center justify-center p-24 hover:opacity-80 transition-opacity border border-vellum"
            >
              <p className="font-helvetica-now text-base text-graphite">
                View all projects
              </p>
            </Link>
          </div>
        </section>
      </SectionReveal>

      {/* Footer */}
      <AboutSection />

      <Footer />
    </main>
  );
}
