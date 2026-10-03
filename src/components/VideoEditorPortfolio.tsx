import VideoHero from "./video/VideoHero";
import Marquee from "./video/Marquee";
import Showreel from "./video/Showreel";
import SelectedWork from "./video/SelectedWork";
import Services from "./video/Services";
import WhyChooseMe from "./video/WhyChooseMe";
import BeforeAfter from "./video/BeforeAfter";
import BehindTheEdit from "./video/BehindTheEdit";
import VideoContact from "./video/VideoContact";
import Cursor from "./Cursor";

const VideoEditorPortfolio = () => {
  return (
    <div className="relative w-full bg-[#07070d] text-white overflow-x-hidden">
      <Cursor />
      <main className="w-full">
        <VideoHero />
        <Marquee />
        <Showreel />
        <SelectedWork />
        <Services />
        <WhyChooseMe />
        <BeforeAfter />
        <BehindTheEdit />
        <VideoContact />
      </main>
    </div>
  );
};

export default VideoEditorPortfolio;
