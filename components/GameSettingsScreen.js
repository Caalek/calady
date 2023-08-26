import { useEffect, useState } from "react";
import Counter from "./Counter";
import MinuteCounter from "./MinuteCounter";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import * as StatusBar from "expo-status-bar";
import images from "../utils/images";
import Button from "./Button";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameSettingsScreen({ route, navigation }) {
  const { gameTitle, categoryId, imageFilename } = route.params;
  const [numOfPhrases, setNumOfPhrases] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    async function updateStorage() {
      await AsyncStorage.setItem("settingPhrases", numOfPhrases.toString())
    }
    if (!loading) updateStorage();
  }, [numOfPhrases]);

  useEffect(() => {
    async function updateStorage() {
      await AsyncStorage.setItem("settingSeconds", timeSeconds.toString())
    }
    if (!loading) updateStorage();
  }, [timeSeconds]);

  useEffect(() => {
    async function setData() {
      const phrases = parseInt(await AsyncStorage.getItem("settingPhrases"))
      const seconds = parseInt(await AsyncStorage.getItem("settingSeconds"))

      //ładowanie ustawień

      const showBackButton = parseInt(await AsyncStorage.getItem("settingShowBackButton"))
      setShowBackButton(showBackButton)

      const soundEffects = parseInt(await AsyncStorage.getItem("settingSoundEffects"))
      setSoundEffects(soundEffects)


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
        <View style={styles.playButtonContainer}>
        <Button
          style={styles.button}
          text={"Rozpocznij grę"}
          color="#52A9FF"
          onPress={() =>
            navigation.navigate("GameScreen", {
              numOfPhrases: numOfPhrases,
              categoryId: categoryId,
              categoryName: gameTitle,
              totalTimeSeconds: timeSeconds,
              showBackButton: showBackButton,
              soundEffects: soundEffects,
              imageFilename: imageFilename
            })
          }
        />
        </View>
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
  },
  playButtonContainer: {
    width: "70%",
    height: "13%"
  }
});
