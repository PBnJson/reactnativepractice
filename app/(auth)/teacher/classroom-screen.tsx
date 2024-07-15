import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  TextProps,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { classroomsMap } from "../../../utils/dataUtils";
import mockData from "../../../DATA/mock_teacher.json";
import { Classroom, StudentsView } from "../../../types/models"; // Adjust path as necessary

const ClassroomScreen: React.FC = () => {
  const { classroomId } = useLocalSearchParams<{ classroomId: string }>();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [studentLookup, setStudentLookup] = useState<StudentsView>({});

  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    if (classroomId) {
      const fetchedClassroom = classroomsMap.get(classroomId);
      setClassroom(fetchedClassroom);

      const studentView: StudentsView = mockData.d.students_view;
      const lookup = Object.keys(studentView).reduce((acc, key) => {
        acc[key] = studentView[key];
        return acc;
      }, {} as StudentsView);
      setStudentLookup(lookup);
    }
  }, [classroomId]);

  if (!classroom) {
    return <Text>Loading...</Text>;
  }

  const increasePoints = (studentId: string) => {
    const updatedStudents = new Set(
      Array.from(classroom.students).map((student) => {
        if (student.studentId === studentId) {
          return { ...student, points_value: (student.points_value || 0) + 1 };
        }
        return student;
      })
    );

    const updatedClassroom = { ...classroom, students: updatedStudents };
    setClassroom(updatedClassroom);
    classroomsMap.set(classroomId, updatedClassroom);
  };

  const studentsArray = Array.from(classroom.students);
  const numOfCols = 3;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.title}>{classroom.name}</Text>
      </Animated.View>
      <FlatList
        data={studentsArray}
        keyExtractor={(student) => student.studentId}
        numColumns={numOfCols}
        key={numOfCols}
        renderItem={({ item: student }) => (
          <View style={styles.student}>
            <Pressable
              onPress={() => increasePoints(student.studentId)}
              style={styles.touchable}
              android_ripple={{
                color: "red",
                radius: 35,
                borderless: false,
                foreground: true,
              }}
            >
              <Text style={styles.studentText}>
                {`${
                  studentLookup[student.studentId]?.first_name || "Unknown"
                } ${studentLookup[student.studentId]?.last_name || "Unknown"}`}
              </Text>
              <Text style={styles.pointsText}>
                Points: {student.points_value || 0}
              </Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={styles.scrollContainer}
        bounces={true}
        alwaysBounceHorizontal={true}
        alwaysBounceVertical={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#161622",
  },
  title: {
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 5,
    color: "lime",
    textAlign: "center",
    marginVertical: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  student: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    padding: 10,
  },
  studentText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pointsText: {
    fontSize: 12,
  },
});

export default ClassroomScreen;
