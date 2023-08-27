import { Text, StyleSheet, Pressable, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import InfoText from "./InfoText";
import { openDatabase } from "../utils/openDatabase";
import * as StatusBar from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import Button from "./Button";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GameScreen({ route, navigation }) {
  const {
    numOfPhrases,
    categoryId,
    categoryName,
    totalTimeSeconds,
    showBackButton,
    imageFilename,
    soundEffects,
  } = route.params;
  const [remainingTime, setRemainingTime] = useState(totalTimeSeconds);
  const [countDownTimer, setCountdownTimer] = useState(5);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [gameArray, setGameArray] = useState([]);

  const [skipped, setSkipped] = useState(0);
  const [confirmed, setConfirmed] = useState(0);

  const [viewAnswerConfirm, setViewAnswerConfirm] = useState(false);
  const [viewAnswerSkip, setViewAnswerSkip] = useState(false);
  const [viewTimeUp, setViewTimeUp] = useState(false);

  const [sound, setSound] = useState();

  const focused = useIsFocused();

  const [gameStarted, setGameStarted] = useState(false);

  const checkIfNoMinimum = (list) => {
    let i;
    let firstItem = list[0];
    for (i = 0; i < list.length; i++) {
      if (list[i] !== firstItem) {
        return false;
      }
    }
    return true;
  };

  const findMinimum = (list) => {
    let minimum = 999999;
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] < minimum) {
        minimum = list[i];
      }
    }
    return minimum;
  };

  const createGameArray = async () => {
    const db = await openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM phrases WHERE category_id = ? ",
        [categoryId],
        async (_, results) => {
          let instances = JSON.parse(await AsyncStorage.getItem("instances"));
          let phrasesInCategoryIds = [];
          for (result of results.rows._array) {
            phrasesInCategoryIds.push(result.id);
          }

          let instanceNumbers = []; // lista wystąpień każdego id
          for (const [key, value] of Object.entries(instances)) {
            // fitrowanie do kategorii
            if (phrasesInCategoryIds.includes(parseInt(key))) {
              instanceNumbers.push(value);
            }
          }
          const allTheSame = checkIfNoMinimum(instanceNumbers);
          const commonMinimum = findMinimum(instanceNumbers);

          let allPhrases = [];

          for (let item of results.rows._array) {
            if (instances[item.id.toString()] === commonMinimum || allTheSame) {
              allPhrases.push(item);
            }
          }
          let gameArray = [];
          let minimum = commonMinimum;
          while (gameArray.length !== numOfPhrases) {
            const randomItem =
              allPhrases[Math.floor(Math.random() * allPhrases.length)]; // losowy item
            allPhrases = allPhrases.filter((item) => item !== randomItem); // usuwamy go z ogólnej puli
            gameArray.push(randomItem); // dodajemy do gry
            // instances[randomItem.id.toString()] += 1 // ustawiamy, że wystąpił
            if (allPhrases.length === 0) {
              // jeśli się wyczerpią te o najmniejszej liczbie wystąpień, dodajemy większe
              minimum += 1;
              for (let item of results.rows._array) {
                if (instances[item.id.toString()] === minimum) {
                  allPhrases.push(item);
                }
              }
            }
          }
          setGameArray(gameArray);
          setGameStarted(true);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };
  const finishGame = () => {
    // if (soundEffects) {
    //   playFinishSound()
    // }
    navigation.navigate("GameFinishScreen", {
      confirmed: confirmed,
      skipped: skipped,
      gameTitle: categoryName,
      categoryId: categoryId,
      imageFilename: imageFilename,
    });
  };

  const timeUp = () => {
    setViewTimeUp(true);
    setTimeout(setViewTimeUp, 2000, false);
    setTimeout(finishGame, 2001);
  };

  const skipAnswer = () => {
    markCurrentItemAsUsed();
    if (currentPhraseIndex + 1 === gameArray.length) {
      finishGame();
    } else {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setSkipped(skipped + 1);
      setViewAnswerSkip(true);
      setTimeout(setViewAnswerSkip, 3000, false);
      if (soundEffects) {
        playSkipSound();
      }
    }
  };

  // tu się funkcje powtarzają, bo, znowu, require() nie przyjmuje
  // dynamicznych stringów i nie mogę dać jako zmiennej do funkcji
  const playConfirmSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/confirm.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const playSkipSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/skip.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const markCurrentItemAsUsed = async () => {
    let instances = JSON.parse(await AsyncStorage.getItem("instances"));
    instances[gameArray[currentPhraseIndex].id.toString()] += 1;
    await AsyncStorage.setItem("instances", JSON.stringify(instances));
  };

  const confirmAnswer = async () => {
    markCurrentItemAsUsed();
    if (currentPhraseIndex + 1 === gameArray.length) {
      finishGame();
    } else {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setConfirmed(confirmed + 1);
      setViewAnswerConfirm(true);
      setTimeout(setViewAnswerConfirm, 3000, false);
      if (soundEffects) {
        playConfirmSound();
      }
    }
  };

  const exitToCategory = () => {
    navigation.navigate("GameSettings", {
      skipped: skipped,
      gameTitle: categoryName,
      categoryId: categoryId,
      imageFilename: imageFilename,
    });
  };

  useEffect(() => {
    async function lockLandscapeOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
    lockLandscapeOrientation();
  }, [focused]);

  useEffect(() => {
    if (countDownTimer > 0) {
      const timer = setInterval(() => {
        setCountdownTimer(countDownTimer - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (countDownTimer == 0) {
      createGameArray();
    }
  }, [countDownTimer]);

  useEffect(() => {
    StatusBar.setStatusBarHidden(true);
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <>
      <View style={styles.container}>
        {!gameStarted && (
          <>
            <Text style={styles.text}>Przygotuj się...</Text>
            <Text style={styles.text}>{countDownTimer}</Text>
          </>
        )}
        {gameStarted &&
          !viewAnswerSkip &&
          !viewAnswerConfirm &&
          !viewTimeUp && (
            <View style={styles.gameContainer}>
              {showBackButton ? (
                <Pressable style={styles.exitButton} onPress={exitToCategory}>
                  <Text style={styles.exitText}>Wyjdź</Text>
                </Pressable>
              ) : null}
              <Timer
                parentStyles={styles.timer}
                startTimeSeconds={remainingTime}
                onFinish={timeUp}
                changeTime={setRemainingTime}
              ></Timer>
              <View style={styles.titleContainer}>
                <Text style={styles.text}>
                  {gameArray[currentPhraseIndex].phrase}
                </Text>
              </View>
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <Button color="red" text="PAS" onPress={skipAnswer}></Button>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    color="green"
                    text="DOBRZE"
                    onPress={confirmAnswer}
                  ></Button>
                </View>
              </View>
            </View>
          )}
        {viewAnswerSkip && <InfoText text="PAS" color="red"></InfoText>}
        {viewAnswerConfirm && <InfoText text="DOBRZE" color="green"></InfoText>}
        {viewTimeUp && <InfoText text="KONIEC CZASU" color="orange"></InfoText>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#52a9ff",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 38,
    fontFamily: "TitanOne",
    color: "white",
  },
  timer: {
    // position: "absolute",
    top: 0,
    marginTop: "5%",
  },
  categoryName: {
    bottom: 0,
    position: "absolute",
    marginBottom: "5%",
    color: "white",
    fontFamily: "TitanOne",
    fontSize: 25,
  },
  exitButton: {
    top: 0,
    left: 0,
    position: "absolute",
    width: "10%",
    margin: "5%",
  },
  exitText: {
    fontFamily: "TitanOne",
    color: "white",
    fontSize: 23,
  },
  gameContainer: {
    flex: 1,
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    gap: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    height: "85%",
    width: "40%",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
