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
       <v-text-field color="white" label="Username"></v-text-field>
       <v-text-field color="white" type="password" label="Password"></v-text-field>
       <div class="text-center">
        <div class="my-1">
           <v-btn color="primary" class="mr-4" >
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
export default {
  name: "LoginPage",
  methods: {
    showRegisterPage() {
      this.$router.push({path: '/register'})
    },
  }
}
</script>

<style scoped>

</style>