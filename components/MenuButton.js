import { Pressable, Image } from "react-native";

export default function MenuButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image
        style={{ height: 30, width: 30, marginBottom: "10%" }}
        source={require("../assets/gear.png")}
      ></Image>
    </Pressable>
  );
}
