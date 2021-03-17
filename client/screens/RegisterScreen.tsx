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
    <TouchableWithoutFeedback onPress={closeKeyboard} accessible={false}>
      <View>
        <View>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            onChangeText={(payload_email) => {
              dispatch({ type: "change_email", payload:payload_email });
            }}
            style={styles.input}
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.textTitle}>Password</Text>
          <TextInput
            onChangeText={(payload_password) => {
              dispatch({ type: "change_password", payload: payload_password });
            }}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <Button title="Register" onPress={register} />
        <Button title="Cancel" onPress={cancel} />
      </View>
    </TouchableWithoutFeedback>
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
});
export default RegisterScreen;
