import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTutorial: null,
    currentIndex: -1,
    tutorials: []
  },
  mutations: {
    SET_CURRENT_TUTORIAL(state, { newCurTuto, newCurIndex }) {
      state.currentIndex = newCurIndex
      state.currentTutorial = newCurTuto
    },
    SET_TUTORIALS(state, tutos) {
      state.tutorials = tutos
    }
  },
  actions: {
    setCurrentTutorial(context, { newCurTuto, newCurIndex }) {
      context.commit('SET_CURRENT_TUTORIAL', {newCurTuto, newCurIndex})
    },
    setTutorials(context, tutos) {
      context.commit('SET_TUTORIALS', tutos)
    }
  },
  modules: {
  }
})