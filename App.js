import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [isMonkey, setIsMonkey] = React.useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [bg, setBg] = useState(styles.backGroundLight.backgroundColor);
  const [fc, setFc] = useState(styles.fontLight.color);
  const handlePress = () => {
    setIsMonkey((prevState) => !prevState);
  };

  useEffect(() => {
    setBg(
      isMonkey
        ? styles.backGroundDark.backgroundColor
        : styles.backGroundLight.backgroundColor
    );
    setFc(isMonkey ? styles.fontLight.color : styles.fontDark.color);
  }, [isMonkey]);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(username.length);
  }, [username]);

  useEffect(() => {
    // Password validation criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      setPasswordStatus("Password is valid");
    } else {
      setPasswordStatus(
        "Password must include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    }
  }, [password]);
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <TouchableOpacity onPress={handlePress}>
        {isMonkey ? (
          <Text style={styles.fontMonkey}>🙉</Text>
        ) : (
          <Text style={styles.fontMonkey}>🙈</Text>
        )}
      </TouchableOpacity>

      <Text style={[styles.text, { color: fc }]}>Login</Text>

      <TextInput
        placeholderTextColor={isMonkey ? "#FFF" : "#000"}
        placeholder="Username"
        style={[styles.input, { color: fc }]}
        value={username}
        onChangeText={(text) => setUsername(text)}
      ></TextInput>
      <Text style={styles.label}>{charCount} characters</Text>
      <TextInput
        placeholderTextColor={isMonkey ? "#FFF" : "#000"}
        placeholder="Password"
        style={[styles.input, { color: fc }]}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      ></TextInput>
      <Text style={[styles.label, { marginLeft: 70, textAlign: "center" }]}>
        {passwordStatus}
      </Text>

      <TouchableOpacity style={styles.btnLogin}>
        <Text style={[styles.btnText, { color: fc }]}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 20,
    fontSize: 32,
    fontWeight: "bold",
  },
  btnLogin: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: -5,
    width: 250,
    height: 50,
  },
  input: {
    margin: 1,
    width: 250,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 1,
  },
  fontMonkey: {
    fontSize: 80,
  },
  backGroundDark: {
    backgroundColor: "#292a2b",
  },
  backGroundLight: {
    backgroundColor: "#dcdee0",
  },
  fontLight: {
    color: "#fff",
  },
  fontDark: {
    color: "#000",
  },
  label: {
    fontSize: 12,
    marginBottom: 15,
    color: "#333",
    right: 90,
  },
});
