import { useEffect, useRef, useState } from "react";

export function PasswordGlitchTypeEffectText({
  children,
  reanimateEveryMs = 0,
  toReanimateChildren,
  oscillateChildren,
}: {
  children: string;
  reanimateEveryMs?: number | false;
  toReanimateChildren?: string;
  oscillateChildren?: string;
}) {
  const [animateTimestamp, setAnimateTimestamp] = useState(Date.now());
  const [activeText, setActiveText] = useState(children);
  const elementRef = useRef<HTMLElement | null>(null);

  const alternateText = toReanimateChildren ?? oscillateChildren ?? "";

  useEffect(() => {
    if (reanimateEveryMs && reanimateEveryMs > 0) {
      const timer = window.setInterval(() => {
        setAnimateTimestamp(Date.now());
        setActiveText((currentText) =>
          currentText === children ? alternateText || children : children,
        );
      }, reanimateEveryMs);

      return () => window.clearInterval(timer);
    }

    setActiveText(children);
    return undefined;
  }, [children, alternateText, reanimateEveryMs]);

  useEffect(() => {
    const textToRender = activeText || children;
    let i = 0;
    const interval = window.setInterval(() => {
      const element = elementRef.current;
      if (element) {
        element.innerText = textToRender
          .split("")
          .map((char, index) => {
            if (index < i) {
              return char;
            }
            return String.fromCharCode(
              Math.floor(Math.random() * (126 - 33)) + 33,
            );
          })
          .join("");
        if (i >= textToRender.length) {
          window.clearInterval(interval);
        }
        i += 1 / 3;
      }
    }, 30);

    return () => window.clearInterval(interval);
  }, [animateTimestamp, activeText, children]);

  return (
    <span
      onClick={() => {
        setActiveText((currentText) =>
          currentText === children ? alternateText || children : children,
        );
        setAnimateTimestamp(Date.now());
      }}
      ref={elementRef}
    >
      {children}
    </span>
  );
}

export default PasswordGlitchTypeEffectText;
