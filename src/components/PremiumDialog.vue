<template>
  <v-card >
    <v-card-title class="justify-start " >
      {{$t('Support')}} <br> GamingWorld
    </v-card-title>
    <v-card-text>
      {{$t('Large-Text')}}
    </v-card-text>
    <v-icon size="75" class="d-flex justify-center">
      mdi-credit-card-outline
    </v-icon>
    <template>
      <div class="text-center pa-3">
        <v-dialog v-model="dialog" width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" width="100%" >
              {{$t('More-Information')}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="font-weight-black pb-10">
              {{$t('Subscribe')}}
            </v-card-title>
            <v-card-subtitle>
              <h3>
                {{$t('Question-1')}}
              </h3>
            </v-card-subtitle>
            <v-card-text class="pb-10">
              {{$t('Answer-1')}}
            </v-card-text>
            <v-card-subtitle>
              <h3>
                {{$t('Question-2')}}
              </h3>
            </v-card-subtitle>
            <v-card-text>
              {{$t('Answer-2')}}
            </v-card-text>

            <div class="d-flex justify-center">
              <v-card color="background2"  width="auto" class="align-center" dark>
                <v-card-title class="justify-center">{{$t('Plan')}} <br> {{$t('Amount')}}</v-card-title>
              </v-card>
            </div>
            <v-card-actions>
              <v-btn color="warning" @click="dialog = false" dark>
                {{$t('Close')}}
              </v-btn>
              <v-btn color="primary" @click="dialog = false" dark>
                {{$t('Purchase')}}
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

<i18n>
{
  "en": {
    "Support": "Support",
    "Large-Text": "Become a premium member and get access to exclusive tools to find users with the same competitive level and interest than you for just 5$.",
    "More-Information": "More Information",
    "Subscribe": "Subscribe to GamingWorld",
    "Question-1": "Are you a competitive player?",
    "Answer-1": "Be able to match with players with the same skill cap than you and improve your chance of success!",
    "Question-2": "Are you a streamer?",
    "Answer-2": "Match with other videogame content creators and expand your community by sharing common events!",
    "Plan": "Premium Plan",
    "Amount": "$5.00/Monthly",
    "Close": "Close",
    "Purchase": "Purchase"
  },
  "es": {
    "Support": "Apoya a",
    "Large-Text": "Conviértase en usuario premium y obtenga acceso a herramientas exclusivas para encontrar usuarios con el mismo nivel competitivo e interés que usted por solo 5$.",
    "More-Information": "Mas Informacion",
    "Subscribe": "Suscribete a GamingWorld",
    "Question-1": "¿Eres un jugador competitivo?",
    "Answer-1": "¡Podrás emparejarte con jugadores con el mismo nivel de habilidad que tú y mejorar con ellos!",
    "Question-2": "¿Eres un streamer?",
    "Answer-2": "¡Emparejate con otros creadores de contenido de videojuegos y expande tu comunidad compartiendo eventos comunes!",
    "Plan": "Plan premium",
    "Amount": "$5.00/por mes",
    "Close": "Cerrar",
    "Purchase": "Comprar"
  }
}

</i18n>