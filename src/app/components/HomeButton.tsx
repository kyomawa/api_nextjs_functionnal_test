"use client";

import { useState } from "react";

export default function HomeButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 w-fit bg-white/10 rounded hover:bg-white/15 duration-200 transition-colors"
    >
      {clicked ? "Mdrr t trop con !" : "Click here !"}
    </button>
  );
}
