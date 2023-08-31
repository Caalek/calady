import AsyncStorage from "@react-native-async-storage/async-storage";
import { openDatabase } from "./openDatabase";

export default async function setDefaultSettings() {

  await AsyncStorage.setItem("settingPhrases", "10");
  await AsyncStorage.setItem("settingSeconds", "180");
  await AsyncStorage.setItem("settingShowBackButton", "1");
  await AsyncStorage.setItem("settingSoundEffects", "1");

  // wypełniane wystąpień zerami
  let instancesObject = {};
  let ids = [];
  const db = await openDatabase();
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id FROM phrases",
      [],
      async (_, results) => {
        for (result of results.rows._array) {
          ids.push(result["id"]);
        }
        for (id of ids) {
          instancesObject[id] = 0;
        }
        await AsyncStorage.setItem(
          "instances",
          JSON.stringify(instancesObject)
        );
      },
      (error) => {
        console.log("Query error:", error);
      }
    );
  });
}
