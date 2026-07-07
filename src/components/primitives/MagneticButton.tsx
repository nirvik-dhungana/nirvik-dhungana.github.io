import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * MagneticButton — a button/link that subtly follows the cursor when
 * hovered, creating a "magnetic" pull. Used on primary CTAs.
 *
 * Respects reduced-motion (renders as a static button).
 */

interface MagneticButtonProps {
    children: ReactNode;
    /** Strength of the magnetic pull in px. Default: 8. */
    strength?: number;
    className?: string;
    /** Render as an `<a>` (default) or `<button>`. */
    as?: "a" | "button";
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    type?: "button" | "submit";
    [key: string]: unknown;
}

export function MagneticButton({
    children,
    strength = 8,
    className = "",
    as = "a",
    href,
    onClick,
    type = "button",
    ...rest
}: MagneticButtonProps) {
    const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const reduceMotion = useReducedMotion();

    const handleMove = (e: React.MouseEvent) => {
        if (reduceMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        // Normalize to [-1, 1] then scale by strength.
        setOffset({
            x: (x / (rect.width / 2)) * strength,
            y: (y / (rect.height / 2)) * strength,
        });
    };

    const handleLeave = () => setOffset({ x: 0, y: 0 });

    const motionProps = reduceMotion
        ? {}
        : {
              animate: { x: offset.x, y: offset.y },
              transition: { type: "spring" as const, stiffness: 200, damping: 15, mass: 0.3 },
          };

    if (as === "button") {
        return (
            <motion.button
                ref={ref}
                type={type}
                className={className}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                onClick={onClick}
                {...motionProps}
                {...rest}
            >
                {children}
            </motion.button>
        );
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            className={className}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={onClick}
            {...motionProps}
            {...rest}
        >
            {children}
        </motion.a>
    );
}

export default MagneticButton;
