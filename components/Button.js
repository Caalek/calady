import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({ color, text, onPress, overrideFontSize }) {
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color,
      fontSize: "large",
      color: "white",
      border: "1%",
      borderStyle: "solid",
      borderRadius: 13,
      overflow: "hidden",
      margin: 10,
    },
    text: {
      color: "white",
      fontFamily: "TitanOne",
      fontSize: overrideFontSize || 30,
    }
  });

  return (
    <Pressable onPress={onPress} style={styles.main}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}
