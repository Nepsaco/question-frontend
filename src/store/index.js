import Vue from 'vue'
import Vuex from 'vuex'
const baseUrl = 'http://localhost:9000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    currentIndex: 0
  },
  getters: {
    currentQuestion: ({ questions, currentIndex }) => questions.find((question, index) => index === currentIndex)
  },
  mutations: {
    setQuestions (state, questions) {
      state.questions = questions
      return state
    }
  },
  actions: {
    fetchQuestions ({ commit }) {
      fetch(`${baseUrl}/questions`)
        .then(response => response.json())
        .then(questions => {
          commit('setQuestions', questions)
        })
    }
  },
  modules: {
  }
})
