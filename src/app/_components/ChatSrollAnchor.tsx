"use client";
import { useAtBottom } from "@/lib/useAtBottom";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ChatSrollAnchor = () => {
  const trackVisibility = true;
  const isAtBottom = useAtBottom();
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -50px 0px",
  });

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isAtBottom, trackVisibility, inView, entry]);

  return <div ref={ref} className='h-px w-full'></div>;
};

export default ChatSrollAnchor;
