import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
export default function Counter({
  defaultValue,
  onValueChange,
  valueDifference,
}) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  const subtract = () => {
    if (value - valueDifference >= 1) {
      setValue(value - valueDifference);
    }
  };

  const add = () => {
    setValue(value + valueDifference);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={subtract} style={styles.button}>
        <Text style={styles.buttonLabel}>-</Text>
      </Pressable>
      <TextInput style={styles.text}>{value}</TextInput>
      <Pressable onPress={add} style={styles.button}>
        <Text style={styles.buttonLabel}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    margin: "3%",
    fontFamily: "TitanOne",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    margin: "3%",
    color: "white",
    backgroundColor: "#52a9ff",
    alignItems: "center",
    width: "10%",
    border: "1% solid",
    borderRadius: 7
  },
  buttonLabel: {
    fontSize: 35,
    color: "white"
  },
});
