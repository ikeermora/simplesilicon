/* eslint-disable @next/next/no-img-element -- portable portfolio component */
import "./simple-silicon-project-card.css";

export const SIMPLE_SILICON_URL =
  "https://ikeermora.github.io/simple-silicon/";

export function SimpleSiliconProjectCard() {
  return (
    <a
      className="ss-project"
      href={SIMPLE_SILICON_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit the Simple Silicon project website (opens in a new tab)"
    >
      <div className="ss-project__copy">
        <div className="ss-project__identity">
          <img
            src="/simple-silicon/simple-silicon-icon.png"
            alt=""
            width="48"
            height="48"
          />
          <div>
            <span className="ss-project__status">In development</span>
            <h3>Simple Silicon</h3>
          </div>
        </div>
        <p>
          An all-in-one EDA environment in development, built from a focused
          SystemVerilog, simulation, waveform, and RTL foundation.
        </p>
        <span className="ss-project__link">
          Visit Simple Silicon <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="ss-project__media">
        <img
          src="/simple-silicon/simple-silicon-preview.webp"
          alt="Simple Silicon waveform exploration interface"
          width="800"
          height="503"
          loading="lazy"
        />
      </div>
    </a>
  );
}
