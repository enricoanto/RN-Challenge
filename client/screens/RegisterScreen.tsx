import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Axios from "axios";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList } from "../types";

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

const RegisterScreen = ({
  navigation,
}: StackScreenProps<BottomTabParamList, "Register">) => {
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
  const { email, password } = state;

  //* Add User in Database change screen to login screen
  const register = () => {
    const object = { email, password };
    Axios.post("https://apps-todo.herokuapp.com/register", object)
      .then(({ data }) => {
        navigation.navigate("Login");
      })
      .then((err: any) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err);
        }
      });
  };
  //* change Screen without add user in database
  const cancel = () => {
    navigation.navigate("Login");
  };
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={styles.screens}>
      <Text style={styles.textTitleScreen}>Register</Text>
      <TouchableWithoutFeedback onPress={closeKeyboard} accessible={false}>
        <View style={styles.container}>
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
            />
            <Text style={styles.textTitle}>Password</Text>
            <TextInput
              onChangeText={(payload_password) => {
                dispatch({
                  type: "change_password",
                  payload: payload_password,
                });
              }}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.bottomStyle}>
          <Button title="Register" onPress={register}/>
          <Button title="Cancel" onPress={cancel} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  screens: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(255,200,176)",
  },
  textTitleScreen: {
    marginLeft: 20,
    marginTop: 100,
    fontSize: 50,
    fontFamily: "Academy Engraved LET",
  },
  container: {
    marginHorizontal: 20,
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rgb(255, 240, 200)",
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
    backgroundColor: "white",
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
  bottomStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
export default RegisterScreen;
