import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, Keyboard as KeyboardIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { PersonalInfo } from "../data/content";

// ---------------------------------------------------------------------------
//  Navigation data
// ---------------------------------------------------------------------------

interface NavLink {
  name: string;
  href: string;
  /** The actual DOM id of the section element. May differ from `name`. */
  sectionId: string;
  /** Single character pressed after `g` to jump to this section. */
  shortcut: string;
}

const navLinks: NavLink[] = [
  { name: "About", href: "#about", sectionId: "about", shortcut: "a" },
  { name: "Projects", href: "#projects", sectionId: "projects", shortcut: "p" },
  { name: "Skills", href: "#skills", sectionId: "skills", shortcut: "s" },
  { name: "Experience", href: "#experience", sectionId: "experience", shortcut: "e" },
  { name: "Education", href: "#education", sectionId: "education", shortcut: "d" },
  { name: "Learning", href: "#growth", sectionId: "growth", shortcut: "l" },
  { name: "Testimonials", href: "#testimonials", sectionId: "testimonials", shortcut: "t" },
  { name: "Contact", href: "#contact", sectionId: "contact", shortcut: "c" },
];

const NAVBAR_OFFSET = 96;
const SECTION_MARGIN = 24;

// ---------------------------------------------------------------------------
//  Component
// ---------------------------------------------------------------------------

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShortcutHelpOpen, setIsShortcutHelpOpen] = useState(false);
  const [showIntroHint, setShowIntroHint] = useState(false);
  const [vimPending, setVimPending] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const isPyropePage = location.pathname.startsWith("/projects/pyrope");
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const vimPendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // -------------------------------------------------------------------------
  //  Scroll-to-section with explicit offset
  // -------------------------------------------------------------------------
  const scrollToSection = useCallback(
    (selector: string, sectionId?: string) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - NAVBAR_OFFSET - SECTION_MARGIN;

      isProgrammaticScrollRef.current = true;
      window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 800);

      window.scrollTo({
        top: targetY,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      if (sectionId) setActiveSection(sectionId);
    },
    [reduceMotion],
  );

  const goToSection = useCallback(
    (selector: string, sectionId?: string) => {
      if (location.pathname === "/") {
        scrollToSection(selector, sectionId);
      } else {
        navigate("/", { state: { scrollTo: selector } });
      }
    },
    [location.pathname, navigate, scrollToSection],
  );

  // -------------------------------------------------------------------------
  //  Scroll-spy (rAF-throttled, guarded during programmatic scroll)
  // -------------------------------------------------------------------------
  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      if (isProgrammaticScrollRef.current) {
        ticking = false;
        return;
      }
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= NAVBAR_OFFSET + 60) {
            current = link.sectionId;
          }
        }
      }
      setActiveSection((prev) => (prev !== current ? current : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // -------------------------------------------------------------------------
  //  Vim-style + g-prefix keyboard navigation
  // -------------------------------------------------------------------------
  //  Vim keys implemented (all single-key, no modifiers):
  //    j / ↓     — scroll down one "page" (50% viewport)
  //    k / ↑     — scroll up one "page"
  //    G         — jump to bottom of page
  //    gg        — jump to top of page (g pressed twice)
  //    t         — next section (cycle forward)
  //    T         — previous section (cycle backward)
  //    g {letter} — jump to a specific section (a/p/s/e/d/l/t/c)
  //    ?         — open shortcut help
  //    Esc       — close any dialog
  //
  //  Safety:
  //    - Disabled while typing in <input>, <textarea>, contentEditable.
  //    - Never fires when metaKey/ctrlKey/altKey are held (no browser/OS conflict).
  //    - `g` auto-resets after 800ms if no second key follows.
  // -------------------------------------------------------------------------
  const handleVimKey = useCallback(
    (key: string, isTyping: boolean, isRepeat: boolean) => {
      // j / k — scroll by half viewport.
      // When the key is held down (e.repeat === true), use `behavior: "auto"`
      // instead of "smooth". This prevents the stuttered scroll that happens
      // when multiple smooth-scroll animations are queued at the OS key-repeat
      // rate (~30ms) and constantly interrupt each other. With "auto", each
      // repeat jumps immediately by a small delta, producing a smooth
      // continuous scroll that tracks the key-hold duration.
      const scrollBehavior = isRepeat
        ? "auto"
        : reduceMotion
          ? "auto"
          : "smooth";

      if (key === "j") {
        if (isTyping) return false;
        // Smaller delta on repeat so the continuous scroll is controllable.
        const delta = isRepeat ? window.innerHeight * 0.15 : window.innerHeight * 0.5;
        window.scrollBy({ top: delta, behavior: scrollBehavior });
        return true;
      }
      if (key === "k") {
        if (isTyping) return false;
        const delta = isRepeat ? -window.innerHeight * 0.15 : -window.innerHeight * 0.5;
        window.scrollBy({ top: delta, behavior: scrollBehavior });
        return true;
      }
      // G (Shift+g) — jump to bottom (ignore key repeat)
      if (key === "G" && !isRepeat) {
        if (isTyping) return false;
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        return true;
      }
      // t — next section (ignore key repeat)
      if (key === "t" && !vimPending && !isRepeat) {
        if (isTyping) return false;
        const currentIdx = navLinks.findIndex((l) => l.sectionId === activeSection);
        const nextIdx = Math.min(currentIdx + 1, navLinks.length - 1);
        const next = navLinks[nextIdx];
        if (next) {
          goToSection(next.href, next.sectionId);
        }
        return true;
      }
      // T (Shift+t) — previous section (ignore key repeat)
      if (key === "T" && !isRepeat) {
        if (isTyping) return false;
        const currentIdx = navLinks.findIndex((l) => l.sectionId === activeSection);
        const prevIdx = Math.max(currentIdx - 1, 0);
        const prev = navLinks[prevIdx];
        if (prev) {
          goToSection(prev.href, prev.sectionId);
        }
        return true;
      }
      return false;
    },
    [activeSection, goToSection, reduceMotion, vimPending],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable === true;

      // Escape — close any open overlay
      if (e.key === "Escape") {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isShortcutHelpOpen) setIsShortcutHelpOpen(false);
        setVimPending("");
        return;
      }

      // Never intercept browser/OS/screen-reader shortcuts
      if (e.metaKey || e.ctrlKey || e.altKey) {
        setVimPending("");
        return;
      }

      // `?` (Shift+/) opens the shortcut help dialog
      if (e.key === "?" && !isTyping) {
        e.preventDefault();
        setIsShortcutHelpOpen((prev) => !prev);
        setVimPending("");
        return;
      }

      if (isTyping) {
        setVimPending("");
        return;
      }

      const key = e.key;

      // Handle `g` prefix (gg = top, g{letter} = section)
      if (key === "g" || key === "G") {
        if (!vimPending) {
          // First `g` — arm the prefix
          setVimPending("g");
          if (vimPendingTimer.current) clearTimeout(vimPendingTimer.current);
          vimPendingTimer.current = setTimeout(() => setVimPending(""), 800);
          e.preventDefault();
          return;
        }
        // Second `g` (gg) — jump to top
        if (vimPending === "g" && key === "g") {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
          });
          setVimPending("");
          return;
        }
      }

      // If `g` prefix is armed, expect a section letter
      if (vimPending === "g") {
        const lowerKey = key.toLowerCase();
        const link = navLinks.find((l) => l.shortcut === lowerKey);
        if (link) {
          e.preventDefault();
          goToSection(link.href, link.sectionId);
        }
        setVimPending("");
        return;
      }

      // Vim single-key commands (j, k, G, t, T)
      const handled = handleVimKey(key, isTyping, e.repeat);
      if (handled) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (vimPendingTimer.current) clearTimeout(vimPendingTimer.current);
    };
  }, [vimPending, isMobileMenuOpen, isShortcutHelpOpen, handleVimKey, goToSection, reduceMotion]);

  // -------------------------------------------------------------------------
  //  2-second intro hint — shows on first load
  // -------------------------------------------------------------------------
  useEffect(() => {
    const dismissed = sessionStorage.getItem("pyrope-intro-dismissed");
    if (dismissed) return;
    setShowIntroHint(true);
    const t = window.setTimeout(() => {
      setShowIntroHint(false);
      sessionStorage.setItem("pyrope-intro-dismissed", "1");
    }, 3500);
    return () => window.clearTimeout(t);
  }, []);

  // -------------------------------------------------------------------------
  //  Mobile menu: focus trap + restore
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isMobileMenuOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      const t = window.setTimeout(() => mobileMenuCloseRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    // else branch: restore focus to the element that opened the menu.
    // No cleanup needed here.
    lastFocusedRef.current?.focus?.();
    return undefined;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // -------------------------------------------------------------------------
  return (
    <>
      {/* ====================================================================
          FLOATING NAVBAR — always blurred, always visible
          ARIA: plain <nav> + <ul>/<li>. No menubar/menuitem roles — those
          are for application menus, not website navigation.
          ==================================================================== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-label="Primary"
        className="fixed top-3 md:top-4 left-0 right-0 z-40 px-3 md:px-6"
      >
        <div className="max-w-7xl mx-auto bg-bg-1/80 backdrop-blur-md border border-bg-3/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="px-4 md:px-5 h-14 md:h-16 flex items-center justify-between gap-2">
            {/* --- Logo (home link) --- */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
                } else {
                  navigate("/");
                }
              }}
              aria-label="Nirvik Dhungana — go to home"
              className="relative flex items-center justify-center w-10 h-10 shrink-0 group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
            >
              <div className="absolute inset-0 bg-accent/10 rounded-md transform transition-transform group-hover:scale-110 group-hover:rotate-3" aria-hidden="true" />
              <span className="relative font-display font-bold text-lg text-accent tracking-tighter" aria-hidden="true">
                {PersonalInfo.initials}
              </span>
            </a>

            {/* --- Desktop Nav Links — native <ul>/<li> pattern --- */}
            <ul className="hidden md:flex items-center space-x-0.5 lg:space-x-1 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = isPyropePage
                  ? link.name === "Projects"
                  : activeSection === link.sectionId;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className="relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group hover:bg-bg-2/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 block"
                      onClick={(e) => {
                        e.preventDefault();
                        goToSection(link.href, link.sectionId);
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-cover"
                          className="absolute inset-0 bg-bg-2 rounded-lg z-0"
                          aria-hidden="true"
                          transition={{
                            type: "spring" as const,
                            stiffness: 320,
                            damping: 28,
                            mass: 0.8,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors duration-200 ${
                          isActive
                            ? "text-accent"
                            : "text-fg-dim group-hover:text-fg-bright"
                        }`}
                      >
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* --- Desktop Actions --- */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsShortcutHelpOpen(true)}
                aria-label="View keyboard shortcuts (press Shift + question mark)"
                title="Keyboard shortcuts  (Shift + ?)"
                className="p-2 rounded-lg text-fg-dim hover:text-accent hover:bg-bg-2/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
              >
                <KeyboardIcon size={18} aria-hidden="true" />
              </button>
              <a
                href="#contact"
                className="px-4 py-2 bg-accent hover:bg-fg-bright text-bg-base transition-colors duration-300 rounded-lg text-sm font-semibold whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("#contact");
                }}
              >
                Let&apos;s Talk
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume PDF in a new tab"
                className="px-4 py-2 bg-transparent border border-bg-3 hover:border-accent text-fg-bright hover:text-accent transition-colors duration-300 rounded-lg text-sm font-semibold whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
              >
                Resume
              </a>
            </div>

            {/* --- Mobile Actions --- */}
            <div className="flex md:hidden items-center gap-1 shrink-0">
              <button
                type="button"
                className="p-2 rounded-lg text-fg-dim hover:text-fg-bright hover:bg-bg-2/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ====================================================================
          MOBILE MENU
          ==================================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg-base/95 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-bg-3/40">
              <span className="font-mono text-xs text-fg-dim tracking-[0.2em] uppercase">
                Menu
              </span>
              <button
                ref={mobileMenuCloseRef}
                className="p-2 rounded-lg text-fg-dim hover:text-fg-bright hover:bg-bg-2/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-8">
              <nav className="flex flex-col gap-2" aria-label="Mobile">
                <ul className="list-none m-0 p-0 flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <a
                        href={link.href}
                        aria-current={activeSection === link.sectionId ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMobileMenuOpen(false);
                          setTimeout(() => goToSection(link.href, link.sectionId), 200);
                        }}
                        className="group flex items-center justify-between py-3 border-b border-bg-3/30 font-display text-2xl font-semibold text-fg hover:text-accent transition-colors"
                      >
                        <span>{link.name}</span>
                        <kbd className="font-mono text-[10px] text-fg-faint opacity-0 group-hover:opacity-100 transition-opacity">
                          g {link.shortcut}
                        </kbd>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  className="mt-8 flex flex-col gap-3"
                >
                  <a
                    href="#contact"
                    className="px-5 py-3 bg-accent text-bg-base rounded-lg font-semibold text-center hover:bg-fg-bright transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => goToSection("#contact"), 200);
                    }}
                  >
                    Let&apos;s Talk
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume PDF in a new tab"
                    className="px-5 py-3 border border-bg-3 text-fg-bright rounded-lg font-semibold text-center hover:border-accent hover:text-accent transition-colors"
                  >
                    Download Resume
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          KEYBOARD SHORTCUT HELP DIALOG
          ==================================================================== */}
      <AnimatePresence>
        {isShortcutHelpOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
            aria-labelledby="shortcut-help-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-bg-base/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setIsShortcutHelpOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-bg-1 border border-bg-3/60 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    id="shortcut-help-title"
                    className="font-display text-xl font-bold text-fg-bright"
                  >
                    Keyboard Shortcuts
                  </h2>
                  <p className="text-fg-faint text-xs mt-1 font-mono">
                    Vim-style. Disabled while typing in inputs.
                  </p>
                </div>
                <button
                  className="p-2 rounded-lg text-fg-dim hover:text-fg-bright hover:bg-bg-2/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setIsShortcutHelpOpen(false)}
                  aria-label="Close shortcut help"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Vim navigation */}
              <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
                Scrolling
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Down half page</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">j</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Up half page</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">k</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Top of page</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">g g</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Bottom of page</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">G</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Next section</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">t</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Previous section</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">T</kbd>
                </div>
              </div>

              <div className="border-t border-bg-3/40 my-5" />

              <p className="font-mono text-[11px] text-accent uppercase tracking-wider mb-3">
                Jump to Section
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex items-center justify-between">
                    <span className="text-fg text-sm">{link.name}</span>
                    <span className="flex items-center gap-1">
                      <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">g</kbd>
                      <span className="text-fg-faint text-xs">then</span>
                      <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">{link.shortcut}</kbd>
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-bg-3/40 my-5" />

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Open this help</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">Shift + ?</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg text-sm">Close any dialog</span>
                  <kbd className="font-mono text-[11px] px-2 py-1 bg-bg-2 border border-bg-3 rounded text-fg-bright">Esc</kbd>
                </div>
              </div>

              <p className="text-fg-faint text-xs mt-6 leading-relaxed">
                Shortcuts never override browser, OS, or screen-reader shortcuts
                (Cmd/Ctrl/Alt combinations are always respected).
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          2-SECOND INTRO HINT — tells the user about vim keys
          ==================================================================== */}
      <AnimatePresence>
        {showIntroHint && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              setShowIntroHint(false);
              sessionStorage.setItem("pyrope-intro-dismissed", "1");
            }}
            aria-label="This site supports vim-style keyboard navigation. Press J or K to scroll, G G to jump to top, Shift question mark for all shortcuts. Click to dismiss."
            className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[65] bg-bg-1 border border-accent/40 rounded-xl px-5 py-3.5 shadow-2xl items-center gap-3 cursor-pointer hover:border-accent/70 transition-colors max-w-[calc(100vw-2rem)]"
          >
            <kbd className="font-mono text-xs text-accent shrink-0">⌨</kbd>
            <div className="text-left">
              <div className="text-fg-bright text-sm font-medium">
                Vim keys enabled
              </div>
              <div className="text-fg-dim text-xs mt-0.5">
                Press <kbd className="font-mono text-accent">j</kbd>/<kbd className="font-mono text-accent">k</kbd> to scroll, <kbd className="font-mono text-accent">?</kbd> for all shortcuts
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Vim-prefix indicator */}
      <AnimatePresence>
        {vimPending === "g" && !showIntroHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] pointer-events-none"
          >
            <div className="bg-bg-1 border border-accent/40 rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
              <kbd className="font-mono text-xs text-accent">g</kbd>
              <span className="text-fg-dim text-xs">then press a letter…</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
