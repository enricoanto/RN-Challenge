import React, { useState } from "react";
import Axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { TabTodos} from "../types";
// import {useHistory} from 'react-native-router'

const AddTodo = ({
  navigation,
}: StackScreenProps<TabTodos, "Add Todo">) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [due_date, setDue_date] = useState<string>("");
  const [visibleModal, setVisibleModal] = useState<any>(false);

  const addTodo = (e: any) => {
    e.preventDefault();
    const object = { title, description, due_date };
    AsyncStorage.getItem("access_token")
      .then((access_token) => {
        return Axios.post("https://apps-todo.herokuapp.com/todos", object, {
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        setVisibleModal(true);
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
  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.screens}>
      <TouchableWithoutFeedback onPress={closeKeyboard} accessible={false}>
        <SafeAreaView style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visibleModal}
            onRequestClose={() => {
              setVisibleModal(!visibleModal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Input Todo Success!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setVisibleModal(false);
                    navigation.navigate("All Todos");
                  }}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View>
            <Text style={styles.textTitle}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
            />
            <Text style={styles.textTitle}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDescription}
              value={description}
            />
            <Text style={styles.textTitle}>Due Date(yyyy/mm/dd)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDue_date}
              value={due_date}
              placeholder={"2021/12/31"}
            />
            <TouchableOpacity onPress={addTodo}>
              <Text style={styles.textSubmit}> add Todo </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
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
  textSubmit: {
    margin: 12,
    marginTop: 12,
    color: "blue",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
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
    marginHorizontal: 10,
  },
  textAddTodo: {
    fontSize: 25,
    fontFamily: "Academy Engraved LET",
    alignItems: "flex-end",
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
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default AddTodo;
