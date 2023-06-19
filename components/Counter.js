import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
export default function Counter({defaultValue, onValueChange}) {
    const [value, setValue] = useState(defaultValue)

    const styles = StyleSheet.create({
        text: {
            fontSize: 30,
            margin: "3%"
        },
        container: {
            display: "flex",
            flexDirection: "row"
        },
        button: {
            margin: "3%",
            color: "white",
            backgroundColor: "#52a9ff",
            alignItems: "center",
            width: "10%"
        },
        buttonLabel: {
            fontSize: 30
        }
    })

    useEffect(() => {
        onValueChange(value)
    }, [value])

    const subtract = () => {
        setValue(value - 1)
    }

    const add = () => {
        setValue(value + 1)
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={subtract} style={styles.button}><Text style={styles.buttonLabel}>-</Text></Pressable>
            <Text style={styles.text}>{value}</Text>
            <Pressable onPress={add} style={styles.button}><Text style={styles.buttonLabel}>+</Text></Pressable>
        </View>
    )
}