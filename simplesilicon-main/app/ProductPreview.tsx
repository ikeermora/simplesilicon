"use client";

import { useState, type KeyboardEvent } from "react";

const views = [
  {
    id: "editor",
    label: "Editor",
    title: "Inspect source and module interfaces",
    copy: "Open a SystemVerilog design and review its source alongside the parsed module boundary.",
    image: "editor",
    alt: "Simple Silicon editor showing SystemVerilog source and a parsed CPU module interface",
  },
  {
    id: "waveforms",
    label: "Waveforms",
    title: "Explore VCD traces in context",
    copy: "Search signals, change display formats, and navigate simulation activity without leaving the workbench.",
    image: "waveforms",
    alt: "Simple Silicon waveform viewer displaying simulation signals from a Fibonacci testbench",
  },
  {
    id: "rtl",
    label: "RTL",
    title: "Understand RTL structure visually",
    copy: "Move between module hierarchy and a simplified logic view to make complex designs easier to inspect.",
    image: "rtl",
    alt: "Simple Silicon RTL visualizer showing the structure of a CPU module",
  },
] as const;

const siteBase = process.env.NEXT_PUBLIC_SITE_BASE ?? "";

const rtlSlides = [
  {
    image: "rtl",
    label: "CPU overview",
    alt: "Simple Silicon RTL visualizer showing the structure of a CPU module",
  },
  {
    image: "rtl-register",
    label: "Register file",
    alt: "Simple Silicon RTL visualizer showing the logic structure of a register file",
  },
  {
    image: "rtl-alu",
    label: "ALU",
    alt: "Simple Silicon RTL visualizer showing the logic structure of an arithmetic logic unit",
  },
  {
    image: "rtl-control",
    label: "Control unit",
    alt: "Simple Silicon RTL visualizer showing the logic structure of a control unit",
  },
] as const;

export function ProductPreview() {
  const [active, setActive] = useState<(typeof views)[number]["id"]>("waveforms");
  const [rtlSlide, setRtlSlide] = useState(0);
  const current = views.find((view) => view.id === active) ?? views[0];
  const activeRtlSlide = rtlSlides[rtlSlide];
  const displayedImage = current.id === "rtl" ? activeRtlSlide.image : current.image;
  const displayedAlt = current.id === "rtl" ? activeRtlSlide.alt : current.alt;

  const showPreviousRtlSlide = () => {
    setRtlSlide((index) => (index - 1 + rtlSlides.length) % rtlSlides.length);
  };

  const showNextRtlSlide = () => {
    setRtlSlide((index) => (index + 1) % rtlSlides.length);
  };

  const handleRtlKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (current.id !== "rtl") return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousRtlSlide();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextRtlSlide();
    }
  };

  return (
    <div className="product-demo">
      <div className="product-tabs" role="tablist" aria-label="Workbench views">
        {views.map((view) => (
          <button
            key={view.id}
            id={`tab-${view.id}`}
            className={active === view.id ? "is-active" : ""}
            type="button"
            role="tab"
            aria-selected={active === view.id}
            aria-controls="product-panel"
            onClick={() => setActive(view.id)}
          >
            <span>{view.label}</span>
            <small>{view.id === "editor" ? "01" : view.id === "waveforms" ? "02" : "03"}</small>
          </button>
        ))}
      </div>
      <div
        className={`product-screen${current.id === "rtl" ? " product-screen--rtl" : ""}`}
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
      >
        <picture key={`${current.id}-${rtlSlide}`}>
          <source media="(max-width: 760px)" srcSet={`${siteBase}/product/${displayedImage}-800.webp`} />
          <img
            src={`${siteBase}/product/${displayedImage}-1600.webp`}
            alt={displayedAlt}
            width="1600"
            height="1006"
          />
        </picture>
        {current.id === "rtl" && (
          <div
            className="rtl-slider"
            role="toolbar"
            aria-label="RTL screenshot gallery"
            onKeyDown={handleRtlKeyDown}
          >
            <button type="button" onClick={showPreviousRtlSlide} aria-label="Previous RTL screenshot">
              <span aria-hidden="true">←</span>
            </button>
            <div className="rtl-slider__dots" aria-label="Choose an RTL screenshot">
              {rtlSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  className={index === rtlSlide ? "is-active" : ""}
                  type="button"
                  onClick={() => setRtlSlide(index)}
                  aria-label={`Show ${slide.label} screenshot`}
                  aria-current={index === rtlSlide ? "true" : undefined}
                />
              ))}
            </div>
            <span className="rtl-slider__count" aria-live="polite">
              {String(rtlSlide + 1).padStart(2, "0")} / {String(rtlSlides.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={showNextRtlSlide} aria-label="Next RTL screenshot">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
      <div className="product-caption" aria-live="polite">
        <span>{current.id === "rtl" ? `RTL / ${activeRtlSlide.label}` : current.label}</span>
        <h3>{current.title}</h3>
        <p>{current.copy}</p>
      </div>
    </div>
  );
}
