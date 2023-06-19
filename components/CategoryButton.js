import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from "react-native";
export default function CategoryButton({ navigation, title, color }) {

    const styles = StyleSheet.create({
        container: {
            margin: "2%",
            backgroundColor: color,
            color: "white",
            border: "1px",
            borderStyle: "solid",
            borderRadius: "10%",
        },
        text: {
            padding: "8%",
            color: "white",
            fontFamily: "Lexend",
            fontSize: 20
        }
    })

    return (
        <Pressable onPress={() => navigation.navigate("GameSettings", {gameTitle: title})}style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}