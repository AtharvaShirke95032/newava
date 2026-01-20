
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/back2.mp4" type="video/mp4" />
          </video>
          {/* Optional overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black/30 z-10" /> */}
        </div>

        {/* Noise Pattern - Blended at bottom of video */}
        <div
          className="absolute left-0 right-0 w-full h-[440px] z-20 bg-repeat-x pointer-events-none"
          style={{
            bottom: '-150px',
            backgroundImage: "url('/noise.png'), url('/noisepat.png')",
            backgroundPosition: "top, top 440px center",
            backgroundSize: "auto, auto"
          }}
        />

        {/* Hero Content */}
        <div className="relative flex flex-col gap-10 justify-center items-center z-10 min-h-screen">

          <Image src="/text2.png" alt="logo" width={677} height={369} className="pt-40" />
          <p className="text-white text-xl ">Register now</p>
          <a className="relative inline-block w-[252px] h-[48px] cursor-pointer">
            <Image
              src="/btn.svg"
              alt="button"
              fill
              className="object-contain"
            />

            <span className="absolute inset-0 flex items-center justify-center  font-bold uppercase text-sm tracking-widest pointer-events-none">
              Register
            </span>
          </a>

        </div>

      </section>

      {/* Content Section Below Hero */}
      <section className="absolute p-10 top-210 w-full z-50 flex justify-center">
        <div
          className="
        absolute inset-0
        pointer-events-none
        opacity-30
        [background-image:radial-gradient(circle,#fcee0a_1px,transparent_1px)]
        [background-size:80px_80px]
      "
        />
        {/* <div className="absolute border-t-3 w-full border-yellow-400/10"></div>
          <div className="absolute bottom-0 border-t-3 w-full border-yellow-400/10"></div> */}
        <div className="relative w-full max-w-[1100px] px-20 py-14  text-white">

          <span className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-400" />
          <span className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-400" />
          <span className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-400" />
          <span className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-400" />

          <h2 
            className="text-center text-yellow-400 font-extrabold uppercase text-7xl mb-8"
            style={{ fontFamily: '"VT323", monospace' }}
          >
            What is Avalon
          </h2>

          <p className="max-w-[760px] mx-auto text-md leading-8 text-center text-gray-200">
            Welcome to Avalon 2026, where technology meets imagination. Our annual techfest brings together the brightest minds to explore the frontiers of innovation and creativity.
          </p>

        </div>

      </section>
     



    </div>




  );
}
