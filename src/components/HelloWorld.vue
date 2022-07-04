<template>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>

      <v-col
        v-for="(value, index) in rakan"
        :key="index"
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-5">{{ value.dateStr }}</h2>

        <v-row>
          <v-col>
            <v-card class="mx-auto" max-width="400">
              <v-card-text class="py-5">
                <v-card-title class="text-h4">
                  <v-row>
                    <v-col> 気温 </v-col>
                    <v-col class="text-right">
                      <v-icon x-large color="red darken-2 pb-6"> mdi-thermometer-lines </v-icon>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-subtitle> 最小温度～最大温度 </v-card-subtitle>
                <div class="text-h4 ml-4" cols="6">
                  {{ value.minTemp }}~{{ value.maxTemp }}&deg;C
                </div>

                <v-card-subtitle class="mt-4"> 平均温度 </v-card-subtitle>
                <div class="text-h5 ml-4" cols="6">
                  {{ value.avgTemp }}&deg;C
                </div>

              </v-card-text>

              <v-divider></v-divider>

              <v-card-text class="py-5">
                <v-card-title class="text-h4">
                  <v-row>
                    <v-col> 雨量 </v-col>
                    <v-col class="text-right">
                      <v-icon x-large color="blue darken-2 pb-6"> mdi-weather-pouring </v-icon>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-subtitle> 最小雨量～最大雨量 </v-card-subtitle>
                <div class="text-h4 ml-4" cols="6">
                  {{ value.minRain }}~{{ value.maxRain }}mm
                </div>

                <v-card-subtitle class="mt-4"> 平均雨量 </v-card-subtitle>
                <div class="text-h5 ml-4" cols="6">
                  {{ value.avgRain }}mm
                </div>

              </v-card-text>

              <v-divider></v-divider>

              <!-- <v-list-item density="compact">
                <v-list-item-avatar left>
                  <v-icon icon="mdi-weather-windy"></v-icon>
                </v-list-item-avatar>

                <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
              </v-list-item>

              <v-list-item density="compact">
                <v-list-item-avatar left>
                  <v-icon icon="mdi-weather-pouring"></v-icon>
                </v-list-item-avatar>

                <v-list-item-subtitle>48%</v-list-item-subtitle>
              </v-list-item> -->
            </v-card>
          </v-col>

          <v-col>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">時刻(h)</th>
                  <th class="text-left">降水量(mm)</th>
                  <th class="text-left">気温(℃)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, index) in value.hour" :key="index">
                  <td>{{ value.hour[index] }}</td>
                  <td>{{ value.precipitation[index] }}</td>
                  <td>{{ value.temperature[index] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import rakan from "../assets/raka.json";
export default {
  name: "HelloWorld",

  data: () => ({
    rakan: rakan,
  }),
};
</script>
