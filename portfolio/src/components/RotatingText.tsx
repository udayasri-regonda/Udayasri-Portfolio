"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Cycles through short phrases. Screen readers get the full list once, not the animation. */
export default function RotatingText({ items, interval = 2600 }: { items: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);

  return (
    <>
      <span className="sr-only">{items.join(", ")}</span>
      <span aria-hidden className="relative inline-block h-[1.4em] min-w-[16ch] overflow-hidden align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={items[i]}
            initial={reduce ? false : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap font-semibold text-ink"
          >
            {items[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
