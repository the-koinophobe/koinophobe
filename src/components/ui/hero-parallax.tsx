
/**
 * Hero Parallax — Aceternity UI
 * Original author: Manu Arora (https://aceternity.com)
 * Install: npx shadcn@latest add @aceternity/hero-parallax
 * Adapted: motion/react instead of framer-motion, standard <img> instead of Next.js Image
 */
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

export type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

export const HeroParallax = ({
  products,
  children,
}: {
  products: Product[];
  children?: React.ReactNode;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX       = useSpring(useTransform(scrollYProgress, [0, 1], [0,   1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX          = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]),   springConfig);
  const opacity          = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),  springConfig);
  const rotateZ          = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]),   springConfig);
  const translateY       = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Header slot */}
      <Header>{children}</Header>

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        {/* Row 1 — scrolls right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>

        {/* Row 2 — scrolls left */}
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>

        {/* Row 3 — scrolls right */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── Header slot ────────────────────────────────────────────────────────────

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      {children}
    </div>
  );
};

// ─── ProductCard ─────────────────────────────────────────────────────────────

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover/product:shadow-2xl"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-bold text-lg">
        {product.title}
      </h2>
    </motion.div>
  );
};
