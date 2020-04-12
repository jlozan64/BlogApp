import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    idToken: '',
    dialog: false,
    edit: false,
  },
  getters: {
    getUser: state => state.user,
    getIdToken: state => state.idToken,
    openDialog: state => state.dialog,
    openEditDialog: state => state.edit,
  },
  mutations: {
    settingUser: (state, user) => (state.user = user),
    settingIdToken: (state, idToken) => (state.idToken = idToken),
    changingDialog: (state, status) => (state.dialog = status),
    changingEditDialog: (state, status) => (state.edit = status),
  },
  actions: {
    setUser: ({ commit }, user) => commit('settingUser', user),
    setIdToken: ({ commit }, idToken) => commit('settingIdToken', idToken),
    showDialog: ({ commit }) => commit('changingDialog', true),
    hideDialog: ({ commit }) => commit('changingDialog', false),
    showEditDialog: ({ commit }) => commit('changingEditDialog', true),
    hideEditDialog: ({ commit }) => commit('changingEditDialog', false),
  },
})

export default store