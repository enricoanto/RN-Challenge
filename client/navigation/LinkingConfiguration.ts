import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          "All Todos": "all_todos",
          Login: 'login',
          Register: 'register',
        },
      },
      NotFound: '*',
    },
  },
};
