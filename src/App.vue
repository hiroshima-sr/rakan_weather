<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.primary }">
    <!-- <Header :style="{ background: $vuetify.theme.themes.light.header }"/> -->
    <v-main>
      <HelloWorld/>
    </v-main>
    <Footer :style="{ background: $vuetify.theme.themes.light.primary }"/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
//import Header from './components/C-Header.vue'
import Footer from './components/C-Footer.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
    //Header,
    Footer
  },

  data: () => ({
    //
  }),
}
</script>
