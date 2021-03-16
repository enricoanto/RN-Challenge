export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  "All Todos": undefined;
  "Add Todo": undefined;
  Register: undefined;
  Login: undefined;
};

export type TabTodos = {
  TabTodosScreen: undefined;
};
export type TabAddTodo = {
  TabAddTodoScreen: undefined;
};
export type TabRegister = {
  TabRegisterScreen: undefined;
};
export type TabLogin = {
  TabLoginScreen: undefined;
};
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  due_date: number;
}
export type User = {
  email: undefined;
  password: undefined;
}
