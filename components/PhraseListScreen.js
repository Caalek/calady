import { openDatabase } from "../utils/openDatabase";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";

export default function PhraseListScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const [phrases, setPhrases] = useState();
  useEffect(() => {
    const getPhrases = async () => {
      const db = await openDatabase();
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM phrases WHERE category_id = ?",
          [categoryId],
          (_, results) => {
            setPhrases(results.rows._array);
          },
          (error) => {
            console.log("Query error:", error);
          }
        );
      });
    };
    getPhrases();
  }, []);
  return (
    <View style={styles.listContainer}>
      <SafeAreaView>
        <FlatList
          data={phrases}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>
                {item.id - phrases[0].id + 1}. {item.phrase}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  listText: {
    fontSize: 20,
    fontFamily: "Inter",
  },
  listItem: {},
});
