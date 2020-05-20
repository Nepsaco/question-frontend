<template>
  <div class='score'>
    <h2>Final score: {{score}}</h2>
    <ul class='questionsList'>
      <li v-for='question in quesitons' :key='question.id'>
        <p>{{question.question}}</p>
        <p v-if='question.givenAnswer.correct === true' class='correct'>{{question.givenAnswer.answer}}</p>
        <div v-else class='fail'>
          <p class='fail'>{{question.givenAnswer.answer}}</p>
        </div>
      </li>
    </ul>
    <button @click='playAgainClick'>Play Again?</button>
  </div>
</template>

<script>
export default {
  name: 'Score',
  mounted () {
    this.clearStorage()
  },
  computed: {
    score () {
      return this.$store.state.score
    },
    quesitons () {
      return this.$store.state.questions
    }
  },
  methods: {
    playAgainClick () {
      this.$emit('playAgainClick')
    },
    clearStorage () {
      localStorage.removeItem('store')
    }
  }
}
</script>

<style lang="scss">
.score {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 80vh;

  h2 {
    @include header-font;
    width: 100vw;
    text-align: center;
    padding: $xxl;

  }

  .questionsList {
    @include body-font;
    color: $white;
    overflow: scroll;
    height: 40vh;

    li{
      display:flex;
      flex-flow: row wrap;
      padding-bottom: $base;

      p {
        width: 100%;
      }
      .fail {
        color: $failure;
      }
    }

    .correct {
      color: $success;
    }
  }

  button {
      @include body-font;
      width: 20vw;
      padding: $large;
      border: none;
      border-radius: 60px;
      box-shadow: 3px 3px 1px $accent-5;

      &:hover {
        background: $success;
        box-shadow: 3px 5px 3px $accent-5;
      }

      &:focus {
        outline: none;
      }

      @include respond-to(tablet) {
        padding: $small;
        width: 50vw;
      }

      @include respond-to(mobile) {
        padding: $small;
        width: 50vw;
      }
  }
}
</style>
