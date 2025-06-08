import Navigation from "@/components/navigation";
import SunnieHero from "@/components/sunnie-hero";
import SunnieServices from "@/components/sunnie-services";
import SunnieAbout from "@/components/sunnie-about";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SunnieHero />
      <SunnieServices />
      <SunnieAbout />
      <Footer />
    </div>
  );
}
