import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback,
  Keyboard, } from "react-native";
import Axios from "axios";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList } from "../types";


const RegisterScreen = ({
  navigation,
}: StackScreenProps<BottomTabParamList, "Register">) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = () => {
    const object = { email, password };
    Axios.post("https://apps-todo.herokuapp.com/register", object)
      .then(({ data }) => {
        navigation.navigate("Login");
      })
      .then((err:any) => {
        console.log(err.message);
      });
  };
  const cancel = ()=> {
    navigation.navigate("Login");
  }
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={closeKeyboard} accessible={false}>
    <View>
      <View>
        <Text style={styles.textTitle}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          style={styles.input}
          textContentType="emailAddress"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.textTitle}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Button  title="Register" onPress={register} />
      <Button  title="Cancel" onPress={cancel} />
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
    paddingHorizontal: 5
  },
  textTitle: {
    marginLeft: 12,
    marginTop: 12,
  },
  
});
export default RegisterScreen;
