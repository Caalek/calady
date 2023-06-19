import { useState } from "react";
import Counter from "./Counter";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "./CustomButton";

export default function GameSettingsScreen({route, navigation}) {
    const { gameTitle } = route.params
    const [numOfPhrases, setNumOfPhrases] = useState(10)
    const [totalTime, setTotalTime] = useState(60)


    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            marginTop: "10%",
            fontSize: 40,
            fontFamily: "Lexend"
            
        },
        subtitle: {
            fontSize: 30,
            fontFamily: "Lexend"
        },
        settings: {
            alignItems: "center",
            marginTop: "10%"
        },
        button: {
            marginTop: "20%"
        }

    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{gameTitle}</Text>
            <View style={styles.settings}>
                <Text style={styles.subtitle}>Ilość wyrażeń</Text>
                <Counter defaultValue={10} onValueChange={setNumOfPhrases}></Counter>
                <Text style={styles.subtitle}>Całkowity czas</Text>
                <Counter defaultValue={60} onValueChange={setTotalTime}></Counter>
            </View>
            <CustomButton style={styles.button} title={"Rozpocznij grę"} onPress={() => navigation.navigate("GameScreen")}></CustomButton>
        </View>
    )
}