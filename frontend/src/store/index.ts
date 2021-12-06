import { createStore } from 'vuex'

interface State {
  mandate: boolean;
  nvMessage: string;
  admin: string;
}

export default createStore<State>({
  state: {
    mandate: true,
    nvMessage: '',
    admin: 'QRLS'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
