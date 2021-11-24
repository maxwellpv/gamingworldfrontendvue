<template>
<v-container fluid>
  <v-card color="primary" class="mx-auto mt-16" max-width="600" align="center">
    <v-card-title class="white--text">Sign Up</v-card-title>
    <div class="pa-7">
    <v-text-field color="white" label="Name" v-model="registerData.firstName"></v-text-field>
    <v-text-field color="white" label="Last Name" v-model="registerData.lastName"></v-text-field>
    <v-text-field color="white" type="email" label="Email" v-model="registerData.email"></v-text-field>
    <v-text-field color="white" label="Username" v-model="registerData.username"></v-text-field>
    <v-text-field color="white" type="password" label="Password" v-model="registerData.password"></v-text-field>
    <v-text-field color="white" type="password" label="Confirm Password" v-model="confirmPassword"></v-text-field>
    </div>
    <v-row align="center" justify="space-around">
      <div class="my-1">
        <v-btn @click="register" color="primary" class="mb-3">
          Register
        </v-btn>
      </div>
      <div class="my-1">
        <v-btn color="error" class="mb-3" >
          Cancel
        </v-btn>
      </div>
    </v-row>
  </v-card>
</v-container>
</template>

<script>
import UsersService from "@/services/users.service";

export default {
  name: "RegisterPage",
  data: () => {
    return {
      confirmPassword: "",
      registerData: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    register() {
      UsersService.signUp(this.registerData).then(
          () => {
            this.$router.push({path: '/login'})
          }
      ).catch((error) => {
        if( error.response ){
          alert(error.response.data.message);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>