<template>
  <div class='score'>
    <h2>Welcome</h2>
    <button @click='playClick'>Play</button>
  </div>
</template>

<script>
export default {
  name: 'Score',
  methods: {
    playClick () {
      this.$emit('playGame')
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
