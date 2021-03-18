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
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { TabTodos, Todo } from "../types";

const TodosScreen = ({
  navigation,
}: StackScreenProps<TabTodos, "All Todos">) => {
  const [todos, setTodos] = useState<Todo[]>([]);
    

  //fetch data from server
  useEffect(() => {
    navigation.addListener('focus', ()=> {
      AsyncStorage.getItem("access_token")
        .then((access_token) => {
          return Axios.get("https://apps-todo.herokuapp.com/todos", {
            headers: { access_token },
          });
        })
        .then(({ data }) => {
          setTodos(data);
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
  const goToAddTodo = () => {
    navigation.navigate("Add Todo");
  };
  
  //Render

  return (
    <View style={styles.screens}>
      <Text style={styles.textTitleScreen}>Todos List</Text>
      <View style={styles.header}>
        <View style={styles.container}>
          <TouchableOpacity onPress={goToAddTodo}>
            <Text style={styles.textAddTodo}>
              <AntDesign name="plus" style={styles.textAddTodo} />
              Add Todo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigateStatus}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Completed");
            }}
          >
            <Text style={styles.textStatus}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Uncompleted");
            }}
          >
            <Text style={styles.textStatus}>Uncompleted</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerTodos}>
      <FlatList 
        keyExtractor={(todoId) => todoId.id.toString()}
        data={todos}
      
        renderItem={({ item }) => {
          return (
            <TodosComponents
            navigation = {navigation}
              id={item.id}
              title={item.title}
              description={item.description}
              status={item.status}
              due_date={item.due_date}
            ></TodosComponents>
          );
        }}
      />
      </View>
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
    alignItems: "flex-end",
  },
  containerTodos: {
    height: 550,
    alignItems: 'center'
  },
  navigateStatus: {
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  textStatus: {
  marginLeft: 20
  }
});
export default TodosScreen;
