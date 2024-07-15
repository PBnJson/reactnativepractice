// utils/dataUtils.ts
import mockTeacher from "../DATA/mock_teacher.json";

const initializeData = () => {
  const userOrg = mockTeacher.d.user_orgs[0];
  const classroomsMap = new Map();

  userOrg.org_classes.forEach((classroom) => {
    const studentsSet = new Set(
      classroom.students_view.map((student) => ({
        ...student,
        points_value: 0, // Initialize points
      }))
    );
    classroomsMap.set(classroom.id, {
      ...classroom,
      students: studentsSet,
    });
  });

  return classroomsMap;
};

export const classroomsMap = initializeData();
