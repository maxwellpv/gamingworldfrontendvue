<template>
  <v-container class="fill-height" fluid>
 <v-row align="center" justify="center" >
    <v-col cols="4">
      <v-img src="@/assets/loginImage.png" max-width="700" class="ml-16"
      ></v-img>
    </v-col>
   <v-col cols="6">
     <v-card color="primary" elevation="2" class="pa-16 ml-16" max-width="700">
       <v-card-title class="white--text">Gaming World </v-card-title>
       <v-text-field color="white" label="Username" v-model="username"></v-text-field>
       <v-text-field color="white" type="password" label="Password" v-model="password"></v-text-field>
       <div class="text-center">
        <div class="my-1">
           <v-btn @click="login" color="primary" class="mr-4" >
               Login
            </v-btn>
          </div>
       <div class="my-1">
       <v-btn @click="showRegisterPage" color="primary" class="mt-10" >
         Register
       </v-btn>
       </div>
       </div>
     </v-card>
   </v-col>
 </v-row>
  </v-container>
</template>

<script>
import UsersService from "@/services/users.service";
import SessionService from "@/services/session.service";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    showRegisterPage() {
      this.$router.push({path: '/register'})
    },
    login() {
      let data = {username: this.username, password: this.password};
      UsersService.signIn(data).then(
          (response) => {
            SessionService.createSession(response.data);
            this.$router.push({path: '/'})
          }
      ).catch(() => {
        alert("Wrong user or password.");
      });
    }
  }
}
</script>

<style scoped>

</style>