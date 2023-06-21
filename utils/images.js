// to jest workaround, bo require() nie przyjmuje dynamicznych stringów

const images = {
    "70.jpg": require("../assets/70.jpg"),
    "80.jpg": require("../assets/80.jpg"),
    "90.jpg": require("../assets/90.jpg"),
    "2000.jpg": require("../assets/2000.jpg"),
    "2010.jpg": require("../assets/2010.jpg"),
    "gry.png": require("../assets/gry.png")
};

export default images