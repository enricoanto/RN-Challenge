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
  Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList, User } from "../types";

const AddTodo = ({
  navigation,
}: StackScreenProps<BottomTabParamList, "Add Todo">) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [due_date, setDue_date] = useState<string>("");
  const [visibleModal, setVisibleModal] = useState<any>(false)

  const addTodo = (e:any) => {
    e.preventDefault()
    const object = { title, description, due_date };
    AsyncStorage.getItem("access_token")
      .then((access_token) => {
        return Axios.post("https://apps-todo.herokuapp.com/todos", object, {
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
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
                setVisibleModal(false)
                navigation.navigate('All Todos')}}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setVisibleModal(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <View>
      <Text style={styles.textTitle}>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Text style={styles.textTitle}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />
      <Text style={styles.textTitle}>Due Date(mm/dd/yyyy)</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDue_date}
        value={due_date}
        placeholder={"12/31/2021"}
      />
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.textSubmit}> add Todo </Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    color: 'blue',
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AddTodo;
