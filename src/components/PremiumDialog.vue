<template>
  <v-card >
    <v-card-title class="justify-start " >
      Support GamingWorld
    </v-card-title>
    <v-card-text>
      Become a premium member and be able to create tournaments without the need to manage them.
    </v-card-text>
    <v-icon size="75" class="d-flex justify-center">
      mdi-credit-card-outline
    </v-icon>
    <template>
      <div class="text-center pa-3">
        <v-dialog v-model="dialog" width="500">
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
                Tired of having to manage big tournaments with a lot of participants?
              </h3>
            </v-card-subtitle>
            <v-card-text class="pb-10">
              Dont worry, with our premium service we can manage all the details about the tournament for you.
              You won't have to do anything. Just sit and relax while our admins sets the scores and other vital information.
            </v-card-text>

            <div class="d-flex justify-center">
              <v-card color="background2"  width="auto" class="align-center" dark>
                <v-card-title class="justify-center">Premium Plan <br> $5.00/Monthly</v-card-title>
              </v-card>
            </div>
            <br>
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