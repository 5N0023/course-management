"use client";
import { SearchBar } from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import { CoursesTable } from "./CoursesTable";
import { Course } from "@/app/types/types";
import axios from "axios";
import { AddCourseSlide } from "./AddCourseSlide";
import { toast } from "@/hooks/use-toast";

export default function MainContent() {
  const [courses, setCourses] = useState([] as Course[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/course?page=${currentPage}&q=${search}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        setCourses(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "You are not authorized to view this page",
            variant: "destructive",
          });
          toast({
            title: "Error",
            description: "Error fetching courses",
            variant: "destructive",
          });
        }
      }
    };
    fetchCourses();
  }, [currentPage, refresh, search]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  return (
    <>
      <AddCourseSlide setRefresh={setRefresh} refresh={refresh} />
      <SearchBar search={search} setSearch={setSearch} />
      <CoursesTable
        courses={courses}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
