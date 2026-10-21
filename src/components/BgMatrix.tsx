import { useEffect, useRef } from "react";

export function BGMatrix({ isVisible = true }: { isVisible?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns: number[] = [];
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const fontSize = 14;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Array(Math.floor(canvas.width / fontSize))
        .fill(0)
        .map(() => Math.floor(Math.random() * (canvas.height / fontSize)));
      for (let i = 0; i < 100; i++) {
        drawMatrix();
      }
    };

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        const y = fontSize * columns[i];
        const midpoint = 0.5 * canvas.height;

        const opacity =
          y > midpoint
            ? Math.max(
                0,
                0.35 * (1 - (y - midpoint) / (canvas.height - midpoint)),
              )
            : 0.35;

        ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;

        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, fontSize * i, y);

        if (fontSize * columns[i] > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }

        columns[i]++;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const intervalId = window.setInterval(drawMatrix, 50);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: isVisible ? "block" : "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}