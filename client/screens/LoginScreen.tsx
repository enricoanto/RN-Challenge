import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList, User } from "../types";

const LoginScreen = ({
  navigation,
}: StackScreenProps<BottomTabParamList, "Login">) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // login connect to server set Access_token
  const login = (e:any) => {
    e.preventDefault();
    const object = { email, password };
    Axios.post("https://fancy-todo-1.herokuapp.com/login", object)
      .then(({ data }) => {
        console.log(data)
        return AsyncStorage.setItem("access_token", data.access_token);
      })
      .then((data) => {
        navigation.navigate("All Todos");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Go To Register Page
  const goToRegister = () => {
    navigation.navigate("Register");
  };
  
  // render loginscreen
  return (
    // <TouchableWithoutFeedback onPress={closeKeyboard} accessible={false}>
      <View>
        <View>
          {/* form-login  */}
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            onChangeText={(el:any)=>setEmail(el)}
            style={styles.input}
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
            clearButtonMode="always"
          />
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            defaultValue=""
          />
        </View>
        <View style={styles.footContainer}>
          <Text style={styles.footText}>Don't have account?</Text>
          <TouchableOpacity>
            <Text style={styles.registerText} onPress={goToRegister}>
              Register Here!
            </Text>
          </TouchableOpacity>
        </View>
        <Button title="Login" onPress={login} />
      </View>
    // </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  textTitle: {
    marginLeft: 12,
    marginTop: 12,
  },
  footText: {
    color: "blue",
    marginLeft: 12,
  },
  registerText: {
    color: "red",
    marginLeft: 5,
  },
  footContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
export default LoginScreen;
