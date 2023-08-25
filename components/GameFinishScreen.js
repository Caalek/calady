import { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Button from "./Button";
import * as ScreenOrientation from "expo-screen-orientation";

export default function GameFinishScreen({ route, navigation }) {
  const { confirmed, skipped, gameTitle, categoryId, imageFilename } =
    route.params;

  useEffect(() => {
    async function lockLandscapeOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    lockLandscapeOrientation();
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Text style={styles.title}>Gra ukończona!</Text>
        <Text style={styles.big}>{confirmed}</Text>
        <Text style={styles.text}>odgadniętych haseł</Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Jeszcze raz"
            color="#1f90ff"
            onPress={() =>
              navigation.navigate("GameSettings", {
                gameTitle: gameTitle,
                categoryId: categoryId,
                imageFilename: imageFilename,
              })
            }
          ></Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 7,
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
  buttonContainer: {
    height: "12%",
    width: "60%",
  },
});
