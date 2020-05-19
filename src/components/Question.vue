<template>
  <main>
    <h2>{{currentQuestion.question}}</h2>
    <ul>
      <li v-for='answer in currentQuestion.answers' :key='answer.id'>
        <button class='answer'>{{answer.answer}}</button>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'Question',
  computed: {
    currentQuestion () {
      return this.$store.getters.currentQuestion
    }
  },
  methods: {
    answerClick () {
      return this.$emit('activeAnswer')
    }
  }
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  h2 {
    @include title-font;
    text-align: center;
    padding: $xxl;

  }
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    li{
      .answer {
        @include body-font;
        text-align: center;
        width: 40vw;
        margin: 2vw;
        padding: $large;
        border: none;
        border-radius: 50px;
        background: $white;
        box-shadow: 3px 3px 1px $accent-5;

        &:hover {
          background: $primary-4;
          box-shadow: 3px 5px 3px $accent-5;
        }

        &:focus {
          background: $success;
          outline: none;
        }
      }
    }
  }
}
</style>
