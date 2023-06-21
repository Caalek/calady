import { useState } from "react";
import Counter from "./Counter";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "./CustomButton";
import images from "../utils/images"

export default function GameSettingsScreen({route, navigation}) {
    const { gameTitle, categoryId, imageFilename } = route.params
    const [numOfPhrases, setNumOfPhrases] = useState(10)
    const [totalTimeSeconds, setTotalTimeSeconds] = useState(10)


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
            fontFamily: "TitanOne"
            
        },
        subtitle: {
            fontSize: 23,
            fontFamily: "TitanOne"
        },
        settings: {
            alignItems: "center",
            marginTop: "10%"
        },
        button: {
            marginTop: "5%",
            marginBottom: "20%"
        },
        info: {
            padding: "3%",
            fontSize: 17,
            fontFamily: "TitanOne"
        }

    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{gameTitle}</Text>
            <Image resizeMode="contain" style={{height: 200}} source={images[imageFilename]} ></Image>
            <View style={styles.settings}>
                <Text style={styles.subtitle}>Ilość wyrażeń</Text>
                <Counter defaultValue={10} onValueChange={setNumOfPhrases} valueDifference={1}></Counter>
                <Text style={styles.subtitle}>Całkowity czas (sekundy)</Text>
                <Counter defaultValue={60} onValueChange={setTotalTimeSeconds} valueDifference={10}></Counter>
                <Text style={styles.info}>W trakcie gry, jeśli nie uda ci się zgadnąć, kliknij w ekran. Jeśli zgadłeś, pochyl urządzenie do przodu.</Text>
            </View>
            <CustomButton style={styles.button} title={"Rozpocznij grę"} onPress={() => navigation.navigate("GameScreen", {numOfPhrases: numOfPhrases, categoryId: categoryId, categoryName: gameTitle, totalTimeSeconds: totalTimeSeconds})}></CustomButton>
        </View>
    )
}