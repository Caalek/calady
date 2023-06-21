import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Timer({ parentStyles, startTimeSeconds, onFinish, changeTime }) {
    const [timeSeconds, setTimeSeconds] = useState(startTimeSeconds)

    useEffect(() => {
        if (timeSeconds > 0) {
            const timer = setInterval(() => {
                setTimeSeconds(timeSeconds - 1)
                changeTime(timeSeconds - 1)
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        } else {
            onFinish()
        }
    }, [timeSeconds])


    function getMinutes() {
        return Math.floor(timeSeconds / 60)
    }

    function zfill(n) {
        if (n < 10) {
            return "0" + n
        } else {
            return n
        }
    }

    return (
        <View style={parentStyles}>
            <Text style={styles.time}>{getMinutes()}:{zfill(timeSeconds - getMinutes() * 60)}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    time: {
        fontSize: 25,
        fontFamily: "TitanOne",
        color: "white"
    }
})