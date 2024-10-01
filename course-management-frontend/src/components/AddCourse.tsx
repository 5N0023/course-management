"use client";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { LogOut, PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddCourse() {
  const [isVisible, setIsVisible] = useState(true);

  const AddCourseHandler = async () => {
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={AddCourseHandler}
      className={`fixed top-0 left-0 m-4 flex items-center flex-row z-10 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <PackagePlus />
      <span className="ml-2">Add Course</span>
    </button>
  );
}
