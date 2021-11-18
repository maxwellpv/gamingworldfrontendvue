<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row >
          <template v-for="(publication) in sortedArray">
            <v-col :sm="12" :key="publication.title">
              <v-card >
                <v-img height="350px" v-bind:src="publication.urlToImage"></v-img>
                <v-container fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{publication.title}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-spacer></v-spacer>

                <v-card-text>
                  {{publication.content}}
                  <div v-if="publication.publicationType===3">
                    <v-divider class="my-2"></v-divider>
                    <h4 >Participant Limit: {{publication.participantLimit}}</h4>
                    <h4 >Date: {{publication.tDate}} - Hour: {{publication.tHour}}</h4>
                    <h4 >Prize Pool: {{publication.prizePool}} $</h4>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <template>
                    <v-chip small v-if="publication.gameName!=null"
                            color="secondary" class="white--text"
                            style="margin-right: 10px">
                      {{ publication.gameName }}
                    </v-chip>
                  </template>
                  <template v-for="user in users">
                    <v-chip :key="user.id" v-if="publication.userId!=null && user.id === publication.userId" small
                            color="secondary" class="white--text">
                      {{ user.username }}
                    </v-chip>
                  </template>
                  <v-spacer></v-spacer>
                  <div v-if="publication.publicationType===3" >
                    <v-layout>
                      <confirm-tournament-dialog></confirm-tournament-dialog>

                      <v-btn
                          color="primary"
                          dark
                          @click="showTournament(publication.id)"
                          style="margin-left: 10px"
                      >
                        View
                      </v-btn>
                    </v-layout>


                  </div>

                </v-card-actions>


              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import ConfirmTournamentDialog from "./ConfirmTournamentDialog";
export default {

  name: 'publications-content',
  components: {ConfirmTournamentDialog},
  methods: {
    showTournament(id) {
      this.$router.push(`/tournament/${id}`)
    }
  },
  props: {
    publications: Array,
    users: Array,
    games: Array

  },
  computed: {
    sortedArray: function() {
      function compare(a, b) {
        if (new Date(a.publicatedAt) > new Date(b.publicatedAt))
          return -1;
        if (new Date(a.publicatedAt) < new Date(b.publicatedAt))
          return 1;
        return 0;
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.publications.sort(compare);
    }
  }
};

</script>

<style scoped>

</style>