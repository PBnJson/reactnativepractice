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
import { callRpc } from "@/utils/net";

const TeacherHomeScreen = () => {
  const [classrooms, setClassrooms] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const userData = async () => {
      const data = await callRpc({
        id: "2",
        method: "user.get.initial",
        params: {},
      });
      const userOrgs = data?.result?.d?.user_orgs || [];
      // console.log("USER ORG RPC RES>>>", userOrgs);

      const userClasses = userOrgs?.flatMap((org: any) => {
        return org.org_classes;
      });
      // console.log("USER CLASSES MAP>>>", userClasses);
      console.log("### USER MAP ###", userClasses);
      setClassrooms(userClasses);
    };
    userData();
    console.log("***USER CLASSROOMS***", classrooms);
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
