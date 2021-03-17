import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TodosScreen from "../screens/AllTodosScreen";
import AddTodoScreen from "../screens/AddTodoScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  BottomTabParamList,
  TabRegister,
  TabTodos,
  TabAddTodo,
  TabLogin,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const [access_token, setAccess_token] = React.useState("");
  const colorScheme = useColorScheme();
  React.useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then((access_token: any) => {
        setAccess_token(access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  if (!access_token) {
    // return (
    //   <BottomTab.Navigator
    //     initialRouteName="Login"
    //     tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    //   >
    //     <BottomTab.Screen
    //       name="Register"
    //       component={TabRegisterNavigator}
    //       options={{
    //         tabBarIcon: ({ color }) => (
    //           <TabBarIcon name="ios-code" color={color} />
    //         ),
    //       }}
    //     />
    //     <BottomTab.Screen
    //       name="Login"
    //       component={TabLoginNavigator}
    //       options={{
    //         tabBarIcon: ({ color }) => (
    //           <TabBarIcon name="ios-code" color={color} />
    //         ),
    //       }}
    //     />
    //   </BottomTab.Navigator>
    // );
  } else {
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="All Todos"
        component={TabTodosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add Todo"
        component={TabAddTodoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={TabRegisterNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={TabLoginNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabTodosStack = createStackNavigator<TabTodos>();

function TabTodosNavigator() {
  return (
    <TabTodosStack.Navigator>
      <TabTodosStack.Screen
        name="TabTodosScreen"
        component={TodosScreen}
        options={{ headerTitle: "All Todos" }}
      />
    </TabTodosStack.Navigator>
  );
}

const TabAddTodoStack = createStackNavigator<TabAddTodo>();

function TabAddTodoNavigator() {
  return (
    <TabAddTodoStack.Navigator>
      <TabAddTodoStack.Screen
        name="TabAddTodoScreen"
        component={AddTodoScreen}
        options={{ headerTitle: "All Todos" }}
      />
    </TabAddTodoStack.Navigator>
  );
}

const TabLoginStack = createStackNavigator<TabLogin>();

function TabLoginNavigator() {
  return (
    <TabLoginStack.Navigator>
      <TabLoginStack.Screen
        name="TabLoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </TabLoginStack.Navigator>
  );
}
const TabRegisterStack = createStackNavigator<TabRegister>();

function TabRegisterNavigator() {
  return (
    <TabRegisterStack.Navigator>
      <TabRegisterStack.Screen
        name="TabRegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
    </TabRegisterStack.Navigator>
  );
}
