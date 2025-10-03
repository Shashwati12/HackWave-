"use client";

import { ShootingStars } from "./ui-components/shooting-stars";
import { StarsBackground } from "./ui-components/stars-background";

export function Background() {
  return (
    <>
      <ShootingStars />
      <StarsBackground />
    </>
  );
}