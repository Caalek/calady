import { useEffect, useState } from "react";
import Counter from "./Counter";
import MinuteCounter from "./MinuteCounter";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import * as StatusBar from "expo-status-bar";
import CustomButton from "./CustomButton";
import images from "../utils/images";
import settings from "../utils/settings";
import Button from "./Button";
import { useIsFocused } from "@react-navigation/native";

export default function GameSettingsScreen({ route, navigation }) {
  const { gameTitle, categoryId, imageFilename } = route.params;
  const [numOfPhrases, setNumOfPhrases] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExit, setShowExit] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function syncDB() {
      await settings.setNumber("settingNumPhrases", numOfPhrases);
    }
    if (!loading) syncDB();
  }, [numOfPhrases]);

  useEffect(() => {
    async function syncDB() {
      await settings.setNumber("settingTimeSeconds", timeSeconds);
    }
    if (!loading) syncDB();
  }, [timeSeconds]);

  useEffect(() => {
    async function setData() {
      const phrases = await settings.getNumber("settingNumPhrases");
      const seconds = await settings.getNumber("settingTimeSeconds");
      const show = await settings.getNumber("settingShowBackButtonGame");
      if (show === 1) {
        setShowExit(true);
      } else {
        setShowExit(false);
      }
      setNumOfPhrases(phrases);
      setTimeSeconds(seconds);
      setLoading(false);
    }
    setData();
  }, []);

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

  function navigateToPhraseList() {
    navigation.navigate("PhraseListScreen", {categoryId: categoryId})
  }

  if (!loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{gameTitle}</Text>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={images[imageFilename]}
        ></Image>
        <View style={styles.settings}>
          <Text style={styles.subtitle}>Ilość wyrażeń</Text>
          <Counter
            defaultValue={numOfPhrases}
            onValueChange={setNumOfPhrases}
            valueDifference={1}
          />
          <Text style={styles.subtitle}>Czas</Text>
          <MinuteCounter
            defaultValue={timeSeconds}
            onValueChange={setTimeSeconds}
            valueDifference={10}
          />
        </View>
        <CustomButton
          style={styles.button}
          title={"Rozpocznij grę"}
          onPress={() =>
            navigation.navigate("GameScreen", {
              numOfPhrases: numOfPhrases,
              categoryId: categoryId,
              categoryName: gameTitle,
              totalTimeSeconds: timeSeconds,
              showExit: showExit,
              imageFilename: imageFilename
            })
          }
        />
        <View style={styles.buttonContainer}>
          <Button
            text="Zobacz hasła"
            color="#52A9FF"
            overrideFontSize={20}
            onPress={navigateToPhraseList}
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: "10%",
    padding: "3%",
    fontSize: 33,
    fontFamily: "TitanOne",
    // color: "white"
  },
  subtitle: {
    fontSize: 25,
    fontFamily: "TitanOne",
    // color: "white"
  },
  settings: {
    alignItems: "center",
    marginTop: "10%",
    color: "white",
  },
  button: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  image: {
    height: 200,
  },
  buttonContainer: {
    height: "9%",
    width: "50%"
  }
});
