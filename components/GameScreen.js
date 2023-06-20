import { View, Text, StyleSheet, Button, BackHandler, Pressable } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { Gyroscope } from 'expo-sensors';
import InfoText from "./InfoText";

export default function GameScreen({ route, navigation }) {
    // const {numOfPhrases, categoryId, totalTimeSeconds} = route.params
    const numOfPhrases = 10
    const totalTimeSeconds = 120
    const [remainingTime, setRemainingTime] = useState(totalTimeSeconds)
    const [countDownTimer, setCountdownTimer] = useState(2)
    const [gameStarted, setGameStarted] = useState(false)
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
    const [gameArray, setGameArray] = useState([])
    const [previousY, setPreviousY] = useState(0)

    const [skipped, setSkipped] = useState(0)
    const [confirmed, setConfirmed] = useState(0)

    const [viewAnswerConfirm, setViewAnswerConfirm] = useState(false)
    const [viewAnswerSkip, setViewAnswerSkip] = useState(false)

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);
    const _fast = () => Gyroscope.setUpdateInterval(550);

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setData(gyroscopeData);
                setPreviousY(gyroscopeData.y)
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        _fast()
        return () => _unsubscribe();
    }, []);

    useEffect(() => {
        let difference = Math.abs(y - previousY)
        if (difference > 6 && !viewAnswerSkip) {
            confirm()
        }
    }, [y])

    let ALL = [
        { title: "Sweet Child o' Mine - Guns N' Roses" },
        { title: "Billie Jean - Michael Jackson" },
        { title: "Every Breath You Take - The Police" },
        { title: "Like a Virgin - Madonna" },
        { title: "Livin' on a Prayer - Bon Jovi" },
        { title: "Another One Bites the Dust - Queen" },
        { title: "Eye of the Tiger - Survivor" },
        { title: "Walk Like an Egyptian - The Bangles" },
        { title: "Sweet Dreams (Are Made of This) - Eurythmics" },
        { title: "Take on Me - a-ha" },
        { title: "Don't Stop Believin' - Journey" },
        { title: "I Wanna Dance with Somebody - Whitney Houston" },
        { title: "Girls Just Want to Have Fun - Cyndi Lauper" },
        { title: "Pour Some Sugar on Me - Def Leppard" },
        { title: "Beat It - Michael Jackson" },
        { title: "Every Rose Has Its Thorn - Poison" },
        { title: "With or Without You - U2" },
        { title: "Time After Time - Cyndi Lauper" },
        { title: "Like a Prayer - Madonna" },
        { title: "I Love Rock 'n' Roll - Joan Jett & The Blackhearts" },
        { title: "Sweet Child o' Mine - Guns N' Roses" },
        { title: "Billie Jean - Michael Jackson" },
        { title: "Every Breath You Take - The Police" },
        { title: "Like a Virgin - Madonna" },
        { title: "Livin' on a Prayer - Bon Jovi" },
        { title: "Another One Bites the Dust - Queen" },
        { title: "Eye of the Tiger - Survivor" },
        { title: "Walk Like an Egyptian - The Bangles" },
        { title: "Sweet Dreams (Are Made of This) - Eurythmics" },
        { title: "Take on Me - a-ha" },
        { title: "Don't Stop Believin' - Journey" },
        { title: "I Wanna Dance with Somebody - Whitney Houston" },
        { title: "Girls Just Want to Have Fun - Cyndi Lauper" },
        { title: "Pour Some Sugar on Me - Def Leppard" },
        { title: "Beat It - Michael Jackson" },
        { title: "Every Rose Has Its Thorn - Poison" },
        { title: "With or Without You - U2" },
        { title: "Time After Time - Cyndi Lauper" },
        { title: "Like a Prayer - Madonna" },
        { title: "I Love Rock 'n' Roll - Joan Jett & The Blackhearts" },
        { title: "When Doves Cry - Prince" },
        { title: "The Final Countdown - Europe" },
        { title: "Careless Whisper - George Michael" },
        { title: "Wake Me Up Before You Go-Go - Wham!" },
        { title: "Footloose - Kenny Loggins" },
        { title: "Don't You (Forget About Me) - Simple Minds" },
        { title: "We Will Rock You - Queen" },
        { title: "Ghostbusters - Ray Parker Jr." },
        { title: "Hungry Like the Wolf - Duran Duran" },
        { title: "Every Little Thing She Does Is Magic - The Police" },
        { title: "Total Eclipse of the Heart - Bonnie Tyler" },
        { title: "Thriller - Michael Jackson" },
        { title: "Material Girl - Madonna" },
        { title: "I Just Called to Say I Love You - Stevie Wonder" },
        { title: "Jump - Van Halen" },
        { title: "Africa - Toto" },
        { title: "The Power of Love - Huey Lewis and the News" },
        { title: "Karma Chameleon - Culture Club" },
        { title: "Sweet Child - Simply Red" },
        { title: "I Want to Know What Love Is - Foreigner" },
        { title: "Take My Breath Away - Berlin" },
        { title: "We Don't Talk Anymore - Cliff Richard" },
        { title: "I'm Still Standing - Elton John" },
        { title: "Don't Stop 'Til You Get Enough - Michael Jackson" },
        { title: "Papa Don't Preach - Madonna" },
        { title: "Uptown Girl - Billy Joel" },
        { title: "It's Raining Men - The Weather Girls" },
        { title: "You Give Love a Bad Name - Bon Jovi" }
    ];


    function createGameArray() {
        let i
        let gameArray = []
        for (i = 0; i < numOfPhrases; i++) {
            const randomItem = ALL[Math.floor(Math.random() * ALL.length)]
            ALL = ALL.filter(item => item !== randomItem)
            gameArray.push(randomItem)
        }
        setGameArray(gameArray)
    }

    function finishGame() {
        navigation.navigate("GameFinishScreen", { confirmed: confirmed, skipped: skipped })
    }

    function pass() {
        if (currentPhraseIndex + 1 === gameArray.length) {
            finishGame()
        } else {
            setCurrentPhraseIndex(currentPhraseIndex + 1)
            setSkipped(skipped + 1)
            setViewAnswerSkip(true)
            setTimeout(setViewAnswerSkip, 2000, false)
        }
    }

    function confirm() {
        if (currentPhraseIndex + 1 === gameArray.length) {
            finishGame()
        } else {
            setCurrentPhraseIndex(currentPhraseIndex + 1)
            setConfirmed(confirmed + 1)
            setViewAnswerConfirm(true)
            setTimeout(setViewAnswerConfirm, 2000, false)
        }
    }

    useEffect(() => {
        async function lockLandscapeOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
        }
        lockLandscapeOrientation()
    }, [])

    useEffect(() => {
        if (countDownTimer > 0) {
            const timer = setInterval(() => {
                setCountdownTimer(countDownTimer - 1)
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        } else if (countDownTimer == 0) {
            createGameArray()
            setGameStarted(true)
        }
    }, [countDownTimer])

    console.log(confirmed)

    return (
        <View style={styles.container}>
            {!gameStarted &&
                <>
                    <Text style={styles.text}>Przygotuj się...</Text>
                    <Text style={styles.text}>{countDownTimer}</Text></>}
            {gameStarted && !viewAnswerSkip && !viewAnswerConfirm &&
                <Pressable onPress={pass} style={styles.container}>
                    <Timer parentStyles={styles.timer} startTimeSeconds={remainingTime} onFinish={finishGame} changeTime={setRemainingTime}></Timer>
                    <Text style={styles.text}>{gameArray[currentPhraseIndex].title}</Text>
                    <Text style={styles.categoryName}>Muzyka lat 80.</Text>
                </Pressable>
            }
            {viewAnswerSkip && <InfoText text="PASUJĘ" color="red"></InfoText>}
            {viewAnswerConfirm && <InfoText text="DOBRZE" color="green"></InfoText>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#52a9ff"
    },
    text: {
        fontSize: 35,
        fontFamily: "TitanOne",
        color: "white"

    },
    timer: {
        position: "absolute",
        top: 0,
        marginTop: "5%"
    },
    categoryName: {
        bottom: 0,
        position: "absolute",
        marginBottom: "5%",
        color: "white",
        fontFamily: "TitanOne",
        fontSize: 15
    }
})