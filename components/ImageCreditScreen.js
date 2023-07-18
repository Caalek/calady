import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  BackHandler,
  Linking,
} from "react-native";

export default function ImageCreditScreen() {
  const credits = [
    {
      title: "Muzyka z lat 70.",
      desc: "Led Zeppelin acoustic 1973 by Heinrich Klaffs / CC0",
      link: "https://commons.wikimedia.org/wiki/File:Led_Zeppelin_acoustic_1973.jpg",
    },
    {
      title: "Muzyka z lat 80.",
      desc: "Eurovision Song Contest 1980 - Profil 1 by Hans van Dijk for Anefo  / CC BY-SA",
      link: "https://commons.wikimedia.org/wiki/File:Led_Zeppelin_acoustic_1973.jpg",
    },
    {
        title: "Muzyka z lat 90.",
        desc: "Backstreet Boys 2019 by Glenn Francis / CC BY-SA",
        link: "https://commons.wikimedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg"
    },
    {
        title: "Muzyka z lat 2000",
        desc: "Linkin park by EternalRemorse / CC ",
        link: "https://evanescencereference.info/wiki/index.php?title=File:Linkin_park.jpg"
    },
    {
        title: "Muzyka z lat 2010",
        desc: "Rumores acerca de lo nuevo de Arctic Monkeys / CC BY-NC-SA",
        link: "https://canchageneral.com/rumores-acerca-lo-nuevo-arctic-monkeys/"
    },
    {
        title: "Gry wideo",
        desc: "Backstreet Boys 2019 by Glenn Francis / CC BY-SA",
        link: "https://commons.wikimedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg"
    },
    {
        title: "Postaci fikcyjne",
        desc: "Wiedźmin - własność CD PROJEKT RED",
        link: "https://www.thewitcher.com"
    },
  ];

  return (
    <View style={styles.text}>
      {credits.map((credit) => {
        return (
          <View style={styles.creditItem}>
            <Text style={styles.textItem}>{credit.title}</Text>
            <Pressable onPress={() => Linking.openURL(credit.link)}>
              <Text style={styles.descItem}>{credit.desc}</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: "center",
  },
  creditItem: {
    flex: 1,
    alignItems: "center",
  },
  textItem: {
    padding: 5,
    fontFamily: "TitanOne",
    fontSize: 20,
  },
  descItem: {
    padding: 10,
    color: "blue"
  }
});
