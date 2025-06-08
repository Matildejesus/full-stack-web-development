type CourseApplication = {
  course: { name: string };
  role: string;
};

type CandidateWithApplications = {
  user: {
    id: number;
    email: string;
    firstName: string;
  };
  applications: CourseApplication[];
};

type CourseStats = {
  course: string;
  most: number;
  least: number;
  not: number;
};

export function getCourseStats(
  mostChosen: CandidateWithApplications[],
  leastChosen: CandidateWithApplications[],
  notChosen: CandidateWithApplications[]
): CourseStats[] {
  const courseMap = new Map<string, CourseStats>();

  const countApplications = (
    group: CandidateWithApplications[],
    label: keyof Pick<CourseStats, 'most' | 'least' | 'not'>
  ) => {
    group.forEach(({ applications }) => {
      applications.forEach((app) => {
        const name = app.course.name;
        if (!courseMap.has(name)) {
          courseMap.set(name, { course: name, most: 0, least: 0, not: 0 });
        }
        courseMap.get(name)![label]++;
      });
    });
  };

  countApplications(mostChosen, "most");
  countApplications(leastChosen, "least");
  countApplications(notChosen, "not");

  return Array.from(courseMap.values());
}
