// to jest workaround, bo require() nie przyjmuje dynamicznych stringów

const images = {
    "70.jpg": require("../assets/70.jpg"),
    "80.jpg": require("../assets/80.jpg"),
    "90.jpg": require("../assets/90.jpg"),
    "00.jpg": require("../assets/00.jpg"),
    "10.jpg": require("../assets/10.jpg"),
    "gry.jpg": require("../assets/gry.jpg"),
    "jezyki.jpg": require("../assets/jezyki.jpg"),
    "jacek.jpg": require("../assets/jacek.jpg")

};

export default images