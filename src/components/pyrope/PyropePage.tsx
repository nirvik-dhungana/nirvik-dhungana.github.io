import { useEffect } from "react";
import { motion } from "motion/react";
import { Navbar } from "../Navbar";
import { ScrollProgress } from "../ScrollProgress";
import { CTA } from "../CTA";
import { PyropeHero } from "./PyropeHero";
import { PyropePalette } from "./PyropePalette";
import { PyropePhilosophy } from "./PyropePhilosophy";
import { PyropeTerminal } from "./PyropeTerminal";
import { PyropeSyntax } from "./PyropeSyntax";
import { PyropePorts } from "./PyropePorts";
import { PyropeExcluded } from "./PyropeExcluded";
import { PyropeBackLink } from "./PyropeBackLink";
import { CopyToast } from "./CopyToast";
import { SEO, breadcrumbJsonLd, type JsonLdBlock } from "../SEO";

const PYROPE_OG_IMAGE =
  "https://res.cloudinary.com/dxt7szquk/image/upload/v1783448884/og-pyrope_v07o1b.png";

const PYROPE_TITLE = "Pyrope Colorscheme";
const PYROPE_DESC =
  "Pyrope is a warm, dark, jewel-toned colorscheme designed for deutan (red-green deficient) vision, with consistent role assignments across VS Code, Neovim, Zed, Kate, KDE Plasma, and terminal emulators.";

// Enhanced structured data: CreativeWork + SoftwareSourceCode + SoftwareApplication.
// @id and isPartOf link this entity back to the main website entity.
// SoftwareApplication is added in addition to SoftwareSourceCode because Pyrope
// is a consumable theme product (not just source code) — it has an
// applicationCategory, operatingSystem, and is accessible for free.
const PYROPE_JSONLD: JsonLdBlock = {
  "@context": "https://schema.org",
  "@type": ["CreativeWork", "SoftwareSourceCode", "SoftwareApplication"],
  "@id": "https://nirvikdhungana.com.np/projects/pyrope#creativeWork",
  name: "Pyrope Colorscheme",
  creator: {
    "@type": "Person",
    "@id": "https://nirvikdhungana.com.np/#person",
  },
  description: PYROPE_DESC,
  url: "https://nirvikdhungana.com.np/projects/pyrope",
  codeRepository: "https://github.com/nirvik-dhungana/pyrope",
  programmingLanguage: "JSON, Lua, CSS, TOML",
  license: "https://opensource.org/licenses/MIT",
  dateCreated: "2026-01-15",
  dateModified: "2026-07-04",
  inLanguage: "en",
  keywords:
    "colorscheme, dark theme, deuteranopia, deutan, color blindness, accessibility, ANSI 16, terminal theme, VS Code theme, Neovim colorscheme",
  isPartOf: { "@id": "https://nirvikdhungana.com.np/#website" },
  audience: {
    "@type": "Audience",
    audienceType: "developers, designers, accessibility advocates",
  },
  applicationCategory: "DesignApplication",
  operatingSystem: "Cross-platform",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const BREADCRUMB_JSONLD = breadcrumbJsonLd([
  { name: "Home", url: "https://nirvikdhungana.com.np" },
  { name: "Projects", url: "https://nirvikdhungana.com.np/#projects" },
  {
    name: "Pyrope Colorscheme",
    url: "https://nirvikdhungana.com.np/projects/pyrope",
  },
]);

export function PyropePage() {
  // Scroll to top on route entry. Title/meta/canonical/JSON-LD are all
  // handled declaratively by <SEO /> below.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title={PYROPE_TITLE}
        description={PYROPE_DESC}
        path="/projects/pyrope"
        ogType="article"
        ogImage={PYROPE_OG_IMAGE}
        ogImageAlt="Pyrope Colorscheme — 16 color swatches on a warm dark background"
        jsonLd={[PYROPE_JSONLD, BREADCRUMB_JSONLD]}
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
        className="flex flex-col gap-[96px] lg:gap-[140px] pb-[96px] lg:pb-[140px] pt-24"
      >
        <PyropeHero />
        <PyropePalette />
        <PyropePhilosophy />
        <PyropeTerminal />
        <PyropeSyntax />
        <PyropePorts />
        <PyropeExcluded />
        <PyropeBackLink />
      </main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CTA />
      </motion.div>
      <CopyToast />
    </>
  );
}

export default PyropePage;
