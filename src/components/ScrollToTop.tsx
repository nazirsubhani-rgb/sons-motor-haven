import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    // Scroll to top on any navigation, including same-route clicks
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, key]); // key changes on every navigation, even to same route

  return null;
};

export default ScrollToTop;
