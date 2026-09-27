import { HashlessNavigation } from "./HashlessNavigation";
import { ProductPreview } from "./ProductPreview";

export const dynamic = "force-static";

function Prism({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "prism prism--compact" : "prism"} aria-hidden="true">
      <span className="prism__top" />
      <span className="prism__left" />
      <span className="prism__right" />
    </span>
  );
}

const capabilities = [
  {
    number: "01",
    title: "Edit and inspect RTL",
    copy: "Work with SystemVerilog source and understand module interfaces in the same focused view.",
  },
  {
    number: "02",
    title: "Run and debug simulations",
    copy: "Use testbenches, run simulations, and review the resulting output without breaking context.",
  },
  {
    number: "03",
    title: "Explore waveforms and RTL",
    copy: "Open VCD traces and navigate interactive RTL structure without switching among unrelated tools.",
  },
];

export default function Home() {
  const siteRoot = `${process.env.NEXT_PUBLIC_SITE_BASE ?? ""}/`;

  return (
    <HashlessNavigation>
      <header className="site-header">
        <a
          className="brand"
          href={siteRoot}
          data-scroll-target="top"
          aria-label="Simple Silicon home"
        >
          <Prism compact />
          <span>Simple Silicon</span>
        </a>
        <nav aria-label="Main navigation">
          <a href={siteRoot} data-scroll-target="product">Product</a>
          <a href={siteRoot} data-scroll-target="vision">Vision</a>
          <a className="nav-cta" href={siteRoot} data-scroll-target="product">View the workbench</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow"><span /> In active development</p>
          <h1>Hardware design,<br />made clear.</h1>
          <div className="hero__prism" aria-label="Simple Silicon prism symbol">
            <Prism />
          </div>
          <p className="hero__lede">
            A unified EDA environment for the digital hardware workflow.
          </p>
          <p className="hero__support">
            Simple Silicon is growing toward an all-in-one platform for designing,
            simulating, inspecting, and understanding digital systems. Today, its
            working foundation brings together SystemVerilog, testbenches,
            waveforms, module interfaces, and RTL visualization.
          </p>
          <div className="hero__actions">
            <a className="button button--dark" href={siteRoot} data-scroll-target="product">Explore the product</a>
            <a className="text-link" href={siteRoot} data-scroll-target="vision">About the project <span aria-hidden="true">↘</span></a>
          </div>
        </div>
      </section>

      <section className="product-section" id="product">
        <div className="section-intro">
          <p className="eyebrow">01 / The workbench</p>
          <h2>One environment.<br />A clearer signal.</h2>
          <p>
            Each capability available today is a building block toward a larger
            goal: one cohesive environment for the digital hardware design flow.
          </p>
        </div>
        <ProductPreview />
      </section>

      <section className="capabilities" aria-labelledby="capabilities-title">
        <div className="section-label">
          <p className="eyebrow">02 / Current capabilities</p>
          <p className="section-note">Built around the work that exists today.</p>
        </div>
        <div className="capability-list" id="capabilities-title">
          {capabilities.map((capability) => (
            <article className="capability" key={capability.number}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="access-section" id="vision">
        <div className="section-intro">
          <p className="eyebrow">03 / Why Simple Silicon</p>
          <h2>Serious hardware tools should not be out of reach.</h2>
          <p>
            Powerful EDA workflows are often separated by both financial and
            operational barriers. Simple Silicon is being built to lower both.
          </p>
        </div>
        <div className="access-grid">
          <article>
            <span>01 / The barrier</span>
            <h3>Cost and fragmentation</h3>
            <p>
              Commercial EDA licenses can put professional hardware development
              behind a steep cost barrier. Open-source alternatives are valuable,
              but they can be fragmented, difficult to discover, configure, and
              operate as one coherent workflow.
            </p>
          </article>
          <article>
            <span>02 / The response</span>
            <h3>One accessible environment</h3>
            <p>
              Simple Silicon aims to bring the essential parts of the digital
              design flow into one clear desktop environment—making capable tools
              easier to find, learn, and use without hiding their engineering depth.
            </p>
          </article>
        </div>
      </section>

      <section className="philosophy" id="philosophy">
        <div className="philosophy__mark"><Prism /></div>
        <div className="philosophy__copy">
          <p className="eyebrow">04 / Product philosophy</p>
          <blockquote>
            “Make it simple,<br />make it precise,<br />make it beautiful.”
          </blockquote>
          <p>
            Digital hardware is sophisticated by nature. The tools used to understand it do not need to be unnecessarily complicated. Simple Silicon is shaped around clear hierarchy, deliberate interaction, and the belief that precision and approachability can coexist.
          </p>
        </div>
      </section>

      <section className="status-section">
        <div className="section-intro section-intro--compact">
          <p className="eyebrow">05 / Status &amp; direction</p>
          <h2>From a focused foundation<br />to one complete environment.</h2>
        </div>
        <div className="status-columns">
          <article>
            <span className="status-tag"><b /> Current</span>
            <h3>A working foundation</h3>
            <p>DUT and testbench workflows, simulation, VCD exploration, module inspection, and interactive RTL visualization are available in the current application.</p>
          </article>
          <article>
            <span className="status-tag status-tag--outline">Direction</span>
            <h3>An all-in-one EDA environment</h3>
            <p>The broader direction is a cohesive and approachable platform spanning increasingly complete digital-design workflows—built step by step from a credible working foundation.</p>
          </article>
        </div>
      </section>

      <section className="creator">
        <p className="eyebrow">06 / The creator</p>
        <div>
          <h2>Designed for the way<br />hardware is understood.</h2>
          <p>
            Simple Silicon is designed and developed by{" "}
            <a
              href="https://ikeermora.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iker Garcia Morales
            </a>
            , an Electrical Engineering and Robotics &amp; Mechatronics Engineering
            student focused on VLSI, integrated circuits, and digital hardware.
          </p>
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Simple Silicon / In active development</p>
        <h2>Follow the signal.</h2>
        <a className="button button--light" href={siteRoot} data-scroll-target="top">Explore Simple Silicon <span aria-hidden="true">↑</span></a>
      </section>

      <footer>
        <a
          className="brand brand--footer"
          href={siteRoot}
          data-scroll-target="top"
          aria-label="Back to top"
        >
          <Prism compact />
          <span>Simple Silicon</span>
        </a>
        <p>© 2026 Simple Silicon</p>
        <p>Built by Iker Garcia Morales</p>
      </footer>
    </HashlessNavigation>
  );
}
