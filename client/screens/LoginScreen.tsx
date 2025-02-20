import React, { useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { TabLogin } from "../types";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "change_email":
      return { ...state, email: action.payload };
    case "change_password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const LoginScreen = ({
  navigation,
}: StackScreenProps<TabLogin, "Login">) => {
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
  const { email, password } = state;

  // *login connect to server set Access_token
  const login = (e: any) => {
    e.preventDefault();
    const object = { email, password };
    Axios.post("https://apps-todo.herokuapp.com/login", object)
      .then(({ data }) => {
        return AsyncStorage.setItem("access_token", data.access_token);
      })
      .then((data) => {
        navigation.navigate("All Todos");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err);
        }
      });
  };

  // Go To Register Page
  const goToRegister = () => {
    navigation.navigate("Register");
  };
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };
  // render loginscreen
  return (
    <View style={styles.screens}>
      <Text style={styles.textTitleScreen}>Login</Text>
    <TouchableWithoutFeedback  onPress={closeKeyboard} accessible={false}>
      <View style={styles.container}>
          {/* form-login  */}
        <View>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            onChangeText={(payload_email) => {
              dispatch({ type: "change_email", payload: payload_email });
            }}
            style={styles.input}
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
            clearButtonMode="always"
          />
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            onChangeText={(payload_password) => {
              dispatch({ type: "change_password", payload: payload_password });
            }}
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
    </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  screens: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'rgb(255,200,176)'
  },
  textTitleScreen: {
    marginLeft: 20,
    marginTop: 100,
    fontSize: 50,
    fontFamily: 'Academy Engraved LET'
  },
  container: {
    marginHorizontal: 20,
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor:'rgb(255, 240, 200)'
  
  },
  textTitle: {
    marginLeft: 12,
    marginTop: 12,
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 5,
    backgroundColor: 'white'
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
