<template>
  <v-content >
    <v-container class="spacing-playground pa-6" fluid >
      <v-row justify="center">
        <v-col class="pa-10 mt-16" md="2">
          <v-img src="https://cdn-icons-png.flaticon.com/512/2201/2201264.png" ></v-img>
          <p class="text-center font-weight-bold white--text">Streamer Amateur</p>
          <v-radio class="justify-center" color="blue" value="streamer"></v-radio>
        </v-col>
        <v-col class="pa-10 mt-16" md="2">
          <v-img src="https://cdn-icons-png.flaticon.com/512/2201/2201244.png"></v-img>
          <p class="text-center font-weight-bold white--text">Gamer Amateur</p>
          <v-radio class="justify-center" color="blue" value="gamer"></v-radio>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "sgSelection",

}
</script>



