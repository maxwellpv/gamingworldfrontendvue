<template>
  <v-content >
    <v-app-bar
      app color="indigo darken-1 " dark >
      <v-app-bar-title class="white--text">User Type</v-app-bar-title>
    </v-app-bar>
    <v-container class="spacing-playground pa-6" fluid >
      <v-row justify="center">
        <v-col class="pa-10 mt-16" sm="7" md="3">
          <v-img src="https://cdn-icons-png.flaticon.com/512/2201/2201264.png" ></v-img>
          <p class="text-center font-weight-bold white--text">Streamer Amateur</p>
          <v-radio @click="showStreamerProfile" class="justify-center" color="blue" value="streamer"></v-radio>
        </v-col>
        <v-col class="pa-10 mt-16" sm="7" md="3">
          <v-img src="https://cdn-icons-png.flaticon.com/512/2201/2201244.png"></v-img>
          <p class="text-center font-weight-bold white--text">Gamer Amateur</p>
          <v-radio @click="showGamerProfile" class="justify-center" color="blue" value="gamer"></v-radio>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "sgSelection",

  methods: {
    showStreamerProfile() {
      this.$router.push('Streamer')
    },
    showGamerProfile() {
      this.$router.push('Gamer')
    },
  }
};
</script>

<style>
.v-app-bar-title__content {
  min-width: 120px;
}
</style>

