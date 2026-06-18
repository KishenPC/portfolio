import SectionReveal from "@/components/animations/section-reveal";
import SectionTitle from "@/components/section-title";

const skills = {
  Languages: ["C++", "Java", "JavaScript", "TypeScript", "Python", "SQL"],
  Frontend: ["React", "Next.js", "Astro", "Tailwind CSS", "GSAP"],
  Mobile: ["React Native", "Expo"],
  Backend: ["Node.js", "Express.js", "NestJS", "FastAPI"],
  Databases: ["PostgreSQL", "Redis", "Qdrant", "CockroachDB"],
  "Dev Tools": ["Git", "Docker", "Prisma", "Vercel", "Postman"],
};

export default function AboutSection() {
  return (
    <SectionReveal delay={0.2}>
      <section className="px-16 py-96 bg-putty" id="about">
        <SectionTitle className="mb-52">About</SectionTitle>

        <div className="max-w-[70ch] mb-60">
          <p className="font-davinci text-xl text-ink mb-16 leading-[1.33]">
            I&apos;m Kishen Pathiyan Cherumanal, a Software Engineer and
            Computer Science undergraduate at VIT Vellore.
          </p>
          <p className="font-helvetica-now text-base text-graphite mb-16 leading-[1.5]">
            I build full-stack applications, developer tools, and recommendation
            systems — with a focus on clean architecture, intentional design,
            and pragmatic engineering. Currently exploring distributed systems
            and generative AI applications.
          </p>
          <p className="font-helvetica-now text-base text-graphite leading-[1.5]">
            As a Senior Core Committee Member at ACM-VIT, I led a team of 16
            developers, contributed to technical events serving hundreds of
            participants, and mentored junior developers through hands-on
            projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-bone rounded-lg p-24 text-center"
            >
              <h3 className="font-davinci text-base font-medium text-ink mb-16">
                {category}
              </h3>
              <div className="flex flex-wrap gap-8 justify-center">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-helvetica-now text-xs text-graphite bg-chalk px-12 py-6 rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-60 text-center">
          <a
            href="mailto:kishen@example.com"
            className="font-davinci text-xl text-ink hover:underline decoration-1"
          >
            Let&apos;s work together
          </a>
        </div>
      </section>
    </SectionReveal>
  );
}
