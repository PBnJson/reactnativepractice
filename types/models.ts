// app/types/models.ts

export interface Student {
  id: string;
  studentId: string;
  first_name: string;
  last_name: string;
  points_goal: number;
  points_value: number;
  classroomId: string;
}

export interface Classroom {
  id: string;
  name: string;
  grade_level: string;
  staff: {
    accountId: string;
    createdAt: object;
    first_name: string;
    id: string;
    last_name: string;
    username: string | null;
  }[];
  students: Set<Student>;
}

export interface StudentsView {
  [key: string]: {
    id: string;
    first_name: string;
    last_name: string;
    picture_url: string | null;
    school_id: string | null;
    school_picture_url: string | null;
    store_key_hash: string;
    reward_events: any[];
    guardians: any[];
    student_groups: any[];
    student_classes: any[];
  };
}
