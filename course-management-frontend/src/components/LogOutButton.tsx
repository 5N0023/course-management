"use client";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogOutButton() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const LogOutHandler = async () => {
    try {
      const response = await axios.get("/auth/logout");
      if (response.status === 200) {
        // remove token from local storage
        localStorage.removeItem("token");
        toast({
          title: "Logout success",
          description: "You have successfully logged out.",
        });
        router.push("/login");
      } else throw new Error("Logout failed");
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page",
          variant: "destructive",
        });
      }
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
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
      onClick={LogOutHandler}
      className={`fixed top-0 right-0 m-4 flex items-center flex-row text-red-500 z-10 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <LogOut />
    </button>
  );
}
