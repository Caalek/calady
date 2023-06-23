import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import * as ScreenOrientation from "expo-screen-orientation";

export default function GameFinishScreen({ route, navigation }) {
  const { confirmed, skipped } = route.params;

  useEffect(() => {
    async function lockLandscapeOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    lockLandscapeOrientation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gra ukończona</Text>
      <Text style={styles.big}>{confirmed}</Text>
      <Text style={styles.text}>odgadniętych haseł</Text>
      <CustomButton
        title="Jeszcze raz"
        onPress={() => navigation.navigate("Home")}
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#52a9ff",
  },
  title: {
    fontFamily: "TitanOne",
    color: "white",
    fontSize: 40,
  },
  big: {
    fontFamily: "TitanOne",
    fontSize: 60,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "TitanOne",
  },
});
