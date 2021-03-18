// import { Ionicons } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
import TodosScreen from "../screens/AllTodosScreen";
import AddTodoScreen from "../screens/AddTodoScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import CompletedScreen from "../screens/CompletedTodo"
import UncompletedScreen from "../screens/UncompletedTodo"
import { TabTodos, TabLogin } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({navigation}:any) {
  const [access_token, setAccess_token] = React.useState("");
  React.useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then((access_token: any) => {
        setAccess_token(access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  if (!access_token) {
    return (
      <TabLoginStack.Navigator initialRouteName="All Todos">
        
        <TabLoginStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <TabLoginStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register", headerShown: false }}
        />
        <TabLoginStack.Screen
          name="All Todos"
          component={TodosScreen}
          options={{ title: "Todo ", headerShown: false }}
        />
      </TabLoginStack.Navigator>
      
    );
  } else {
    return (
      <TabTodosStack.Navigator initialRouteName="All Todos">
        <TabTodosStack.Screen
          name="All Todos"
          component={TodosScreen}
          options={{ title: "Todo ", headerShown: false  }}
        />
        <TabTodosStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <TabTodosStack.Screen
          name="Add Todo"
          component={AddTodoScreen}
          options={{ title: "Add Todo" }}
        />
        <TabTodosStack.Screen
          name="Completed"
          component={CompletedScreen}
          options={{ title: "Completed Todo" }}
        />
        <TabTodosStack.Screen
          name="Uncompleted"
          component={UncompletedScreen}
          options={{ title: "Uncompleted Todo" }}
        />
      </TabTodosStack.Navigator>
    );
  }
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof Ionicons>["name"];
//   color: string;
// }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabTodosStack = createStackNavigator<TabTodos>();
const TabLoginStack = createStackNavigator<TabLogin>();
