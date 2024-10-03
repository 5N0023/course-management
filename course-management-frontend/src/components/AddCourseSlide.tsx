"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";

export function AddCourseSlide({
  setRefresh,
  refresh,
}: {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}) {
  const [isVisible, SetIsVisible] = useState(true);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    schedule: {
      time: "12:00",
      day: "monday",
    },
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        SetIsVisible(false);
      } else {
        SetIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [display, setDisplay] = useState(false);
  const addCourse = async () => {
    if (!newCourse.title || !newCourse.description || !newCourse.instructor) {
      toast({
        title: "Invalid input",
        description: "Title, description and instructor are required.",
        variant: "destructive",
      });
      return;
    }
    setDisplay(true);
    const postedCourse = {
      title: newCourse.title,
      description: newCourse.description,
      instructor: newCourse.instructor,
      schedule: `${newCourse.schedule.time} ${newCourse.schedule.day}`,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(postedCourse),
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Course added",
          description: "You have successfully added a new course.",
        });
        setRefresh(!refresh);
        document.getElementById("closeSlideButton")?.click();
        setNewCourse({
          title: "",
          description: "",
          instructor: "",
          schedule: {
            time: "12:00",
            day: "monday",
          },
        });
      } else throw new Error("Course add failed");
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "You are not authorized to view this page",
          variant: "destructive",
        });
        toast({
          title: "Course add failed",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
    setDisplay(false);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={`fixed top-0 left-0 m-4 flex items-center flex-row z-10 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <PackagePlus />
          <span className="ml-2">Add Course</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new course</SheetTitle>
          <SheetDescription>
            Fill out the form below to add a new course.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Title" className="text-right">
              Title
            </Label>
            <Input
              id="Title"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            <Textarea
              placeholder="Type your message here."
              className="col-span-3 text-black"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Instructor" className="text-right">
              Instructor
            </Label>
            <Input
              id="Instructor"
              value={newCourse.instructor}
              onChange={(e) =>
                setNewCourse({ ...newCourse, instructor: e.target.value })
              }
              className="col-span-3 text-black"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Instructor" className="text-right">
              Schedule
            </Label>
            <input
              type="time"
              id="appt"
              name="appt"
              className="text-black col-span-1"
              value={newCourse.schedule.time}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  schedule: { ...newCourse.schedule, time: e.target.value },
                })
              }
            />
            <select
              id="day"
              name="day"
              className="text-black col-span-2"
              value={newCourse.schedule.day}
              defaultValue="monday"
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  schedule: { ...newCourse.schedule, day: e.target.value },
                })
              }
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>
        <SheetFooter>
          <Button type="button" onClick={addCourse} disabled={display}>
            Add Course
          </Button>
          <SheetClose asChild>
            <Button className="hidden" id="closeSlideButton">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
