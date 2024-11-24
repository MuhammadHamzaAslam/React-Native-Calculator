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
  const [displayValue, setDisplayValue] = useState("");
  const [isResult, setIsResult] = useState(false); 

  const handleButtonPress = (button: string | number) => {
    if (button === "C") {
      setDisplayValue("");
      setIsResult(false);
    } else if (button === "=") {
      try {
        const result = eval(displayValue.replace("x", "*"));
        setDisplayValue(result.toString());
        setIsResult(true);
      } catch {
        setDisplayValue("Error");
        setIsResult(true);
      }
    } else {
      if (isResult && typeof button === "number") {
        setDisplayValue(button.toString());
      } else {
        setDisplayValue((prev) =>
          isResult ? button.toString() : prev + button.toString()
        );
      }
      setIsResult(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <TextInput
          value={displayValue}
          placeholder="0"
          placeholderTextColor="#aaa"
          style={styles.display}
          editable={false}
        />
      </View>

      <View style={styles.buttonsContainer}>
        {[
          ["C", "±", "%", "/"],
          [7, 8, 9, "x"],
          [4, 5, 6, "-"],
          [1, 2, 3, "+"],
          [0, ".", "="],
        ].map((row, rowIndex) => (
          <View style={styles.buttonRow} key={rowIndex}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                onPress={() => handleButtonPress(button)}
                style={[styles.button, button === 0 && styles.zeroButton]}
                key={buttonIndex}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: "column",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
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
