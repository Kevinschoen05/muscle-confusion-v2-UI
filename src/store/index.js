import { createStore } from "vuex";
import { auth } from "../firebase/firebaseConfig";

import {
    createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const store = createStore({
  state: {
    user: null,
    userLoggedIn: false
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log(state.user);
    },
  },

  actions: {
    async signUp(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("Signup Failed");
      }
    },
    async login(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("Login Failed");
      }
    },
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

export default store;
