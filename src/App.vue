<template>
  <div id="app">
    <header>
      <h1>Questions</h1>
    </header>
    <main>
      <Question v-if='currentQuestion'/>
      <button class='submit' @click='submitAnswer'>Submit</button>
    </main>
  </div>
</template>

<script>
import Question from '@/components/Question'

export default {

  name: 'App',
  mounted () {
    this.$store.dispatch('fetchQuestions')
  },
  components: {
    Question
  },
  computed: {
    currentQuestion () {
      return this.$store.getters.currentQuestion
    }
  },
  methods: {
    submitAnswer () {
      console.log('hi')
      return true
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

  .submit {
    @include body-font;
    margin: $xxl;
    padding: $base;
    width: 25vw;
    border: none;
    border-radius: 50px;
    box-shadow: 3px 3px 1px $accent-5;

    &:hover {
      background: $success;
      box-shadow: 3px 5px 3px $accent-5;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
