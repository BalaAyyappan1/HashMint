import AnimatedText from "@/components/AnimatedText";
import Hero from "../components/hero";
import VideoAnimation from "@/components/VideoAnimation";
export default function Home() {
  return (
    <div className="p-5">
     <VideoAnimation />
      <AnimatedText text="Scaling Gradient Text Animation" />

    </div>
  );
}
