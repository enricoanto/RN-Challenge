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
import { Todo } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList, User } from "../types";

const TodosScreen = ({
  navigation,
}: StackScreenProps<BottomTabParamList, "Add Todo">) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //fetch data from server
  useEffect(() => {
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
  }, []);

  //Render
  if (todos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Todos</Text>
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
  } else {
    return (
      <View style={styles.container}>
        <Text>Todos List</Text>
        <FlatList
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
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TodosScreen;
