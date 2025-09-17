"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  // Gerar vigas responsivas baseadas na largura da viewport
  const generateResponsiveBeams = (width: number) => {
    const numBeams = Math.max(6, Math.floor(width / 100)); // Pelo menos 6 vigas
    const beams = [];

    for (let i = 0; i < numBeams; i++) {
      const position = (i / (numBeams - 1)) * 90 + 5; // Distribuir entre 5% e 95%
      beams.push({
        initialX: position, // Agora é uma porcentagem
        duration: 4 + Math.random() * 6, // 4-10 segundos
        repeatDelay: 2 + Math.random() * 3, // 2-5 segundos
        delay: Math.random() * 4, // 0-4 segundos
        className: `h-${[6, 8, 10, 12, 14][Math.floor(Math.random() * 5)]}`,
        color: [
          "from-indigo-500 via-purple-500 to-transparent",
          "from-pink-500 via-red-500 to-transparent",
          "from-green-400 via-teal-400 to-transparent",
          "from-yellow-400 via-orange-400 to-transparent",
          "from-indigo-400 via-purple-400 to-transparent",
          "from-pink-300 via-red-300 to-transparent",
          "from-green-300 via-teal-300 to-transparent",
          "from-yellow-300 via-orange-300 to-transparent",
        ][Math.floor(Math.random() * 8)],
      });
    }

    return beams;
  };

  const beams = viewportWidth > 0 ? generateResponsiveBeams(viewportWidth) : [];

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-screen min-h-[calc(100vh_-_1px)] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center",
        className
      )}
      style={{
        overflow: "hidden",
        maxWidth: "100vw",
        width: "100%",
      }}
    >
      {/* Container interno com overflow hidden mais rigoroso */}
      <div
        className="absolute inset-0"
        style={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        {beams.map((beam, index) => (
          <CollisionMechanism
            key={`beam-${index}-${beam.initialX}`}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
          />
        ))}
      </div>

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 dark:bg-neutral-800 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
      color?: string;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  // Calcular posições responsivas baseadas na largura da viewport
  const getResponsivePosition = (initialX: number) => {
    // initialX agora é uma porcentagem (5-95)
    return `${initialX}%`;
  };

  return (
    <>
      <motion.div
        key={beamKey}
        ref={ref || beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: "0px", // Sem movimento horizontal
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute top-20 w-px rounded-full",
          // Usar o gradiente personalizado da opção ou padrão
          beamOptions.color
            ? `bg-gradient-to-t ${beamOptions.color}`
            : "bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className || "h-14"
        )}
        style={{
          left: getResponsivePosition(beamOptions.initialX || 0),
          transform: "translateX(-50%)", // Centralizar a viga na posição
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 35 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 160 - 80),
    directionY: Math.floor(Math.random() * -100 - 20),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-4 w-4", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
            scale: [0, 1, 0],
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
