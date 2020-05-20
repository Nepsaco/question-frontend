<template>
  <div class='question'>
    <h2>{{currentQuestion.question}}</h2>
    <ul>
      <li v-for='answer in currentQuestion.answers' :key='answer.id'>
        <button class='answer' @click='answerClick' :ref='answer.id'>{{answer.answer}}</button>
      </li>
    </ul>
    <button class='submit' @click='submitClick'>Submit</button>
  </div>
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
    answerClick (event) {
      const userAnswer = this.currentQuestion.answers.find(answer => event.target.innerText === answer.answer)
      return this.$emit('activeAnswer', userAnswer)
    },
    submitClick (event) {
      return this.$emit('submitClick', event)
    }
  },
  watch: {

  }
}
</script>

<style lang="scss">
.question {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 80vh;

  @respond-to(mobile) {
    height: 100%;
  }

  h2 {
    @include title-font;
    text-align: center;
    padding-top: $xxl;

    @include respond-to(mobile) {
      padding-top: $large;
    }

    @include respond-to(mobile) {
      padding-top: $base;
      font-size: $large;
    }

  }
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    @include respond-to(mobile) {
      flex-flow: column;
    }

    li{
      .answer {
        @include body-font;
        text-align: center;
        width: 40vw;
        margin: $xl;
        padding: $large;
        border: none;
        border-radius: 50px;
        background: $white;
        box-shadow: 3px 3px 1px $accent-5;
        transition: all .3s;

        &:hover {
          background: $primary-4;
          box-shadow: 3px 5px 3px $accent-5;
        }

        &:focus {
          background: $success;
          outline: none;
        }

        @include respond-to(tablet) {
          margin: $large;
          width: 30vw;
        }

        @include respond-to(mobile) {
          margin-top: $xs;
          padding: $small;
          width: 50vw;
        }
      }
    }

  }
  .submit {
    @include body-font;
    width: 20vw;
    padding: $large;
    border: none;
    border-radius: 60px;
    box-shadow: 3px 3px 1px $accent-5;
    transition: all .3s;

    &:hover {
      background: $success;
      box-shadow: 3px 5px 3px $accent-5;
    }

    &:focus {
      outline: none;
    }

    @include respond-to(tablet) {
      width: 40vw;
    }
  }
}
</style>
