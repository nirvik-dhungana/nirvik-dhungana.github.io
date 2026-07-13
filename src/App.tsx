/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared App shell — used by both the client entry (main.tsx) and the
 * build-time prerender script (scripts/prerender.mjs).
 *
 * The `baseUrl` prop is used by react-router's StaticRouter during SSR
 * to know which route to render. On the client, BrowserRouter ignores it.
 */

import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter,
  StaticRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NotFound } from "./components/NotFound";
import { ScrollProgress } from "./components/ScrollProgress";
import {
  SEO,
  PERSON_JSONLD,
  WEBSITE_JSONLD,
  PROFILE_PAGE_JSONLD,
} from "./components/SEO";

const About = lazy(() =>
  import("./components/About").then((module) => ({ default: module.About })),
);
const Projects = lazy(() =>
  import("./components/Projects").then((module) => ({
    default: module.Projects,
  })),
);
const Skills = lazy(() =>
  import("./components/Skills").then((module) => ({ default: module.Skills })),
);
const Experience = lazy(() =>
  import("./components/Experience").then((module) => ({
    default: module.Experience,
  })),
);
const Education = lazy(() =>
  import("./components/Education").then((module) => ({
    default: module.Education,
  })),
);
const LearningPath = lazy(() =>
  import("./components/LearningPath").then((module) => ({
    default: module.LearningPath,
  })),
);
const Testimonials = lazy(() =>
  import("./components/Testimonials").then((module) => ({
    default: module.Testimonials,
  })),
);
const CTA = lazy(() =>
  import("./components/CTA").then((module) => ({ default: module.CTA })),
);

const PyropePage = lazy(() =>
  import("./components/pyrope/PyropePage").then((module) => ({
    default: module.PyropePage,
  })),
);

// Handles scroll-to-section after cross-route navigation, AND scrolls to
// top of page on every route change (unless a specific scrollTo target was
// requested via router state).
function ScrollHandler() {
  const { pathname, state } = useLocation();

  // Scroll-to-top on pathname change. Runs before the scroll-to-section
  // effect below so a fresh route load starts at the top before any
  // section-targeted scroll is attempted.
  useEffect(() => {
    // Don't scroll to top if the navigation includes a scrollTo target —
    // the section effect below will handle the final position.
    if (state && typeof state === "object" && "scrollTo" in state) return;
    window.scrollTo(0, 0);
  }, [pathname, state]);

  // Scroll-to-section after cross-route navigation (e.g. clicking "Projects"
  // on the Pyrope page navigates to "/" then scrolls to #projects).
  useEffect(() => {
    if (!state || typeof state !== "object" || !("scrollTo" in state)) return;
    const target = (state as { scrollTo: string }).scrollTo;
    const tryScroll = () => {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };
    if (tryScroll()) return;

    // Poll for up to 2s (20 attempts × 100ms) — the target section may be
    // mounted late by a lazy-loaded Suspense boundary.
    let attempts = 0;
    let id: number | null = null;
    id = window.setInterval(() => {
      if (tryScroll() || attempts > 20) {
        if (id !== null) window.clearInterval(id);
      }
      attempts++;
    }, 100);
    // Cleanup on unmount or re-trigger: prevents the interval from leaking
    // if the user navigates away before the target appears.
    return () => {
      if (id !== null) window.clearInterval(id);
    };
  }, [state]);

  return null;
}

function Home() {
  return (
    <>
      <SEO
        title="Frontend Developer"
        description="Portfolio of Nirvik Dhungana — a frontend developer building accessible, responsive interfaces with React, TypeScript, and Tailwind CSS."
        path="/"
        jsonLd={[PERSON_JSONLD, WEBSITE_JSONLD, PROFILE_PAGE_JSONLD]}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg-base focus:font-bold focus:rounded-md transition-all"
      >
        Skip to main content
      </a>
      <Navbar />
      <ScrollProgress />
      <main
        id="main-content"
        className="flex flex-col gap-[96px] lg:gap-[140px] pb-[96px] lg:pb-[140px]"
      >
        <Hero />
        <Suspense
          fallback={
            <div className="h-48 flex flex-col gap-[96px] items-center justify-center text-fg-dim"></div>
          }
        >
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <LearningPath />
          <Testimonials />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-48"></div>}>
        <CTA />
      </Suspense>
    </>
  );
}

/**
 * The App shell. On the client, `baseUrl` is undefined and BrowserRouter
 * is used. During SSR/prerender, `baseUrl` is the route path and
 * StaticRouter is used to render that specific route.
 *
 * `helmetContext` is passed through to HelmetProvider so the prerender
 * script can extract the <head> tags after rendering. On the client it's
 * left undefined (HelmetProvider creates its own context internally).
 */
export function App({
  baseUrl,
  helmetContext,
}: {
  baseUrl?: string;
  helmetContext?: Record<string, unknown>;
} = {}) {
  const router = baseUrl ? (
    <StaticRouter location={baseUrl}>
      <ScrollHandler />
      <div className="bg-grain" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects/pyrope"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center text-fg-dim font-mono text-sm">
                  Loading Pyrope…
                </div>
              }
            >
              <PyropePage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StaticRouter>
  ) : (
    <BrowserRouter>
      <ScrollHandler />
      <div className="bg-grain" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects/pyrope"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center text-fg-dim font-mono text-sm">
                  Loading Pyrope…
                </div>
              }
            >
              <PyropePage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

  return <HelmetProvider context={helmetContext}>{router}</HelmetProvider>;
}

export default App;

/**
 * List of routes to prerender at build time. To add a new prerendered
 * route, add its path here — the prerender script will automatically
 * generate a static HTML file for it.
 */
export const PRERENDER_ROUTES = ["/", "/projects/pyrope"];
