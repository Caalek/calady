import { View, Text, StyleSheet, Button } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from "react";

export default function GameScreen({route, navigation}) {
    // const {numOfPhrases, categoryId, totalTimeSeconds} = route.params
    const [remainingTime, setRemainingTime] = useState()
    


    useEffect(() => {
        async function lockLandscapeOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
        }
        lockLandscapeOrientation()
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: 40

        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Text</Text>
        </View>
    )
}