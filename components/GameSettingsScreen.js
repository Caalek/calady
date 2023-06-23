import { useEffect, useState } from "react";
import Counter from "./Counter";
import MinuteCounter from "./MinuteCounter";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "./CustomButton";
import images from "../utils/images";
import settings from '../utils/settings';

export default function GameSettingsScreen({ route, navigation }) {

  const { gameTitle, categoryId, imageFilename } = route.params;
  const [numOfPhrases, setNumOfPhrases] = useState(0)
  const [timeSeconds, setTimeSeconds] = useState(0)
  const [loading, setLoading] = useState(true)

  console.log(numOfPhrases, timeSeconds)

  useEffect(() => {
    async function syncDB() {
      await settings.setNumber("settingNumPhrases", numOfPhrases)
    } 
    if (!loading) syncDB()
    console.log("syncdb num")
    }, [numOfPhrases])

  useEffect(() => {
    async function syncDB() {
      await settings.setNumber("settingTimeSeconds", timeSeconds)
    }
    if(!loading) syncDB()
    console.log("syncdb time")
    }, [timeSeconds])

  useEffect(() => {
    async function setData () {
      const phrases = await settings.getNumber("settingNumPhrases")
      const seconds = await settings.getNumber("settingTimeSeconds")
      setNumOfPhrases(phrases)
      setTimeSeconds(seconds)
      setLoading(false)
    }
    setData()
  }, [])

  if (!loading) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gameTitle}</Text>
      <Image
        resizeMode="contain"
        style={{ height: 200 }}
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
        <Text style={styles.info}>
          W trakcie gry, jeśli nie uda ci się zgadnąć, kliknij w ekran. Jeśli
          zgadłeś, pochyl urządzenie do przodu.
        </Text>
      </View>
      <CustomButton
        style={styles.button}
        title={"Rozpocznij grę"}
        onPress={() =>
          navigation.navigate("GameScreen", {
            numOfPhrases: numOfPhrases,
            categoryId: categoryId,
            categoryName: gameTitle,
            totalTimeSeconds: totalTimeSeconds,
          })
        }
      />
    </View>
  )}
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
    marginBottom: "20%",
  },
  info: {
    padding: "3%",
    fontSize: 17,
    fontFamily: "TitanOne",
    // color: "white"
  }
});
