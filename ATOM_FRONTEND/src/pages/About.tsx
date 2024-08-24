import React from "react";
import woman from "../assets/collectionAssets/1.jpg";
import man from "../assets/collectionAssets/3.jpg";

const About: React.FC = () => {
  return (
    <section className="flex flex-col space-y-0">
      {/* Row 1 */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div
          style={{
            borderImage: "linear-gradient(to bottom, black, #6b8590) 1",
            backgroundColor: "black", 
          }}
          className="flex-none border-b-4 border-r-4 border-black flex items-center justify-center w-full md:w-1/2 h-[500px] p-4"
        >
          <div className="text-center">
            <p className="text-xl md:text-3xl atom font-semibold text-stone-100 mb-4">
              Assert your dominance with AToM
            </p>
            <p className="text-xs md:text-xl atom text-gray-200">
              Discover AToM – the ultimate expression of individuality and
              style. Embrace the most unique way to make a statement and assert
              your dominance. With AToM, you’re not just buying clothing; you’re
              investing in a bold declaration of who you are.
            </p>
          </div>
        </div>

        <div
          style={{
            borderImage: "linear-gradient(to bottom, black, #6b8590) 1",
          }}
          className="flex-none border-b-4 border-l-4 border-black flex items-center justify-center w-full md:w-1/2 h-[500px]"
        >
          <img src={man} alt="Man" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="w-full md:w-[25%] service-cards-bg h-[500px]"></div>
        <div className="w-full md:w-[50%] flex items-center justify-center">
          <div className="text-center">
            <h1 className="atom text-4xl md:text-6xl font-bold mb-4 mt-5">
              our Story
            </h1>
            <p className="atom text-xs md:text-xl text-gray-700">
              At AToM, we’re not just changing the way fashion is worn—we’re
              redefining it. Our bold vision and innovative approach set us
              apart as pioneers in the industry. From meticulously selecting the
              finest materials to crafting designs that blend timeless elegance
              with cutting-edge trends, we elevate every piece of clothing into
              a statement of personal identity. our commitment to excellence
              transcends mere style; it represents a movement towards a new
              standard of sophistication and self-expression. each garment we
              create is a canvas for individuality and confidence, meticulously
              designed to empower and inspire. Join us in this transformative
              journey, where every piece of clothing tells a story of artistry,
              innovation, and empowerment. AToM is not just a brand—it’s the
              future of fashion, and it starts with you.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[25%] service-cards-bg h-[500px]"></div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div
          style={{
            borderImage: "linear-gradient(to bottom, black, #6b8590) 1",
          }}
          className="flex-none border-t-4 border-r-4 border-black flex items-center justify-center w-full md:w-1/2 h-[500px]"
        >
          <img src={woman} alt="Woman" className="w-full h-full object-cover" />
        </div>
        <div
          style={{
            borderImage: "linear-gradient(to bottom, black, #6b8590) 1",
          }}
          className="flex-none border-t-4 border-l-4 border-black flex items-center justify-center w-full md:w-1/2 h-[500px] p-4"
        >
          <div className="text-center">
            <h2 className="text-xl md:text-3xl atom font-semibold text-black mb-4">
              Embrace Your Style with AToM
            </h2>
            <p className="text-xs md:text-lg atom text-slate-950">
              At AToM, we revolutionize the clothing industry by empowering you
              to express your unique style and assert your dominance. our
              innovative designs and high-quality fabrics ensure you stand out
              with confidence. Discover how AToM can transform your wardrobe and
              elevate your presence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
