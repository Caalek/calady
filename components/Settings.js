import { View, Text, StyleSheet } from "react-native";
export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Póki co nic tu nie ma :P</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        margin: "5%"
        // justifyContent: "center",
        // alignItems: "center"
    },
    text: {
        fontSize: 25,
        fontFamily: "TitanOne"
    },
})