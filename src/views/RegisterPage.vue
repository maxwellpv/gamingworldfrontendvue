<template>
<v-container fluid>
  <v-card color="primary" class="mx-auto mt-16" max-width="600" align="center">
    <v-card-title class="white--text">Sign Up</v-card-title>
    <div class="pa-7">
    <v-text-field color="white" label="Name"></v-text-field>
    <v-text-field color="white" label="Last Name"></v-text-field>
    <v-text-field color="white" type="email" label="Email"></v-text-field>
    <v-text-field color="white" label="Username"></v-text-field>
    <v-text-field color="white" type="password" label="Password"></v-text-field>
    <v-text-field color="white" type="password" label="Confirm Password"></v-text-field>
    </div>
    <v-row align="center" justify="space-around">
      <div class="my-1">
        <v-btn color="primary" class="mb-3" >
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
export default {
  name: "RegisterPage"
}
</script>

<style scoped>

</style>