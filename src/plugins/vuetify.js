import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.indigo.darken1, // #E53935
                secondary: colors.blueGrey.darken2, // #FFCDD2
                background2: colors.blueGrey.darken1,
                background: colors.blueGrey.darken2,
                warning: colors.red,
            },
        },
    },
});
