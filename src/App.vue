<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.primary }">
    <v-main>
      <WeatherForecast/>
    </v-main>
    <Footer :style="{ background: $vuetify.theme.themes.light.primary }"/>
  </v-app>
</template>

<script>
import WeatherForecast from './components/WeatherForecast.vue'
import Footer from './components/C-Footer.vue'

export default {
  name: 'App',

  components: {
    WeatherForecast,
    Footer
  },

  data: () => ({
    //
  }),
}
</script>
