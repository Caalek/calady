import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MinuteDisplay from "./MinuteDisplay";

export default function Timer({
  parentStyles,
  startTimeSeconds,
  onFinish,
  changeTime,
}) {
  const [timeSeconds, setTimeSeconds] = useState(startTimeSeconds);

  useEffect(() => {
    if (timeSeconds > 0) {
      const timer = setInterval(() => {
        setTimeSeconds(timeSeconds - 1);
        changeTime(timeSeconds - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      onFinish();
    }
  }, [timeSeconds]);

  return (
    <View style={parentStyles}>
      <Text style={styles.time}>
        <MinuteDisplay seconds={timeSeconds} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 25,
    fontFamily: "TitanOne",
    color: "white",
  },
});
