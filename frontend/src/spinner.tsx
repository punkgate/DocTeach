import { useEffect, useState } from "react";

const frames = [
  "⠋",
  "⠙",
  "⠹",
  "⠸",
  "⠼",
  "⠴",
  "⠦",
  "⠧",
  "⠇",
  "⠏",
];

interface SpinnerProps {
  text?: string;
}

export default function Spinner({
  text = "Working...",
}: SpinnerProps) {
  const [index, setIndex] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setIndex(
          (prev) =>
            (prev + 1) %
            frames.length
        );
      }, 80);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  return (
    <span>
      {frames[index]} {text}
    </span>
  );
}