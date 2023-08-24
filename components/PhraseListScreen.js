import { openDatabase } from "../utils/openDatabase";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";

export default function PhraseListScreen() {
  const [phrases, setPhrases] = useState();
useEffect(() => {
    const getPhrases = async () => {
      const db = await openDatabase();
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM phrases",
          [],
          (_, results) => {
            setPhrases(results.rows._array);
          },
          (error) => {
            console.log("Query error:", error);
          }
        );
      });
    }
    getPhrases();
  }, []);
  console.log(phrases)
  return (
    <SafeAreaView>
      <FlatList
        data={phrases}
        renderItem={({ item }) => (
          <Text>{item.phrase}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
