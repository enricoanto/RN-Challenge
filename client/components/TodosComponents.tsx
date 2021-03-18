import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Todo {
  id: any;
  title: string;
  description: string;
  status: string;
  due_date: number;
  navigation: any;
}
const TodosComponents = (props: Todo) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [due_date, setDue_date] = useState<string>("");
  const [visibleModal, setVisibleModal] = useState<any>(false);
  const editTodo = () => {
    setVisibleModal(true);
    setTitle(props.title);
    setDescription(props.description);
    setDue_date(props.due_date.toString().slice(0, 10).replace(/-/g, "/"));
  };
  const deleteTodo = (id: number) => {
    AsyncStorage.getItem("access_token")
      .then((access_token) => {
        return Axios.delete(`https://apps-todo.herokuapp.com/todos/${id}`, {
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        props.navigation.navigate('All Todos')
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const editStatus = (todo: any) => {
      AsyncStorage.getItem("access_token")
        .then((access_token) => {
          let status = "";
          if (todo.status === "Uncompleted") {
            status = "Completed";
          } else {
            status = "Uncompleted";
          }
          return Axios.patch(
            `https://apps-todo.herokuapp.com/todos/${todo.id}`,
            { status },
            {
              headers: { access_token },
            }
          );
        })
        .then(({ data }) => {
          props.navigation.navigate('All Todos')
        })
        .catch((err) => {
          console.log(err.response);
    });
  };
  const editTodoButton = (id: any) => {
    const object = { title, description, due_date };
    AsyncStorage.getItem("access_token")
      .then((access_token) => {
        return Axios.put(
          `https://apps-todo.herokuapp.com/todos/${id}`,
          object,
          {
            headers: { access_token },
          }
        );
      })
      .then(({ data }) => {
        setVisibleModal(false);
        props.navigation.navigate('All Todos')
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <View style={styles.container}>
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
              <TouchableOpacity>
                <Text
                  style={styles.textSubmit}
                  onPress={() => editTodoButton(props.id)}
                >
                  {" "}
                  Edit Todo{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{props.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => editTodo()}>
              <AntDesign name="edit" style={styles.iconTrash} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(props.id)}>
              <Ionicons name="ios-trash" style={styles.iconTrash} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.descText}>{props.description}</Text>
        </View>
        <View style={styles.foot}>
          <TouchableOpacity onPress={() => editStatus(props)}>
            <Text
              style={[
                { fontStyle: "normal" },
                props.status === "Uncompleted" && { color: "rgb(210, 0, 0)" },
                props.status === "Completed" && { color: "rgb(0, 0, 210)" },
              ]}
            >
              {props.status}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "black" }}>
            {props.due_date.toString().slice(0, 10)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "rgb(252, 169, 133)",
    marginBottom: 10,
    height: 110,
    width: 350,
    borderRadius: 9,
  },
  titleText: {
    fontSize: 20,
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
  },
  descBox: {
    alignContent: "center",
    marginHorizontal: 10,
    height: 60,
    backgroundColor: "#ffdfd3",
  },
  descText: {
    marginLeft: 3,
    marginTop: 5,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 2.5,
  },
  iconTrash: {
    fontSize: 20,
    marginRight: 10,
    color: "black",
  },
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
});
export default TodosComponents;
