<template>
  <!--  Navigation Bar  -->
  <v-container>
    <v-app-bar app color="primary" flat dark>
      <v-app-bar-title @click="showGamerProfile" class="white--text">GamingWorld</v-app-bar-title>
      <v-spacer></v-spacer>
      <template class="d-flex justify-center red">
        <v-text-field class="d-flex mt-auto" style="max-width: 250px"
                      label="Search ..." append-icon="mdi-magnify"  solo flat  background-color="primary" dark></v-text-field>
      </template>
      <v-spacer></v-spacer>

      <v-btn @click="showNewsPage" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn @click="showPublicationsPage" icon >
        <v-icon>mdi-clipboard-multiple</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>

        </template>

        <v-list>
          <v-list-item @click="showMyProfile">
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showMyStreamerProfile">
            <v-list-item-title>My Streamer Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showStreamerProfile">
            <v-list-item-title>Gamer Profile - Streamer</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showGamerProfile">
            <v-list-item-title>Gamer Profile - Gamer</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showLogin">
            <v-list-item-title>Log-In</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "nav-bar",
  methods: {
    showNewsPage() {
      this.$router.push({path: '/news'})
    },
    showStreamerProfile() {
      this.$router.push({ path: `/profile/${process.env.VUE_APP_CURRENT_USER_ID}/create/1` })
    },
    showGamerProfile() {
      this.$router.push({ path: `/profile/${process.env.VUE_APP_CURRENT_USER_ID}/create/0` })
    },
    showPublicationsPage() {
      this.$router.push({path: '/publications'})
    },
    showMyProfile() {
      this.$router.push({ path: `/myprofile/${process.env.VUE_APP_CURRENT_USER_ID}/0` })
    },
    showMyStreamerProfile() {
      this.$router.push({ path: `/myprofile/${process.env.VUE_APP_CURRENT_USER_ID}/1` })
    },
    showLogin() {
      this.$router.push({path: '/login'})
    },
  }
}
</script>

<style scoped>

</style>