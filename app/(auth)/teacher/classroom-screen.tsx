import React, { useState, useEffect, useRef } from "react";
import { SplashScreen } from "expo-router";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Classroom, StudentsView } from "../../../types/models";
import { callRpc } from "@/utils/net";
import LinearGradientButton from "@/components/LinearGradientButton";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();
const ClassroomScreen: React.FC = () => {
  const { classroomId } = useLocalSearchParams<{ classroomId: string }>();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [studentLookup, setStudentLookup] = useState<StudentsView>({});
  const [students, setStudents] = useState<any[]>([]);
  const [isSorted, setIsSorted] = useState<any>();
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../../../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../../../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    const fetchClassroomData = async () => {
      const data = await callRpc({
        id: "2",
        method: "user.get.initial",
        params: {},
      });

      console.log("<<<< CLASSROOM STUDENTS >>>>", data);

      const userOrgs = data?.result?.d?.user_orgs || [];
      const userClasses = userOrgs.flatMap((org: any) => org.org_classes);
      const fetchedClassroom =
        userClasses.find((cls: any) => cls.id === classroomId) || null;

      setClassroom(fetchedClassroom);

      const studentView: StudentsView = data?.result?.d?.students_view || {};
      const lookup = Object.keys(studentView).reduce((acc, key) => {
        acc[key] = studentView[key];
        return acc;
      }, {} as StudentsView);

      setStudentLookup(lookup);

      if (fetchedClassroom) {
        const classStudents = fetchedClassroom.students_view.map(
          (student: any) => ({
            ...student,
            ...lookup[student.studentId],
          })
        );
        setStudents(classStudents);
      }
    };

    fetchClassroomData();

    // Optional: Animated effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [classroomId]);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  // Create sortStudents.ts and add these: sort by: group, last_name, first_name, point_value, etc.

  // Sort automatically by last_name then add the button to sort by first_name

  //
  const sortStudentsByLastName = () => {
    const sortedStudents = [...students].sort((a, b) =>
      a.last_name.localeCompare(b.last_name)
    );
    setStudents(sortedStudents);
    setIsSorted(true);
  };

  const sortStudentsByFirstName = () => {
    const sortedStudents = [...students].sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
    setStudents(sortedStudents);
    setIsSorted(false);
  };

  const sortOptional = () => {
    if (isSorted) {
      sortStudentsByFirstName();
    } else {
      sortStudentsByLastName();
    }
  };

  if (!classroom) {
    return <Text>Loading Classroom...</Text>;
  }

  const increasePoints = (studentId: string) => {
    const updatedStudents = students.map((student) => {
      if (student.studentId === studentId) {
        return { ...student, points_value: (student.points_value || 0) + 1 };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const numOfCols = 3;

  // Utility function to lighten or darken a color
  const adjustColor = (color: any, amount: any) => {
    return (
      "#" +
      color
        .replace(/^#/, "")
        .replace(/../g, (color: any) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
              16
            )
          ).substr(-2)
        )
    );
  };

  // Function to generate gradient colors based on a base color
  const generateGradientColors = (baseColor: any) => {
    return [
      adjustColor(baseColor, 0), // Base color
      adjustColor(baseColor, -2),
      adjustColor(baseColor, -8),
      adjustColor(baseColor, -10), // Slightly darker
      adjustColor(baseColor, -20), // Darker
      adjustColor(baseColor, -30), // Even darker
      adjustColor(baseColor, -40), // Darker still
      adjustColor(baseColor, -50), // Darkest
    ];
  };

  const baseColor = "#F5F5F5";
  const gradientColors = generateGradientColors(baseColor);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={["#b3e5fc", "#81d4fa", "#4fc3f7"]}
          style={styles.background}
        />
        <LinearGradient
          colors={["#1976d2", "transparent"]}
          style={styles.radialBlob}
          start={[0.5, 0.5]}
          end={[0.5, 1]}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{classroom.name}</Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sortText}>Sort By</Text>
            <LinearGradientButton
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              onPress={sortOptional}
              title={isSorted ? "First Name" : "Last Name"}
            />
          </View>
        </View>
        <FlatList
          data={students}
          keyExtractor={(student) => student.studentId}
          numColumns={numOfCols}
          key={numOfCols}
          renderItem={({ item: student }) => (
            <View style={styles.studentContainer}>
              <LinearGradient
                colors={gradientColors}
                locations={[0, 0.2, 0.4, 0.6, 0.8, 0.85, 0.9, 1]}
                start={[0, 1]}
                end={[0, 0.1]}
                style={[styles.gradientTop, { zIndex: 150 }]}
              />
              <LinearGradient
                colors={gradientColors}
                locations={[0, 0.2, 0.4, 0.6, 0.8, 0.85, 0.9, 1]}
                start={[0.8, 0]}
                end={[0.1, 0]}
                style={[styles.gradientLeft, { zIndex: 150 }]}
              />
              <TapGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.END) {
                    increasePoints(student.studentId);
                  }
                }}
              >
                <View style={styles.touchable}>
                  <View style={styles.nameAndPointsContainer}>
                    <Text
                      style={[styles.studentText, styles.firstName]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {student.first_name || "Unknown"}
                    </Text>
                    <Text
                      style={[styles.studentText, styles.lastName]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {student.last_name || "Unknown"}
                    </Text>
                  </View>
                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>
                      {student.points_value || 0}
                    </Text>
                  </View>
                </View>
              </TapGestureHandler>
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
          bounces={true}
          alwaysBounceHorizontal={true}
          alwaysBounceVertical={true}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F0EF",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  radialBlob: {
    position: "absolute",
    left: "20%",
    top: "30%",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    // textDecorationLine: "underline",
    borderStyle: "solid",
    borderRadius: 6,
    borderColor: "#192f6a",
    borderWidth: 2,
    letterSpacing: 1,
    color: "black",
    textAlign: "left",
    padding: 14,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    opacity: 0.9,
    borderColor: "skyblue",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sortText: {
    color: "black",
    fontSize: 16,
    marginRight: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  studentContainer: {
    flex: 1,
    margin: 5,
    padding: 2,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  gradientLeft: {
    position: "absolute",
    top: 4,
    bottom: 0,
    left: 0,
    width: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 5,
  },
  touchable: {
    padding: 8,
    height: 65,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  nameAndPointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  studentText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  firstName: {
    fontFamily: "Poppins-Bold",
    flexShrink: 1,
  },
  lastName: {
    fontFamily: "Poppins-Bold",
    flexShrink: 1,
  },
  pointsContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 4,
    marginLeft: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2.5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "blue",
  },
});

export default ClassroomScreen;
