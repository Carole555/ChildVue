import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasChild: null
  },
  mutations: {
    setHasChild (state, hasChild) {
      state.hasChild = hasChild
    }
  },
  actions: {
    updateHasChild ({ commit }, hasChild) {
      commit('setHasChild', hasChild)
    }
  },
  getters: {
    getHasChild (state) {
      return state.hasChild
    }
  }
})
