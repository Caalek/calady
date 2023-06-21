import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
export default function CustomButton({ style, title, onPress }) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#52a9ff",
            padding: "5%",
            border: "1% solid",
            // borderRadius: "10%"
        },
        text: {
            color: "white",
            fontFamily: "TitanOne",
            fontSize: 30
        }
    })

    return (
        <View style={style}>
            <Pressable style={styles.container} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>
    )
}