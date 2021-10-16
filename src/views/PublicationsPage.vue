<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-row no-gutters>
      <v-col xs="12" sm="3"></v-col>
      <v-col xs="12" sm="6">
          <v-card>
            <v-card-text>
              <v-dialog
                  v-model="dialogP"
                  persistent
                  max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn width="100%" rounded class="text-none"
                      v-bind="attrs"
                      v-on="on"
                  >
                  Publish something!
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">New Publication</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-text-field
                              label="Title*"
                              required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-textarea
                              solo
                              label="Content"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="imgtest"
                              label="Image URL"
                          ></v-text-field>
                          <v-img v-if="imgtest!=''" :src="this.imgtest"></v-img>
                        </v-col>
                        <v-file-input
                            accept="image/*"
                            label="File input"
                        ></v-file-input>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="warning"
                        dark
                        @click="dialogP = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="dialogP = false"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-divider class="ma-2"></v-divider>
              <div class="d-flex justify-space-around">
                <v-dialog
                    v-model="dialogT"
                    persistent
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn width="50%" text
                           v-bind="attrs"
                           v-on="on"
                    >
                        <v-icon>mdi-gamepad</v-icon>
                        Tip/Task
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">New Tip / Task</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                label="Title*"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-row justify="space-around" width class="ma-5" fluid>
                            <div
                                v-for="(game, i) in popularGames"
                                :key="i"
                                class=""
                            >
                              <v-col align="center">
                                <v-img src="game.imageURL"></v-img>
                                <v-checkbox color="blue" id="game.id" :label="game.name" v-model="selectedPopularGames[i]"></v-checkbox>
                              </v-col>
                            </div>
                          </v-row>

                          <v-col cols="12">
                            <v-textarea
                                solo
                                label="Content"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Image URL"
                            ></v-text-field>
                          </v-col>
                          <v-file-input
                              accept="image/*"
                              label="File input"
                          ></v-file-input>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="primary"
                          dark
                          @click="dialogT = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          color="warning"
                          dark
                          @click="dialogT = false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog
                    v-model="dialogTr"
                    persistent
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn width="50%" text
                           v-bind="attrs"
                           v-on="on"
                    >
                      <v-icon>mdi-medal</v-icon>
                      Tournament
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">New Tournament</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                label="Name*"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field v-model="imgtest"
                                label="Banner URL"
                            ></v-text-field>
                            <v-img :src="this.imgtest"></v-img>
                          </v-col>
                          <v-col cols="12">
                            <v-file-input
                                accept="image/*"
                                label="File input"
                            ></v-file-input>
                          </v-col>


                          <v-row justify="space-around" width class="ma-5" fluid>
                            <div
                                v-for="(game, i) in popularGames"
                                :key="i"
                                class=""
                            >
                              <v-col align="center">
                                <v-img src="game.imageURL"></v-img>
                                <v-checkbox color="blue" id="game.id" :label="game.name" v-model="selectedPopularGames[i]"></v-checkbox>
                              </v-col>
                            </div>
                          </v-row>

                          <v-col cols="12">
                            <v-textarea
                                solo
                                label="Tournament description"
                            ></v-textarea>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                                label="Participant Limit"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Prize Pool"
                            ></v-text-field>
                          </v-col>


                        </v-row>
<!--                        <v-row>-->
<!--                          <v-col-->
<!--                              cols="12"-->
<!--                              sm="6"-->
<!--                              md="4"-->
<!--                          >-->
<!--                            <v-text-field-->
<!--                                label="Legal first name*"-->
<!--                                required-->
<!--                            ></v-text-field>-->
<!--                          </v-col>-->
<!--                          <v-col-->
<!--                              cols="12"-->
<!--                              sm="6"-->
<!--                              md="4"-->
<!--                          >-->
<!--                            <v-text-field-->
<!--                                label="Legal middle name"-->
<!--                                hint="example of helper text only on focus"-->
<!--                            ></v-text-field>-->
<!--                          </v-col>-->
<!--                          <v-col-->
<!--                              cols="12"-->
<!--                              sm="6"-->
<!--                              md="4"-->
<!--                          >-->
<!--                            <v-text-field-->
<!--                                label="Legal last name*"-->
<!--                                hint="example of persistent helper text"-->
<!--                                persistent-hint-->
<!--                                required-->
<!--                            ></v-text-field>-->
<!--                          </v-col>-->
<!--                          <v-col cols="12">-->
<!--                            <v-text-field-->
<!--                                label="Email*"-->
<!--                                required-->
<!--                            ></v-text-field>-->
<!--                          </v-col>-->
<!--                          <v-col cols="12">-->
<!--                            <v-text-field-->
<!--                                label="Password*"-->
<!--                                type="password"-->
<!--                                required-->
<!--                            ></v-text-field>-->
<!--                          </v-col>-->
<!--                          <v-col-->
<!--                              cols="12"-->
<!--                              sm="6"-->
<!--                          >-->
<!--                            <v-select-->
<!--                                :items="['0-17', '18-29', '30-54', '54+']"-->
<!--                                label="Age*"-->
<!--                                required-->
<!--                            ></v-select>-->
<!--                          </v-col>-->
<!--                          <v-col-->
<!--                              cols="12"-->
<!--                              sm="6"-->
<!--                          >-->
<!--                            <v-autocomplete-->
<!--                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"-->
<!--                                label="Interests"-->
<!--                                multiple-->
<!--                            ></v-autocomplete>-->
<!--                          </v-col>-->
<!--                        </v-row>-->
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogTr = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogTr = false"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>

          </v-card>
      </v-col>
      <v-col xs="12" sm="3"></v-col>
    </v-row>







  </v-container>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
  name: "publications-page",
  components: {
    NavBar,
  },
  data: () => ({
    dialogP: false,
    dialogT: false,
    dialogTr: false,
    imgtest: "",
    selectedPopularGames: Array(0),
    popularGames: [
      {
        id: 0,
        name: "CS: GO",
        imageURL: ""
      },
      {
        id: 1,
        name: "LoL",
        imageURL: ""
      },
      {
        id: 2,
        name: "Fortnite",
        imageURL: ""
      },
      {
        id: 3,
        name: "CoD: Warzone",
        imageURL: ""
      },
      {
        id: 4,
        name: "Valorant",
        imageURL: ""
      }
    ]
  }),
}
</script>

<style scoped>

</style>