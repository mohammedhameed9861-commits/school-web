import { Activities } from "@/views/student-life/activities";
import { Labs } from "@/views/student-life/labs";
import { Sports } from "@/views/student-life/sports";
import { Events } from "@/views/student-life/events";
import { Projects } from "@/views/student-life/projects";

/** "Student Life" chapter of the single-page site (ADR-0022) — mounted at `#student-life`. */
export const StudentLifeView = async () => {
  return (
    <>
      <Activities />
      <Labs />
      <Sports />
      <Events />
      <Projects />
    </>
  );
};
