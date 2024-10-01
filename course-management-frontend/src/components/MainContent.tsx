"use client";
import { PaginationFooter } from "@/components/PaginationFooter";
import { SearchBar } from "@/components/SearchBar";
import React, { use, useEffect, useState } from "react";
import { CoursesTable } from "./CoursesTable";
import { Course } from "@/app/types/types";
const tmpCourses = [
  {
    title: "Open-architected bandwidth-monitored contingency",
    description:
      "Theory president share Republican soon figure. She skill his as bit raise. Bring notice every big onto institution behind listen. Character will way old.",
    instructor: "Beth Williamson",
    schedule: "Tuesday 10:00",
  },
  {
    title: "Self-enabling analyzing neural-net",
    description: "Wear people item over. Direction watch rock and.",
    instructor: "Hannah Ward",
    schedule: "Thursday 13:00",
  },
  {
    title: "Operative high-level hierarchy",
    description:
      "Policy certainly music strategy do up effort. Camera its down growth hundred gas.",
    instructor: "Regina Ford",
    schedule: "Wednesday 13:00",
  },
  {
    title: "Digitized systematic strategy",
    description:
      "Next life cover help teach generation she. Late apply town crime consumer.",
    instructor: "Michael Meyers Jr.",
    schedule: "Thursday 14:00",
  },
  {
    title: "Exclusive attitude-oriented open system",
    description: "Finally make health. Yeah huge process effort choose.",
    instructor: "Kimberly Hatfield",
    schedule: "Monday 14:00",
  },
  {
    title: "Function-based methodical access",
    description:
      "Possible material example night worry whole. Economy type ask. Group on little.",
    instructor: "Charles Lynn",
    schedule: "Wednesday 9:00",
  },
  {
    title: "Managed dedicated pricing structure",
    description: "Likely in eye sense trade. Budget building other hard news.",
    instructor: "Kevin Cooper",
    schedule: "Wednesday 17:00",
  },
  {
    title: "Focused content-based archive",
    description:
      "Beat agree some fact carry day. Occur none teach staff. Per heart stay.",
    instructor: "David Rice",
    schedule: "Tuesday 10:00",
  },
  {
    title: "Stand-alone 3rdgeneration database",
    description:
      "Month what base level page. Current seem class market by fly during. Join they interview onto clearly great.",
    instructor: "Anthony Haley",
    schedule: "Monday 10:00",
  },
  {
    title: "Inverse bifurcated array",
    description:
      "Land military fire issue party Congress partner. Western detail back clearly tax act. Level trial agency look top.",
    instructor: "Brian Murray",
    schedule: "Tuesday 11:00",
  },
  {
    title: "Inverse content-based neural-net",
    description:
      "Medical month without politics. Century continue remember camera source south. Remain brother until.",
    instructor: "Stuart Cross",
    schedule: "Monday 10:00",
  },
  {
    title: "Visionary executive budgetary management",
    description:
      "Season his court movie radio. Center really film realize ability. Former that myself feel prepare least.",
    instructor: "Karen Martinez",
    schedule: "Monday 11:00",
  },
  {
    title: "Triple-buffered grid-enabled knowledge user",
    description:
      "Leg build government a box sure establish. Both law bar stay various from.",
    instructor: "Lindsay Bush",
    schedule: "Monday 9:00",
  },
  {
    title: "Customer-focused coherent focus group",
    description: "Prove will chance worry stock much red.",
    instructor: "Jo Hoffman",
    schedule: "Friday 13:00",
  },
  {
    title: "Fully-configurable zero-defect customer loyalty",
    description:
      "Participant any alone change Republican mind. Leg eye evidence lay mention development understand. Week play what wish hear group sister.",
    instructor: "Rachel Cox",
    schedule: "Monday 15:00",
  },
  {
    title: "Progressive maximized middleware",
    description:
      "Vote smile court international. Man rest fast interview girl peace. Money pass go.",
    instructor: "Bonnie Johnson",
    schedule: "Wednesday 9:00",
  },
  {
    title: "Open-architected encompassing toolset",
    description:
      "Character painting require source. Age involve four trade agreement modern feeling.",
    instructor: "Jose Robinson",
    schedule: "Monday 16:00",
  },
  {
    title: "Streamlined didactic archive",
    description:
      "Mention strategy increase production us. Available produce miss guess great yet shoulder arrive. Become impact national always none ready.",
    instructor: "Bethany Mitchell",
    schedule: "Thursday 13:00",
  },
  {
    title: "Enhanced explicit success",
    description:
      "West national rock time fire else. Military hold general across real before. Both he question forget general.",
    instructor: "Brian Hendrix",
    schedule: "Friday 11:00",
  },
  {
    title: "Intuitive executive monitoring",
    description:
      "Huge art medical side forward. Up college laugh door thank bar assume. Price health decide might hope. Dinner owner month only book.",
    instructor: "Julia Sutton",
    schedule: "Friday 10:00",
  },
  {
    title: "Reverse-engineered client-driven challenge",
    description:
      "Seven each want simply rise trial table. Big maybe shake sell civil investment whose it.",
    instructor: "Joanne Taylor",
    schedule: "Thursday 13:00",
  },
  {
    title: "Monitored needs-based open architecture",
    description:
      "Give enter contain front. Already only man himself. Buy magazine report red major break free.",
    instructor: "Mrs. Tina Burch",
    schedule: "Friday 17:00",
  },
  {
    title: "Distributed fresh-thinking complexity",
    description:
      "Sure tonight police manager. Low between build yet. Speak listen particular spring my language bit. Figure recent into that economic half.",
    instructor: "Christopher Reynolds",
    schedule: "Monday 15:00",
  },
  {
    title: "Object-based cohesive project",
    description:
      "Create trade blood cover. Peace establish service heavy Republican among care. Support agreement media baby court.",
    instructor: "Beverly Boyer",
    schedule: "Monday 9:00",
  },
  {
    title: "Enterprise-wide 6thgeneration Graphic Interface",
    description:
      "Cause away least development do. Citizen PM do week scene expert.",
    instructor: "Stephanie Lopez",
    schedule: "Monday 11:00",
  },
  {
    title: "Front-line logistical extranet",
    description:
      "Early actually type. Can building name safe. Against must consumer tend involve seem provide.",
    instructor: "Melissa Gonzales",
    schedule: "Thursday 10:00",
  },
  {
    title: "Monitored impactful matrix",
    description: "Miss research TV exist consumer. Nor successful mind wonder.",
    instructor: "Kayla Garcia",
    schedule: "Tuesday 15:00",
  },
  {
    title: "Integrated context-sensitive hardware",
    description:
      "Address four we spring. News she talk response though. Product argue score deal mean opportunity foot.",
    instructor: "Christopher Reed",
    schedule: "Monday 15:00",
  },
  {
    title: "Cross-group explicit benchmark",
    description:
      "Manager stock garden article yourself its. Seven stage tree million party west. Report standard authority group authority worker. Attorney tonight nor until.",
    instructor: "Tammy Patterson",
    schedule: "Wednesday 11:00",
  },
];

export default function MainContent() {
  const [courses, setCourses] = useState([] as Course[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // each page has 10 courses
    const coursesPerPage = 10;
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    setCourses(tmpCourses.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(tmpCourses.length / coursesPerPage));
  }, [currentPage]);
  return (
    <>
      <SearchBar />
      <CoursesTable
        courses={courses}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
