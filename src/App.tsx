/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NotFound } from "./components/NotFound";

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

function Home() {
  return (
    <>
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
      <div className="bg-grain" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
