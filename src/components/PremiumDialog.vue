<template>
  <v-card >
    <v-card-title class="justify-start " >
      Support <br> GamingWorld
    </v-card-title>
    <v-card-text>
      Become a premium member and get access to exclusive tools to find
      users with the same competitive level and interest than you for just 5$.
    </v-card-text>
    <v-icon size="75" class="d-flex justify-center">
      mdi-credit-card-outline
    </v-icon>
    <template>
      <div class="text-center pa-3">
        <v-dialog v-model="dialog" width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" width="100%" >
              More Information
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="font-weight-black pb-10">
              Subscribe to GamingWorld
            </v-card-title>
            <v-card-subtitle>
              <h3>
                Are you a competitive player?
              </h3>
            </v-card-subtitle>
            <v-card-text class="pb-10">
              Be able to match with players with the same skill cap than you
              and improve your chance of success!
            </v-card-text>
            <v-card-subtitle>
              <h3>
                Are you a streamer?
              </h3>
            </v-card-subtitle>
            <v-card-text>
              Match with other videogame content creators and expand your
              community by sharing common events!
            </v-card-text>

            <div class="d-flex justify-center">
              <v-card color="background2"  width="auto" class="align-center" dark>
                <v-card-title class="justify-center">Premium Plan <br> $5.00/Monthly</v-card-title>
              </v-card>
            </div>
            <v-card-actions>
              <v-btn color="warning" @click="dialog = false" dark>
                Close
              </v-btn>
              <v-btn color="primary" @click="dialog = false" dark>
                Purchase
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "premium-dialog",
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped>

</style>