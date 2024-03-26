<template>
  <v-footer class="d-flex flex-column mb-2">
    <v-card
      flat
      tile
      class="white--text text-center d-flex mb-1 pa-2"
    >

      <v-card-text class="white--text pt-5 pa-0"> <div>Twitter</div> </v-card-text>
      <v-card-text class="text-center pa-2">
        <div class="d-flex mb-8">
        <v-btn
          v-for="(v,i) in icons"
          :key="i"
          :href="hrefs[i]"
          class="mx-4 white--text lighten-1 white--text pa-2"
          icon
          fixed
          left
        >
          <v-icon size="24px">
            {{ icons[i] }}
          </v-icon>
        </v-btn>
        </div>
      </v-card-text>


    </v-card>
    <v-card-text class="white--text pa-2">
       <div>現在開発段階です。</div> 
       <div>実際の状況とは情報が異なる場合がございます。</div> 
      </v-card-text>
    <v-card-text class="white--text pa-2">
        {{ new Date().getFullYear() }} © <strong>sr</strong>. All Rights Reserved.
      </v-card-text>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [""],
    hrefs: [""]
  }),
};
</script>

<!--
<style >
.v-btn {
  display: initial;
}
</style>
-->
