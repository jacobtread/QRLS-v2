import { createStore } from 'vuex'

interface State {
  mandate: boolean;
  nvMessage: string;
}

export default createStore<State>({
  state: {
    mandate: true,
    nvMessage: '',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
