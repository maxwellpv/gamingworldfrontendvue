<template>
      <div>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Sign In
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="font-weight-black pb-10">
              Confirm Tournament registration?
            </v-card-title>
            <v-card-subtitle>
                Are you sure you want to register by paying the entry price?
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="warning" @click="dialog = false" dark>
                No
              </v-btn>
              <v-btn color="primary" @click="dialog = false" dark>
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
</template>

<script>
export default {
  name: "ConfirmTournamentDialog",
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped>

</style>