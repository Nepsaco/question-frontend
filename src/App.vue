<template>
  <div id="app">
    <header>
      <h1>Questions</h1>
    </header>
    <main v-if='render.landing'>
      <Landing @playGame="startNewGame('landing')"/>
    </main>
    <main v-if='render.game'>
      <Question @activeAnswer='activeAnswer' @submitClick='submitAnswer'/>
    </main>
    <main v-if='render.score'>
      <Score @playAgainClick="startNewGame('score')"/>
    </main>
  </div>
</template>

<script>
import Landing from '@/components/Landing'
import Question from '@/components/Question'
import Score from '@/components/Score'

export default {

  name: 'App',
  components: {
    Landing,
    Question,
    Score
  },
  mounted () {
    this.$store.dispatch('initializeStore')
    this.saveData()
  },
  computed: {
    currentQuestion () {
      return this.$store.getters.currentQuestion
    },
    render () {
      return this.$store.state.render
    }
  },
  methods: {
    activeAnswer (answer) {
      this.$store.dispatch('getUserAnswer', answer)
    },
    submitAnswer (event) {
      const { correct } = this.$store.state.userAnswer
      if (correct || correct === false) {
        this.$store.dispatch('updateScore', correct)
        this.nextQuestion()
      }
    },
    nextQuestion () {
      const { questions, currentIndex } = this.$store.state
      if (questions[currentIndex + 1]) {
        this.$store.dispatch('nextQuestion')
        this.saveData()
      } else {
        this.$store.dispatch('toggleScreen', 'game')
        this.$store.dispatch('toggleScreen', 'score')
      }
    },
    startNewGame (screen) {
      if (screen === 'landing') {
        this.$store.dispatch('toggleScreen', 'landing')
        this.$store.dispatch('toggleScreen', 'game')
        this.$store.dispatch('initializeStore')
      } else if (screen === 'score') {
        this.$store.dispatch('toggleScreen', 'score')
        this.$store.dispatch('toggleScreen', 'game')
        this.$store.dispatch('resetGame')
        this.$store.dispatch('initializeStore')
      }
    },
    saveData () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'incrementCurrentIndex') {
          localStorage.setItem('store', JSON.stringify(state))
        }
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: $primary-1;
  padding: $xxl;

  header {
    @include header-font;
    display: flex;
    justify-content: center;
  }
}
</style>
