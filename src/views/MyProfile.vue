<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>AAAAAAAAAAAAAA</v-card>
    <v-btn class="ma-3 primary" @click="showEditProfile">Edit </v-btn>
  </v-container>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  name: "MyProfile",
  components: {NavBar},
  methods:{
    showEditProfile() {
      this.$router.push('edit')
    },
  }
}
</script>

<style scoped>

</style>