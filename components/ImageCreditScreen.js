import { StyleSheet, FlatList, SafeAreaView} from "react-native";
import Credit from "./Credit";

export default function ImageCreditScreen() {
  const credits = [
    {
      id: 1,
      title: "Muzyka z lat 70.",
      desc: "Led Zeppelin acoustic 1973 by Heinrich Klaffs / CC0",
      link: "https://commons.wikimedia.org/wiki/File:Led_Zeppelin_acoustic_1973.jpg",
    },
    {
      id: 2,
      title: "Muzyka z lat 80.",
      desc: "Eurovision Song Contest 1980 - Profil 1 by Hans van Dijk for Anefo  / CC BY-SA",
      link: "https://commons.wikimedia.org/wiki/File:Led_Zeppelin_acoustic_1973.jpg",
    },
    {
      id: 3,
      title: "Muzyka z lat 90.",
      desc: "Backstreet Boys 2019 by Glenn Francis / CC BY-SA",
      link: "https://commons.wikimedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
    },
    {
      id: 4,
      title: "Muzyka z lat 00.",
      desc: "Linkin park by EternalRemorse / CC ",
      link: "https://evanescencereference.info/wiki/index.php?title=File:Linkin_park.jpg",
    },
    {
      id: 5,
      title: "Muzyka z lat 10.",
      desc: "Rumores acerca de lo nuevo de Arctic Monkeys / CC BY-NC-SA",
      link: "https://canchageneral.com/rumores-acerca-lo-nuevo-arctic-monkeys/",
    },
    {
      id: 6,
      title: "Gry wideo",
      desc: "Videogameretaildisplay.jpg by Coolcaesar / CC BY-SA",
      link: "https://commons.wikimedia.org/wiki/File:Backstreet_Boys_2019_by_Glenn_Francis.jpg",
    },
    {
      id: 7,
      title: "Języki",
      desc: "Flags of students home countries at the University of Rochester by Tomwsulcer / CC0",
      link: "https://commons.wikimedia.org/wiki/File:Flags_of_students_home_countries_at_the_University_of_Rochester.jpg",
    },
    {
      id: 8,
      title: "Piosenki Disneya",
      desc: "Walt Disney Studios Alameda Entrance by Coolcaesar / CC BY-SA 4.0"
    }
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={credits}
        renderItem={({ item }) => (
          <Credit title={item.title} desc={item.desc} link={item.link}></Credit>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
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
    color: "blue",
  },
});
