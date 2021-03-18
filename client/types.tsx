export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};



export type TabTodos = {
  Login: undefined;
  "All Todos": undefined;
  "Add Todo": undefined;
  Uncompleted: undefined;
  Completed: undefined
};
export type TabAddTodo = {
  TabAddTodoScreen: undefined;
};

export type TabLogin = {
  Login: undefined;
  Register: undefined;
  "All Todos": undefined
};
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: number;
}
export type User = {
  email: undefined;
  password: undefined;
}
