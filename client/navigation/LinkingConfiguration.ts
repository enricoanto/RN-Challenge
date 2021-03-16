import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          "All Todos": {
            screens: {
              TabTodosScreen: 'all_todos',
            },
          },
          Register: {
            screens: {
              TabRegisterScreen: 'register',
            },
          },
          "Add Todo": {
            screens: {
              TabAddTodoScreen: 'add_todo',
            },
          },
          Login: {
            screens: {
              TabLoginScreen: 'login',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
