"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function HomePage() {
  const router = useRouter();

  return (
    <div className="relative h-screen">
      <Image
        src="/homepage-banner.jpg"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full opacity-70"
        alt="Home Banner"
      />
      <div className="relative z-10 flex h-screen items-center justify-center flex-col">
        <h1 className="text-[40px] font-bold mb-4">Welcome to Our Booking Service</h1>
        <p className="text-[20px] mb-10 text-center max-w-[600px]">
          Book your travel seats easily and enjoy a seamless experience. Choose from a variety of options and travel in comfort. Your journey starts here!
        </p>
        <div className="flex space-x-4">
          <button
            className="p-2 bg-blue-500 text-white px-10 rounded-lg"
            onClick={() => router.push("/")}
          >
            Book Now
          </button>
          <button
            className="p-2 bg-green-500 text-white px-10 rounded-lg"
            onClick={() => router.push("/")}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;