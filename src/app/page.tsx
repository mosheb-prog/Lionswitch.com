import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { AboutSummary } from "@/components/home/AboutSummary";
import { StatsBar } from "@/components/home/StatsBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyLionSwitch } from "@/components/home/WhyLionSwitch";
import { FutureBand } from "@/components/home/FutureBand";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { DashboardMcpTeaser } from "@/components/home/DashboardMcpTeaser";
import { ReadyToSwitchCta } from "@/components/home/ReadyToSwitchCta";
import { HomeFaq } from "@/components/home/HomeFaq";

export const metadata: Metadata = pageMetadata({
  title: "Lion Switch — Enterprise Cloud Communications | Brooklyn, NY",
  description:
    "Family-run cloud business phone, UCaaS, contact center and messaging provider based in Brooklyn, NY, serving businesses in all 50 states and internationally.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutSummary />
      <ServicesOverview />
      <WhyLionSwitch />
      <FutureBand />
      <FeatureHighlights />
      <DashboardMcpTeaser />
      <ReadyToSwitchCta />
      <HomeFaq />
    </>
  );
}
