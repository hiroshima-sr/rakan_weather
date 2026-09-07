<template>
  <v-footer class="d-flex flex-column mb-2">
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
  name: "CFooter",
};
</script>
