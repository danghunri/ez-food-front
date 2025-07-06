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

const myCustomDarkTheme = {
  dark: true,
  colors: {
    primary: "#7C4DFF",
    secondary: "#FFD54F",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme,
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
