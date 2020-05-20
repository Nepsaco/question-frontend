import Vue from 'vue'
import Vuex from 'vuex'
const baseUrl = 'http://localhost:9000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    currentIndex: 0,
    userAnswer: '',
    score: 0,
    render: {
      game: false,
      score: false,
      landing: true
    }
  },
  getters: {
    currentQuestion: ({ questions, currentIndex }) => {
      if (questions.find(question => question)) {
        const question = questions.find((question, index) => index === currentIndex)
        question.answers = question.answers.map(answer => ({ sort: Math.random(), ...answer })).sort((a, b) => a.sort - b.sort)
        return question
      }
    }
  },
  mutations: {
    setQuestions (state, questions) {
      const randomQuestionArray = questions
        .map(question => ({ sort: Math.random(), ...question }))
        .sort((a, b) => a.sort - b.sort)

      state.questions = randomQuestionArray
      return state
    },
    setUserAnswer (state, answer) {
      state.userAnswer = answer
      return state
    },
    incrementScore (state) {
      state.score++
      return state
    },
    addUserAnswer (state) {
      const currentQuestion = state.questions[state.currentIndex]
      state.questions[state.currentIndex] = { ...currentQuestion, givenAnswer: state.userAnswer }
      return currentQuestion
    },
    incrementCurrentIndex (state) {
      state.currentIndex++
      return state
    },
    clearAnswer (state) {
      state.userAnswer = ''
      return state
    },
    toggleRender (state, screen) {
      state.render[screen] = !state.render[screen]
      return state
    },
    resetGameState (state) {
      state.currentIndex = 0
      state.score = 0
    },
    assignState (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
      }
    }
  },

  actions: {
    getUserAnswer ({ commit }, answer) {
      commit('setUserAnswer', answer)
    },
    updateScore ({ commit }, correct) {
      if (correct) {
        commit('incrementScore')
        commit('addUserAnswer')
      } else {
        commit('addUserAnswer')
      }
    },
    nextQuestion ({ commit }) {
      commit('incrementCurrentIndex')
      commit('clearAnswer')
    },
    toggleScreen ({ commit }, screen) {
      commit('toggleRender', screen)
    },
    resetGame ({ commit }) {
      commit('setQuestions', this.state.questions)
      commit('resetGameState')
    },
    initializeStore ({ commit }) {
      if (!localStorage.getItem('store')) {
        fetch(`${baseUrl}/questions`)
          .then(response => response.json())
          .then(questions => {
            commit('setQuestions', questions)
          })
      } else {
        commit('assignState')
      }
    }
  },
  modules: {
  }
})
