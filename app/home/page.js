"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ScrollReveal from 'scrollreveal';
import './page.css';

function Home() {
  const router = useRouter();

  useEffect(() => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", (e) => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", (e) => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-line");
    });

    const headerImage = document.querySelector(".header__image");
    headerImage.addEventListener(
      "animationend",
      (e) => {
        setTimeout(() => {
          headerImage.classList.add("reveal");
        });
      },
      { once: true }
    );

    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    const sr = ScrollReveal();
    sr.reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 1500,
    });
    sr.reveal(".header__content h2", {
      ...scrollRevealOption,
      delay: 2000,
    });
    sr.reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 2500,
    });
    sr.reveal(".header__content div", {
      ...scrollRevealOption,
      delay: 3000,
    });

    sr.reveal(".header .nav__links", {
      delay: 3500,
    });
  }, []);



  return (
    <>
      <header class="header">
        <div class="header__container">
          <div class="header__image">
          <Image src="/assets/header.svg" alt="Header Image" width={500} height={300} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
          <div class="header__content">
            <h1>On Demand</h1>
            <h2>HUM SAFAR</h2>
            <p>
            We provide a convenient and hassle-free way to book a taxi or cab for your journey. Our online platform allows you to view available cabs, register, and book a ride with just a few clicks. With our user-friendly interface and competitive pricing, we ensure a smooth and enjoyable travel experience.
            </p>
            <div>
              <button class="btn"><a href="/">Book Now</a></button>
            </div>
          </div>
        </div>
      </header>
      <div class="banner">
      <div class="banner__card">
        <div class="banner__content">
          <h2>10%</h2>
          <h3>OFF</h3>
          <p>Use Code PM10</p>
        </div>
      </div>
      <div class="banner__card">
        <h4>Lucknow</h4>
        <p>
          Got a business in Lucknow!! Book Now and reach at your business hassle free.
        </p>
        <a href="/">Book Now</a>
      </div>
      <div class="banner__card">
        <h4>Gorakhpur</h4>
        <p>
          Visiting Gorakhpur? Good Choice, you are at right place to make your travel amazing
        </p>
        <a href="/">Book Now</a>
      </div>
      <div class="banner__card">
        <h4>Book Now</h4>
        <p>
          Book Now and reach your destination in no time and at affordable costs.
        </p>
        <a href="/">Book Now</a>
      </div>
    </div>

    </>
  );
}

export default Home;