"use client";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Admin() {
  const [ClearLoading, SetClearLoading] = useState(false);

  const deleteAllCourses = async () => {
    SetClearLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/course/deleteAll`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Courses deleted successfully",
          variant: "default",
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page",
          variant: "destructive",
        });
      }
      toast({
        title: "Error",
        description: "Error deleting courses",
        variant: "destructive",
      });
    }
    SetClearLoading(false);
  };

  const [appendFileLoading, SetAppendFileLoading] = useState(false);
  const appendJsonFile = async () => {
    SetAppendFileLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/course/fromJson`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Courses added successfully",
          variant: "default",
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page",
          variant: "destructive",
        });
        toast({
          title: "Error",
          description: "Error adding courses",
          variant: "destructive",
        });
      }
    }
    SetAppendFileLoading(false);
  };
  return (
    <div className="p-12 gap-4 flex flex-col w-full items-center justify-center bg-gray-300 m-4 p-2 max-w-[400px] sm:max-w-[70vw]  mx-auto rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
      <h1 className="text-4xl font-bold text-primary text-center mb-12 mt-4">
        Manage DataBase Here
      </h1>
      <Button
        className="m-4 flex items-center flex-row z-10 transition-opacity duration-300 bg-red-500"
        disabled={ClearLoading}
        onClick={deleteAllCourses}
      >
        {ClearLoading ? "clearing..." : "Clear all courses from DataBase"}
      </Button>
      <div className="flex items-center flex-col z-10 transition-opacity duration-300 ">
        <h1 className="text-xl font-bold text-black text-center mb-4 mt-4  transition-opacity duration-300">
          Append Json file to DataBase Located at /data/courses_data.json
        </h1>
        <Button
          className="m-1 flex items-center flex-row z-10 transition-opacity duration-300"
          disabled={appendFileLoading}
          onClick={appendJsonFile}
        >
          {appendFileLoading ? "adding..." : "Add courses from Json file"}
        </Button>
      </div>
    </div>
  );
}
