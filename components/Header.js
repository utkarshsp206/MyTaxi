"use client";
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import './Header.css'

function Header() {
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
  }, []);

  return (
    <nav>
      <div class="nav__logo">
        <a href="/home">
          <img src="assets/logo-color.png" alt="logo" class="logo-color" />
          <img src="assets/logo-white.png" alt="logo" class="logo-white" />
        </a>
      </div>
      <ul class="nav__links" id="nav-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/home">About Us</a></li>
        <li><a href="/">Booking</a></li>
        <li><a href="/home">Contact Us</a></li>
      </ul>
      <div class="nav__menu__btn" id="menu-btn">
        <span><i class="ri-menu-line"></i></span>
      </div>
      <div class="nav_userbtn">
        <UserButton/>
      </div>
    </nav>
  );

}

export default Header;