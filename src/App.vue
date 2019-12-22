<template>
  <v-app>
    <v-app-bar app color="#393f4d" dark>
    <div class="d-flex mx-auto">
      <h1>Trello</h1>
    </div>
    </v-app-bar>
    <v-content class="bg-black">
      <Board/>
    </v-content>
  </v-app>
</template>

<script>
import Board from './components/Board';
export default {
  name: 'App',

  components: {
    Board
  }
};
</script>
<style scoped>
  .bg-black {
    background:#1d1e22;
  }
</style>