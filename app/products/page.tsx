import Footer from "@/components/Footer";
import Hero from "@/components/Products/Hero";
import ImageCarousel from "@/components/Products/ImageCarousel";
import Specs from "@/components/Products/Specs";

const Page = () => {
  return (
    <div className="relative">
      <Hero />
      <div id="image-carousel" className="mt-20 mb-20">
        <ImageCarousel />
      </div>
      <Specs />
      <Footer />
    </div>
  );
};

export default Page;