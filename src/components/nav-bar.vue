<template>
  <!--  Navigation Bar  -->
  <v-container>
    <v-app-bar app color="primary" flat dark>
      <v-toolbar-title>GamingWorld</v-toolbar-title>
      <v-spacer></v-spacer>
      <template class="d-flex justify-center red">
        <v-text-field class="d-flex mt-auto" style="max-width: 250px"
                      label="Search ..." append-icon="mdi-magnify"  solo flat  background-color="primary" dark></v-text-field>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-multiple</v-icon>
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
          <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "nav-bar"
}
</script>

<style scoped>

</style>