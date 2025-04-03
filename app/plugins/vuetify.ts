// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#5E35B1",
    secondary: "#FFC107",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
      variations: {
        colors: ["primary", "secondary"],
        lighten: 2,
        darken: 2,
      },
    },
  });
  app.vueApp.use(vuetify);
});
