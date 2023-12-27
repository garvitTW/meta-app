import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial update on mount
    updateWindowSize();

    // Attach event listener to update on window resize
    window.addEventListener("resize", updateWindowSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  return windowSize;
}
