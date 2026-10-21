import { useEffect, useState } from "react";
import Reveal from "reveal.js";

import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/night.css"; // You can change the theme (e.g., "white", "league", etc.)

// Import Reveal.js plugins
import RevealMarkdownPlugin from "reveal.js/plugin/markdown/markdown";
import RevealHighlightPlugin from "reveal.js/plugin/highlight/highlight";
import RevealNotesPlugin from "reveal.js/plugin/notes/notes";
import RevealZoomPlugin from "reveal.js/plugin/zoom/zoom";

// Import plugin styles
import "reveal.js/plugin/highlight/monokai.css";

// Import custom styles
import "./App.css";

// Import slides
import IntroSlide from "./slides/Intro";
import CompanySlide from "./slides/Company";
import AboutMeSlide from "./slides/AboutMe";
import MainStory from "./slides/MainStory";
import Zakljucak from "./slides/Zakljucak";
import DemoSlide from "./slides/Demo";
import Goals from "./slides/Goals";

import { BGMatrix } from "./components/BgMatrix";

function App() {
  console.log("Sanity check; React App Rerender!");
  const [showMatrix, setShowMatrix] = useState(true);

  useEffect(() => {
    console.log("Sanity check; onMount Reveal.js Init!");
    // Initialize Reveal.js
    const deck = new Reveal();
    deck.initialize(
      // Add any Reveal.js configuration options here
      {
        hashOneBasedIndex: true,
        respondToHashChanges: true,
        hash: true,
        history: true,

        // links: true,
        controls: true,
        progress: true,
        center: true,
        transition: "slide", // none/fade/slide/convex/concave/zoom
        // backgroundTransition: "slide",
        // controlsBackArrows: "faded",
        slideNumber: false,
        plugins: [
          RevealMarkdownPlugin,
          RevealHighlightPlugin,
          RevealNotesPlugin,
          RevealZoomPlugin,
        ],
      },
    );

    const syncMatrixVisibility = () => {
      const currentSlide = deck.getCurrentSlide() as HTMLElement | null;
      const isCompanySlide = Boolean(
        currentSlide?.closest(".company-slide-group") ||
          currentSlide?.closest("[data-company-slide]"),
      );

      setShowMatrix(!isCompanySlide);
    };

    deck.on("ready", syncMatrixVisibility);
    deck.on("slidechanged", syncMatrixVisibility);

    return () => {
      console.log("Sanity check; onUnmount Reveal.js Dispose!");
      // Dispose of Reveal.js instance
      deck.destroy();
    };
  }, []);

  return (
    <div className="reveal">
      <BGMatrix isVisible={showMatrix} />
      <div className="slides">
        <IntroSlide />
        <AboutMeSlide />
        <CompanySlide />
        <Goals />
        <MainStory />
        <DemoSlide />
        <Zakljucak />
      </div>
    </div>
  );
}

export default App;
