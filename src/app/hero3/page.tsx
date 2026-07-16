import type { Metadata } from "next";
import { Hero3Page } from "@/components/hero3/hero3-page";

export const metadata: Metadata = {
  icons: null
};

export default function Hero3Route() {
  return <Hero3Page />;
}
