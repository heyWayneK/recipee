import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import TestimonialRating from "./TestimonialRating";

const data = {
  title1: "Welcome to Recipee.app",
  title2: "Efficient Recipee and Production App",
  title3: "for chef,",
  title4: "by chefs",
  description: "Everything you need to manage your kitchen, from recipes to production, all in one place.",
};

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-8 pt-32 bg-black lg:pb-20">
      <div className="flex justify-between lg:items-center flex-col lg:flex-row gap-8">
        <div className="lg:w-[45%] max-w-[450px]">
          <TestimonialRating />
          <h1 className="font-inter text-[48px] leading-[57px] font-bold mt-4 text-white">
            {data?.title1} <span className="text-transparent bg-gradient-to-r from-[#E437F2] to-[#853FF8] bg-clip-text">{data?.title2}</span> <span className="line-through">{data?.title3}</span>{" "}
            {data?.title4}
          </h1>
          <p className="text-[#95959D] font-inter text-xl my-4">{data?.description}</p>
          <button className="btn bg-[#006fee] border-none hover:bg-[#006fee] text-white scale-1 hover:scale-[1.05] transition-all duration-300 btn-wide rounded-full">Get {config.appName}</button>
          <TestimonialsAvatars priority={true} />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
            alt="Product Demo"
            className="w-full"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
