import { FlatList, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useIsFocused } from "@react-navigation/native";
import * as StatusBar from "expo-status-bar";
import MenuButton from "./MenuButton";
import CategoryButton from "./CategoryButton";
import { openDatabase } from "../utils/openDatabase";

export default function HomeScreen({ route, navigation }) {
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const lockLandscapeOrientation = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      }
      lockLandscapeOrientation();
      StatusBar.setStatusBarHidden(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const getCategories = async () => {
      const db = await openDatabase();
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM CATEGORIES",
          [],
          (_, results) => {
            setCategories(results.rows._array);
          },
          (error) => {
            console.log("Query error:", error);
          }
        );
      });
    }
    getCategories();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton
          onPress={() => navigation.navigate("SettingsScreen")}
        />
      ),
    });
  });
  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryButton
            navigation={navigation}
            title={item.name}
            categoryId={item.id}
            imageFilename={item["image_filename"]}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
