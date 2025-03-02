import { useEffect, useState } from "react";

export const useAtBottom = (offset = 0) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  useEffect(() => {
    const handleSroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleSroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleSroll);
    };
  }, [offset]);

  return isAtBottom;
};
