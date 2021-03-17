import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Todo {
  id: any;
  title: string;
  description: string;
  status: string;
  due_date: number;
}
const TodosComponents = (props: Todo) => {

    const deleteTodo = (id:number)=> {
        AsyncStorage.getItem("access_token")
      .then((access_token) => {
        return Axios.delete(`https://apps-todo.herokuapp.com/todos/${id}`, {
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err.response);
      });
    }
    const editStatus = (todo:any)=> {
        AsyncStorage.getItem("access_token")
      .then((access_token) => {
          let status = ""
          if(todo.status === "Uncompleted") {
               status = "Completed"
          } else {
               status = "Uncompleted"
          }
        return Axios.patch(`https://apps-todo.herokuapp.com/todos/${todo.id}`, {status}, {
          headers: { access_token },
        });
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err.response);
      });
    }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{props.title}</Text>
          <TouchableOpacity onPress={()=>deleteTodo(props.id)}><Ionicons name="ios-trash" style={styles.iconTrash} /></TouchableOpacity>
        </View>
        <View style={styles.descBox}>
          <Text style={styles.descText}>{props.description}</Text>
        </View>
        <View style={styles.foot}>
          <TouchableOpacity onPress={()=>editStatus(props)}><Text
            style={[ {fontStyle:'normal'},
              props.status === "Uncompleted" && { color: "rgb(210, 0, 0)" },
              props.status === "Completed" && { color: "rgb(0, 0, 210)" },
            ]}
          >
            {props.status}
          </Text></TouchableOpacity>
          <Text style={{color: 'black'}}>{props.due_date.toString().slice(0, 10)}</Text>
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
    fontWeight: 'bold'
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
  iconTrash : {
    fontSize: 20,
    marginRight: 10,
    color: "black",
  }
});
export default TodosComponents;
