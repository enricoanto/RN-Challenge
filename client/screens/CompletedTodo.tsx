import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Axios from "axios";
import TodosComponents from "../components/TodosComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo, TabTodos } from "../types";
import { StackScreenProps } from "@react-navigation/stack";


const TodosScreen = ({
  navigation,
}: StackScreenProps<TabTodos, "Completed">) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //fetch data from server
  let newData:any = []
  useEffect(() => {
    navigation.addListener('focus', ()=> {
      AsyncStorage.getItem("access_token")
        .then((access_token) => {
          return Axios.get("https://apps-todo.herokuapp.com/todos", {
            headers: { access_token },
          });
        })
        .then(({ data }) => {
          data.forEach((el:any)=> {
            console
              if(el.status ==="Completed") {
                  newData.push(el)
              }
          })
        setTodos(newData);
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
    });
    })
 
  //Render

    return (
      <View style={styles.screens}>
        <Text style={styles.textTitleScreen}>Completed List</Text>
        <View style={styles.container}>
          <FlatList
          style= {styles.containerTodos}
            keyExtractor={(todoId) => todoId.id.toString()}
            data={todos}
            renderItem={({ item }) => {
              return (
                <TodosComponents
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  due_date={item.due_date}
                  navigation= {navigation}
                ></TodosComponents>
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem("access_token", "")
                .then((data) => {
                  navigation.navigate("Login");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 50,
    fontSize: 50,
    fontFamily: "Academy Engraved LET",
  },
  container: {
    marginHorizontal: 10,
    
  },
  textAddTodo: {
    fontSize: 15,
    fontFamily: "Academy Engraved LET",
    alignItems: 'flex-end'
  },
 containerTodos: {
   height: 500
  },
  
});
export default TodosScreen;
