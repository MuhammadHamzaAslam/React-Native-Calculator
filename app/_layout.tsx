import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function RootLayout() {
  const [pressButton, setPressButton] = useState("");
  const buttons = [ "C", "%", "Del", "/", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "=" ];
  const operators = ["C", "%", "Del", "/", "x", "-", "+", "="];
  const handlePress = (button: string | number) => {
    if (button === "=") {
      try {
        const result = pressButton.replace("x", "*");
        setPressButton(eval(result).toString());
      } catch (error) {
        setPressButton("Error");
      }
    } else if (button === "C") {
      setPressButton("0");
    } else if (button === "Del") {
      setPressButton((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0")); // Remove last character, or reset to "0" if empty
    } else {
      setPressButton((prev) =>
        prev === "0" ? String(button) : prev + String(button)
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <TextInput
          placeholder="0"
          value={pressButton}
          placeholderTextColor={"#fff"}
          editable={false}
          style={styles.display}
        />
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((button, ind) => (
          <TouchableOpacity
            onPress={() => handlePress(button)}
            key={ind}
            style={[
              styles.button,
              button === 0 && styles.zeroButton,
              ind % 4 === 3 && { marginRight: 0 },
              operators?.includes(button) && styles?.operatorButton
            ]}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  displayContainer: {
    width: "100%",
    height: height * 0.25,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  display: {
    color: "#FFF",
    fontSize: width * 0.1,
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    margin: 5,
  },
  operatorButton: {
    backgroundColor: "#FE9E0B",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    margin: 5,
  },
  zeroButton: {
    width: width * 0.45,
    alignItems: "flex-start",
    paddingLeft: 25,
  },
  buttonText: {
    color: "#FFF",
    fontSize: width * 0.08,
    fontWeight: "bold",
  },
});
