import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import mockData from "../../../DATA/mock_teacher.json";

const TeacherHomeScreen = () => {
  const [classrooms, setClassrooms] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const parseData = () => {
      const userOrgs = mockData.d.user_orgs || [];
      const userClasses = userOrgs.flatMap((org: any) => org.org_classes);
      setClassrooms(userClasses);
    };
    parseData();
  }, []);

  const handlePress = (classroomId: any) => {
    router.push(`/teacher/classroom-screen?classroomId=${classroomId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          {classrooms.map((classroom: any) => (
            <TouchableOpacity
              key={classroom.id}
              style={styles.classroom}
              onPress={() => handlePress(classroom.id)}
            >
              <Text style={styles.classroomText}>{classroom.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#161622",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  classroom: {
    padding: 20,
    backgroundColor: "#FF9001",
    borderRadius: 10,
    marginVertical: 10,
  },
  classroomText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default TeacherHomeScreen;
