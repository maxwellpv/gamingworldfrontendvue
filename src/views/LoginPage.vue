<template>
 <v-row justify="center" align="center">
    <v-col cols="6">
      <v-img
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      ></v-img>
    </v-col>
   <v-col cols="6">
     <v-card elevation="2" class="pa-16">
       <v-text-field label="Username"></v-text-field>
       <v-text-field type="password" label="Password"></v-text-field>
       <div class="text-center">
       <div class="my-1">
       <v-btn color="primary"  class="mr-4" >
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