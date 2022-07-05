<template>
  <v-container>
    <v-row>
      <v-col cols="12"> </v-col>

      <v-card>
        <v-tabs
          v-model="tab"
          background-color="cyan"
          centered
          stacked
          center-active
        >
          <v-tab v-for="value in rakan" :key="value.dateStr">
            {{ value.dateStr }}
          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item v-for="value in rakan" :key="value.dateStr">
              <v-row>
                <v-col>
                  <v-card class="mx-auto" max-width="400">
                    <v-card-text v-if="value.status !== 'normal'" class="py-5">
                      <v-card-title class="text-h4">
                        <v-row>
                          <v-col> {{d_status[value.status].title}} </v-col>
                          <v-col class="text-right">
                            <v-icon x-large color="red darken-2 pb-3">
                              {{d_status[value.status].icon}}
                            </v-icon>
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-card-subtitle>  </v-card-subtitle>
                      <div class="text-h4 ml-4" cols="6">
                        {{d_status[value.status].text}}
                      </div>
                    </v-card-text>

                    <v-divider></v-divider>
                    
                    <v-card-text class="py-5">
                      <v-card-title class="text-h4">
                        <v-row>
                          <v-col> 気温 </v-col>
                          <v-col class="text-right">
                            <v-icon x-large color="red darken-2 pb-6">
                              mdi-thermometer-lines
                            </v-icon>
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
                            <v-icon x-large color="blue darken-2 pb-6">
                              mdi-weather-pouring
                            </v-icon>
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
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>

  <div class="d-flex align-center flex-column">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn variant="outlined" color="primary" v-bind="props">
          このサイトについて
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">このサイトについて</span>
        </v-card-title>
        <v-card-text>
          <div>
            <v-alert
              border="start"
              border-color="warning accent-4"
              elevation="2"
              title="注意事項"
            >
              <div>
                このサイトを利用して生じたいかなる問題についても、当サイトは一切責任を負わないものとします。
              </div>
              <div>実際の状況とデータに差異がある場合があります。</div>
            </v-alert>
          </div>

          <v-divider></v-divider>
          <div class="mt-4">
            <v-alert
              border="start"
              border-color="deep-purple accent-4"
              elevation="2"
              title="ライセンス"
            >
              <div>このサイトは下記のサイトデータを参照しています。</div>
              <div>
                <a href="https://open-meteo.com/" rel="nofollow"
                  >Weather data by Open-Meteo.com</a
                >
              </div>
            </v-alert>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" text @click="dialog = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import rakan from "../assets/raka.json";
export default {
  name: "HelloWorld",

  data: () => ({
    rakan: rakan,
    dialog: false,
    tab: null,
    d_status: {
      po: {
        icon: "mdi-block-helper",
        title: "交通整理中",
        text: "現在交通整理が行われています。",
      },
      zi: {
        icon: "mdi-block-helper",
        title: "事故発生",
        text: "現在事故が発生しています。",
      },
    },
  }),
};
</script>
