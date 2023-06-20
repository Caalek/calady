import { View, Text, StyleSheet, Button, BackHandler, Pressable } from "react-native";
export default function InfoText({ text, color }) {

    const styles = StyleSheet.create({
        text: {
            fontSize: 60,
            fontFamily: "TitanOne",
            color: "white"
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color,
            width: "100%",
            height: "100%",
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}