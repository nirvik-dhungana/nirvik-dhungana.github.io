/**
 * SSR entry point — used ONLY by the build-time prerender script.
 *
 * Imports pages EAGERLY (not React.lazy) so the full component tree
 * including <SEO /> renders synchronously during renderToString.
 *
 * Metadata extraction: uses the SSR metadata registry (src/ssr-metadata.ts)
 * instead of react-helmet-async's context, because helmet v3 + React 19
 * does not support SSR head extraction.
 */

import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { StaticRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  SEO,
  PERSON_JSONLD,
  WEBSITE_JSONLD,
  PROFILE_PAGE_JSONLD,
} from "./components/SEO.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Hero } from "./components/Hero.tsx";
import { NotFound } from "./components/NotFound.tsx";
import { About } from "./components/About.tsx";
import { Projects } from "./components/Projects.tsx";
import { Skills } from "./components/Skills.tsx";
import { Experience } from "./components/Experience.tsx";
import { Education } from "./components/Education.tsx";
import { LearningPath } from "./components/LearningPath.tsx";
import { Testimonials } from "./components/Testimonials.tsx";
import { CTA } from "./components/CTA.tsx";
import { PyropePage } from "./components/pyrope/PyropePage.tsx";
import {
  resetSSRMetadata,
  getSSRMetadata,
  renderMetadataToHeadHtml,
} from "./ssr-metadata.ts";

// --- Home (eager version — no lazy/Suspense for SSR) ---
function Home() {
  return createElement(
    "div",
    null,
    createElement(SEO, {
      title: "Frontend Developer",
      description:
        "Portfolio of Nirvik Dhungana — a frontend developer building accessible, responsive interfaces with React, TypeScript, and Tailwind CSS.",
      path: "/",
      jsonLd: [PERSON_JSONLD, WEBSITE_JSONLD, PROFILE_PAGE_JSONLD],
    }),
    createElement(
      "a",
      {
        href: "#main-content",
        className:
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg-base focus:font-bold focus:rounded-md transition-all",
      },
      "Skip to main content",
    ),
    createElement(Navbar, null),
    createElement(
      "main",
      {
        id: "main-content",
        className:
          "flex flex-col gap-[96px] lg:gap-[140px] pb-[96px] lg:pb-[140px]",
      },
      createElement(Hero, null),
      createElement(About, null),
      createElement(Projects, null),
      createElement(Skills, null),
      createElement(Experience, null),
      createElement(Education, null),
      createElement(LearningPath, null),
      createElement(Testimonials, null),
    ),
    createElement(CTA, null),
  );
}

export interface RenderResult {
  /** The rendered <body> HTML (the React tree inside #root). */
  html: string;
  /** The complete <head> SEO tags as an HTML string. */
  headHtml: string;
}

export function render(url: string): RenderResult {
  // Reset the metadata registry before each render.
  resetSSRMetadata();

  const helmetContext = {};

  const html = renderToString(
    createElement(
      HelmetProvider,
      { context: helmetContext },
      createElement(
        StaticRouter,
        { location: url },
        createElement(
          "div",
          { className: "bg-grain" },
          createElement(
            Routes,
            null,
            createElement(Route, { path: "/", element: createElement(Home) }),
            createElement(Route, {
              path: "/projects/pyrope",
              element: createElement(PyropePage),
            }),
            createElement(Route, { path: "*", element: createElement(NotFound) }),
          ),
        ),
      ),
    ),
  );

  // Extract the metadata registered by <SEO /> during render.
  const metadata = getSSRMetadata();
  const headHtml = metadata
    ? renderMetadataToHeadHtml(metadata)
    : "";

  return {
    html,
    headHtml,
  };
}

export const PRERENDER_ROUTES = ["/", "/projects/pyrope"];
