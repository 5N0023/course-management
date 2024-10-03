import { Course } from "@/app/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationFooter } from "./PaginationFooter";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

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
            <TableHead className="text-black">instructor</TableHead>
            <TableHead className="text-right text-black">schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <Drawer key={course.id}>
              <DrawerTrigger asChild>
                <TableRow
                  key={course.id}
                  className={`cursor-pointer text-black ${
                    index % 2 === 0 ? "bg-green-400" : "bg-green-300"
                  }`}
                >
                  <TableCell className="font-medium">
                    {course.title.length > 30
                      ? course.title.slice(0, 30) + "..."
                      : course.title}
                  </TableCell>
                  <TableCell>
                    {course.instructor.length > 30
                      ? course.instructor.slice(0, 30) + "..."
                      : course.instructor}
                  </TableCell>
                  <TableCell className="text-right">
                    {course.schedule}
                  </TableCell>
                </TableRow>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle
                    className="text-black max-w-[300px] text-black break-words whitespace-pre-wrap"
                    >{course.title.length > 30 ? course.title.slice(0, 30) + "..." : course.title}</DrawerTitle>
                    <DrawerDescription className="max-w-[300px] text-black break-words whitespace-pre-wrap"
                    >
                      {course.description}
                      </DrawerDescription>
                  </DrawerHeader>
                  
                  <DrawerFooter>
                    <span className="text-black">Instructor: {course.instructor.length > 30 ? course.instructor.slice(0, 30) + "..." : course.instructor}</span>
                    <span className="text-black">Schedule: {course.schedule}</span>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
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
