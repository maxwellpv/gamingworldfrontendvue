<template>
  <!--  Navigation Bar  -->
  <v-container>
    <v-app-bar app color="primary" flat dark>
      <v-app-bar-title @click="showNewsPage" class="white--text">GamingWorld</v-app-bar-title>
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
          <v-list-item v-if="isLogged" @click="showMyProfile">
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!isLogged" @click="showLogin">
            <v-list-item-title>Log-In</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="signOut">
            <v-list-item-title>Sign-Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
import SessionService from "@/services/session.service";

export default {
  name: "nav-bar",
  data(){
    return {
      isLogged: false,
      sessionData: null
    }
  },
  methods: {
    showNewsPage() {
      this.$router.push({path: '/news'})
    },
    showPublicationsPage() {
      this.$router.push({path: '/publications'})
    },
    showMyProfile() {
      this.$router.push({ path: `/myprofile/${this.sessionData.id}` })
    },
    showLogin() {
      this.$router.push({path: '/login'})
    },
    signOut(){
      SessionService.destroySession();
      this.isLogged = false;
      this.sessionData = null;
      this.$router.push({path: '/'})
    },
    checkSession() {
      this.sessionData  = SessionService.getSession();

      this.isLogged = this.sessionData  !== null && this.sessionData .id !== null;
    }
  },
  created() {
    this.checkSession();
  }
}
</script>

<style scoped>

</style>