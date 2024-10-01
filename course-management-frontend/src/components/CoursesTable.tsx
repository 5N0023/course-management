import { Course } from "@/app/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationFooter } from "./PaginationFooter";
import { useState } from "react";

export function CoursesTable({
  courses,
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  courses: Course[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="  md:max-w-[80%] mt-4 space-y-4">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className=" text-black">title</TableHead>
            <TableHead className="text-black">description</TableHead>
            <TableHead className="text-black">instructor</TableHead>
            <TableHead className="text-right text-black">schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow
              key={course.title}
              className={`cursor-pointer text-black ${
                index % 2 === 0 ? "bg-green-400" : "bg-green-300"
              }`}
            >
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell className="max-h-20">{course.description}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell className="text-right">{course.schedule}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
