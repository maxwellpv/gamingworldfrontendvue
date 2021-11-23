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
          <v-radio @click="editProfileType" class="justify-center" color="blue" value="streamer"></v-radio>
        </v-col>
        <v-col class="pa-10 mt-16" sm="7" md="3">
          <v-img src="https://cdn-icons-png.flaticon.com/512/2201/2201244.png"></v-img>
          <p class="text-center font-weight-bold white--text">Gamer Amateur</p>
          <v-radio @click="this.$router.push('News')" class="justify-center" color="blue" value="gamer"></v-radio>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import ProfilesService from "@/services/profiles.service";
export default {
  name: "sgSelection",

  methods: {
    editProfileType() {
      ProfilesService.getProfileByUserId(this.$route.params.id).then(() => {
        this.$router.push('News');
      });
    },
  }
};
</script>

<style>
.v-app-bar-title__content {
  min-width: 120px;
}
</style>

