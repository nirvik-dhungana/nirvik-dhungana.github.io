/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NotFound } from "./components/NotFound";
import { SEO, PERSON_JSONLD, WEBSITE_JSONLD, PROFILE_PAGE_JSONLD } from "./components/SEO";

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

// Handles scroll-to-section after cross-route navigation (e.g. when the Pyrope
// page's "Back to Projects" button navigates to "/" with state.scrollTo).
function ScrollHandler() {
  const { state } = useLocation();
  useEffect(() => {
    if (state && typeof state === "object" && "scrollTo" in state) {
      const target = (state as { scrollTo: string }).scrollTo;
      // Defer until after the home route's DOM has rendered.
      const tryScroll = () => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        // Projects is lazy-loaded — retry until it mounts.
        let attempts = 0;
        const id = window.setInterval(() => {
          if (tryScroll() || attempts > 20) {
            window.clearInterval(id);
          }
          attempts++;
        }, 100);
      }
    }
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

export default function App() {
  return (
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
}
