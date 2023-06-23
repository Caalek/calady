import { Text, StyleSheet, Pressable } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Gyroscope } from "expo-sensors";
import InfoText from "./InfoText";
import { openDatabase } from "../utils/openDatabase";
import * as StatusBar from "expo-status-bar";

export default function GameScreen({ route, navigation }) {
  const { numOfPhrases, categoryId, categoryName, totalTimeSeconds } =
    route.params;
  const [remainingTime, setRemainingTime] = useState(totalTimeSeconds);
  const [countDownTimer, setCountdownTimer] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [gameArray, setGameArray] = useState([]);
  const [previousY, setPreviousY] = useState(0);

  const [skipped, setSkipped] = useState(0);
  const [confirmed, setConfirmed] = useState(0);

  const [viewAnswerConfirm, setViewAnswerConfirm] = useState(false);
  const [viewAnswerSkip, setViewAnswerSkip] = useState(false);
  const [viewTimeUp, setViewTimeUp] = useState(false);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const subscribeToGyroscope = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
        setPreviousY(gyroscopeData.y);
      })
    );
  };

  const unsubscribeFromGyroscope = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const createGameArray = async () => {
    let allPhrases = [];
    const db = await openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT phrase FROM phrases WHERE category_id = ? ",
        [categoryId],
        (_, results) => {
          for (let item of results.rows._array) {
            allPhrases.push(item.phrase);
          }
          let i;
          let gameArray = [];
          for (i = 0; i < numOfPhrases; i++) {
            const randomItem =
              allPhrases[Math.floor(Math.random() * allPhrases.length)];
            allPhrases = allPhrases.filter((item) => item !== randomItem);
            gameArray.push(randomItem);
          }
          setGameArray(gameArray);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };

  const finishGame = () => {
    navigation.navigate("GameFinishScreen", {
      confirmed: confirmed,
      skipped: skipped,
    });
  };

  const timeUp = () => {
    setViewTimeUp(true);
    setTimeout(setViewTimeUp, 2000, false);
    setTimeout(finishGame, 2001);
  };

  const skipAnswer = () => {
    if (currentPhraseIndex + 1 === gameArray.length) {
      finishGame();
    } else {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setSkipped(skipped + 1);
      setViewAnswerSkip(true);
      setTimeout(setViewAnswerSkip, 2000, false);
    }
  };

  const confirmAnswer = () => {
    if (currentPhraseIndex + 1 === gameArray.length) {
      finishGame();
    } else {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setConfirmed(confirmed + 1);
      setViewAnswerConfirm(true);
      setTimeout(setViewAnswerConfirm, 2000, false);
    }
  };

  useEffect(() => {
    async function lockLandscapeOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
    lockLandscapeOrientation();
  }, []);

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
      setGameStarted(true);
    }
  }, [countDownTimer]);

  useEffect(() => {
    subscribeToGyroscope();
    Gyroscope.setUpdateInterval(550);
    return () => unsubscribeFromGyroscope();
  }, []);

  useEffect(() => {
    let difference = Math.abs(y - previousY);
    if (difference > 6 && !viewAnswerSkip) {
      confirmAnswer();
    }
  }, [y]);

  useEffect(() => {
    StatusBar.setStatusBarHidden(true);
  }, []);

  return (
    <>
      {gameStarted && (
        <Pressable
          style={styles.exitButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.exitButton}>Wyjdź</Text>
        </Pressable>
      )}
      <Pressable onPress={skipAnswer} style={styles.container}>
        <Pressable
          style={styles.exitButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.exitText}>Wyjdź</Text>
        </Pressable>
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
            <>
              <Timer
                parentStyles={styles.timer}
                startTimeSeconds={remainingTime}
                onFinish={timeUp}
                changeTime={setRemainingTime}
              ></Timer>
              <Text style={styles.text}>{gameArray[currentPhraseIndex]}</Text>
              <Text style={styles.categoryName}>{categoryName}</Text>
            </>
          )}
        {viewAnswerSkip && <InfoText text="PASUJĘ" color="red"></InfoText>}
        {viewAnswerConfirm && <InfoText text="DOBRZE" color="green"></InfoText>}
        {viewTimeUp && <InfoText text="KONIEC CZASU" color="orange"></InfoText>}
      </Pressable>
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
    fontSize: 35,
    fontFamily: "TitanOne",
    color: "white",
  },
  timer: {
    position: "absolute",
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
    margin: "5%",
  },
  exitText: {
    fontFamily: "TitanOne",
    color: "white",
    fontSize: 20,
  },
});
