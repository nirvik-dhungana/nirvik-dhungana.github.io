import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { TestimonialsContent } from "../data/content";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const ringColors = [
  "border-rosewood text-rosewood",
  "border-lagoon text-lagoon",
  "border-verdant text-verdant",
  "border-gold text-gold",
];

export function Testimonials() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || container.children.length === 0) return;

    // Filter out style tags to get actual testimonial elements
    const items = Array.from(container.children).filter(
      (child) => child.tagName !== "STYLE",
    );
    if (items.length === 0) return;

    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === firstItem) {
            setCanScrollLeft(!entry.isIntersecting);
          }
          if (entry.target === lastItem) {
            setCanScrollRight(!entry.isIntersecting);
          }
        });
      },
      {
        root: container,
        threshold: 0.95, // trigger when mostly visible
      },
    );

    observer.observe(firstItem);
    observer.observe(lastItem);

    return () => observer.disconnect();
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const gap = 24;
      const scrollAmount =
        direction === "left" ? -(clientWidth + gap) : clientWidth + gap;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="testimonials"
      className="relative z-10 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-accent tracking-[0.2em] font-medium uppercase">
            // 07 — TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-fg-bright mt-3">
            What People Say
          </h2>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mt-6 md:mt-0"
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-12 h-12 rounded-full border border-bg-3 flex items-center justify-center text-fg hover:text-accent hover:border-accent transition-all disabled:opacity-30 disabled:hover:border-bg-3 disabled:hover:text-fg disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-12 h-12 rounded-full border border-bg-3 flex items-center justify-center text-fg hover:text-accent hover:border-accent transition-all disabled:opacity-30 disabled:hover:border-bg-3 disabled:hover:text-fg disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory flex gap-6 hide-scrollbar cursor-grab active:cursor-grabbing pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .hide-scrollbar::-webkit-scrollbar {
                  display: none;
              }
           `,
            }}
          />

          {TestimonialsContent.map((item, idx) => (
            <motion.div
              key={`${item.name}-${idx}`}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="snap-center md:snap-start shrink-0 w-full md:w-[calc(50%-12px)] bg-bg-1 border border-bg-3/40 rounded-3xl p-6 md:p-8 relative flex flex-col justify-between transition-colors hover:border-accent/10 overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 text-accent opacity-[0.05] z-0 w-16 h-16 md:w-[100px] md:h-[100px]" />

              <p className="text-sm md:text-xl text-fg leading-relaxed mb-6 md:mb-8 relative z-10 font-medium">
                "{item.quote}"
              </p>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mt-auto relative z-10 w-full">
                <div
                  className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full border-2 flex items-center justify-center bg-bg-base font-display font-bold text-sm md:text-lg ${ringColors[idx % ringColors.length]}`}
                >
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="overflow-hidden w-full">
                  <div className="text-base md:text-lg font-display font-bold text-fg-bright truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] md:text-sm font-mono text-fg-dim truncate">
                    {item.role} @ {item.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
