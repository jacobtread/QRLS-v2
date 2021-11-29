import { createStore } from 'vuex'

interface State {
  mandate: boolean;
}

export default createStore<State>({
  state: {
    mandate: true
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
