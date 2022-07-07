const axiosBase = require('axios');
const fs = require('fs');

const axios = axiosBase.create({
    baseURL: 'https://api.open-meteo.com',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json'
});

// const imageGeneration = (html) => {
//     nodeHtmlToImage({
//         output: './image.png',
//         html: `<html>
//     <head>
//       <style>
//       body {
//         background-color: #FFFFDD;
//         width: 1100px;
//         height:450px;
//         }
//       p {
//         font-size: 16px;
//         font-weight: bold;
//         text-align: center;
//         margin: 60px auto 40px;
//       }
//       table {
//         margin: 20px auto;
//         border-collapse: collapse;
//         border:1px solid #333;
//       }
//       .tbl-r02 th {
//         background: #E0FFFF;
//         border-collapse: collapse;
//         border:1px solid #333;
//         color: #333;
//         padding: 10px;
//       }
//       .tbl-r02 td {
//         border-collapse: collapse;
//         border:1px solid #333;
//         padding: 10px;
//         width: 40px;
//       }
//       </style>
//     </head>
//     <body>`+
//     html
//     +`</body>
//   </html>
//   `
//     })
// };
const sum = (arr) => {
    return arr.reduce(function (prev, current, i, arr) {
        return prev + current;
    });
};
const average = (arr, fn) => {
    return (Math.round((sum(arr, fn) / arr.length) * 10) / 10);
};

const getRakan = (date) => {
    const hashiri = [];
    date.forEach((element, index) => {
        const youbi = element.getDay();
        //if (youbi === 5 || youbi === 6) {
            hashiri.push(element);
        //}
    });
    return hashiri;
}

const hashiriStatus = (hourly, date, dateStr) => {
    const temp = { 
        date: date, 
        dateStr: dateStr,
        maxTemp:0,
        minTemp:0,
        maxRain:0,
        minRain:0,
        avgTemp:0,
        avgRain:0,
        status:"normal",
        hour: [],
        precipitation: [],
        temperature: [] 
    };
    hourly['time'].forEach((element, index) => {
        const hou = new Date(element);

        const fase = hou.getDate() === date.getDate() &&
            12 <= hou.getHours() && hou.getHours() <= 23;

        const lose = hou.getDate() === date.getDate() + 1 &&
            hou.getHours() >= 0 && hou.getHours() <= 12;

        if (fase || lose) {
            temp['hour'].push(hou.getHours());
            temp['precipitation'].push(hourly['precipitation'][index]);
            temp['temperature'].push(hourly['temperature_2m'][index]);
        }
    });
    temp['maxTemp'] = Math.max(...temp['temperature']);
    temp['minTemp'] = Math.min(...temp['temperature']);
    temp['maxRain'] = Math.max(...temp['precipitation']);
    temp['minRain'] = Math.min(...temp['precipitation']);
    temp['avgTemp'] = average(temp['temperature']);
    temp['avgRain'] = average(temp['precipitation']);
    return temp;
}
const getBreeds = async () => {
    try {
        //const resultTemp = '{"longitude":132.125,"elevation":629.5,"utc_offset_seconds":32400,"daily_units":{"precipitation_sum":"mm","time":"iso8601","precipitation_hours":"h"},"latitude":34.375,"hourly_units":{"time":"iso8601","temperature_2m":"°C","precipitation":"mm"},"daily":{"precipitation_sum":[0,0,26.97,1.92,0.75,0,0],"time":["2022-06-03","2022-06-04","2022-06-05","2022-06-06","2022-06-07","2022-06-08","2022-06-09"],"precipitation_hours":[0,0,11,12,10,0,0]},"hourly":{"time":["2022-06-03T00:00","2022-06-03T01:00","2022-06-03T02:00","2022-06-03T03:00","2022-06-03T04:00","2022-06-03T05:00","2022-06-03T06:00","2022-06-03T07:00","2022-06-03T08:00","2022-06-03T09:00","2022-06-03T10:00","2022-06-03T11:00","2022-06-03T12:00","2022-06-03T13:00","2022-06-03T14:00","2022-06-03T15:00","2022-06-03T16:00","2022-06-03T17:00","2022-06-03T18:00","2022-06-03T19:00","2022-06-03T20:00","2022-06-03T21:00","2022-06-03T22:00","2022-06-03T23:00","2022-06-04T00:00","2022-06-04T01:00","2022-06-04T02:00","2022-06-04T03:00","2022-06-04T04:00","2022-06-04T05:00","2022-06-04T06:00","2022-06-04T07:00","2022-06-04T08:00","2022-06-04T09:00","2022-06-04T10:00","2022-06-04T11:00","2022-06-04T12:00","2022-06-04T13:00","2022-06-04T14:00","2022-06-04T15:00","2022-06-04T16:00","2022-06-04T17:00","2022-06-04T18:00","2022-06-04T19:00","2022-06-04T20:00","2022-06-04T21:00","2022-06-04T22:00","2022-06-04T23:00","2022-06-05T00:00","2022-06-05T01:00","2022-06-05T02:00","2022-06-05T03:00","2022-06-05T04:00","2022-06-05T05:00","2022-06-05T06:00","2022-06-05T07:00","2022-06-05T08:00","2022-06-05T09:00","2022-06-05T10:00","2022-06-05T11:00","2022-06-05T12:00","2022-06-05T13:00","2022-06-05T14:00","2022-06-05T15:00","2022-06-05T16:00","2022-06-05T17:00","2022-06-05T18:00","2022-06-05T19:00","2022-06-05T20:00","2022-06-05T21:00","2022-06-05T22:00","2022-06-05T23:00","2022-06-06T00:00","2022-06-06T01:00","2022-06-06T02:00","2022-06-06T03:00","2022-06-06T04:00","2022-06-06T05:00","2022-06-06T06:00","2022-06-06T07:00","2022-06-06T08:00","2022-06-06T09:00","2022-06-06T10:00","2022-06-06T11:00","2022-06-06T12:00","2022-06-06T13:00","2022-06-06T14:00","2022-06-06T15:00","2022-06-06T16:00","2022-06-06T17:00","2022-06-06T18:00","2022-06-06T19:00","2022-06-06T20:00","2022-06-06T21:00","2022-06-06T22:00","2022-06-06T23:00","2022-06-07T00:00","2022-06-07T01:00","2022-06-07T02:00","2022-06-07T03:00","2022-06-07T04:00","2022-06-07T05:00","2022-06-07T06:00","2022-06-07T07:00","2022-06-07T08:00","2022-06-07T09:00","2022-06-07T10:00","2022-06-07T11:00","2022-06-07T12:00","2022-06-07T13:00","2022-06-07T14:00","2022-06-07T15:00","2022-06-07T16:00","2022-06-07T17:00","2022-06-07T18:00","2022-06-07T19:00","2022-06-07T20:00","2022-06-07T21:00","2022-06-07T22:00","2022-06-07T23:00","2022-06-08T00:00","2022-06-08T01:00","2022-06-08T02:00","2022-06-08T03:00","2022-06-08T04:00","2022-06-08T05:00","2022-06-08T06:00","2022-06-08T07:00","2022-06-08T08:00","2022-06-08T09:00","2022-06-08T10:00","2022-06-08T11:00","2022-06-08T12:00","2022-06-08T13:00","2022-06-08T14:00","2022-06-08T15:00","2022-06-08T16:00","2022-06-08T17:00","2022-06-08T18:00","2022-06-08T19:00","2022-06-08T20:00","2022-06-08T21:00","2022-06-08T22:00","2022-06-08T23:00","2022-06-09T00:00","2022-06-09T01:00","2022-06-09T02:00","2022-06-09T03:00","2022-06-09T04:00","2022-06-09T05:00","2022-06-09T06:00","2022-06-09T07:00","2022-06-09T08:00","2022-06-09T09:00","2022-06-09T10:00","2022-06-09T11:00","2022-06-09T12:00","2022-06-09T13:00","2022-06-09T14:00","2022-06-09T15:00","2022-06-09T16:00","2022-06-09T17:00","2022-06-09T18:00","2022-06-09T19:00","2022-06-09T20:00","2022-06-09T21:00","2022-06-09T22:00","2022-06-09T23:00"],"temperature_2m":[14.9,14.6,14.3,14.6,14.4,14.4,15.3,18.1,19.9,21.2,22.7,24,25.2,25.6,25.2,24.9,25.3,24.4,23,20.6,17.6,16.1,15.5,14.9,14.2,13.6,12.9,12.2,11.8,11.7,12.7,16.6,20.3,21.2,22.2,23.5,24.5,25.3,25.9,25.9,25.3,24.2,22.7,20.4,18.2,17.5,17.6,17.3,17,16.4,16,15.6,15.3,15.7,16.6,17.5,17.6,17.2,16.1,15.6,14.8,14.8,15.3,15.2,15.5,15.5,15.6,15.7,15.6,15.7,15.7,15.5,15.4,15.4,15.4,15.4,15.4,15.4,15.4,15.3,15.8,16.2,16.4,16.7,16.9,16.9,16.8,17.1,17,16.9,16.6,16.5,16.4,16.2,16.2,16.3,16.3,16.2,16.1,16,15.8,15.6,15.4,15.6,15.8,16.1,16.2,16.3,16.4,16.6,16.9,16.9,16.5,15.9,15.1,14.8,14.4,14,13.8,13.5,13.2,13,12.8,12.6,12.4,12.2,12.4,13.3,14.4,15.8,16.5,17.1,17.6,17.8,17.8,17.6,17.2,16.5,15.4,14.5,13.5,12.3,11.5,10.9,10.3,10.2,10.4,10.5,10.1,9.7,9.9,11.3,13.4,15.8,16.7,17.1,17.7,18.3,19,19.6,19.4,19,18.1,17,15.6,14.2,13.9,14],"precipitation":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.34,1.25,2.48,3.4,4.55,5.88,3.96,2.63,1.29,0.06,1.13,0,0,0,0,0,0,0,0,0.01,0,0,0.04,1.02,0,0,0,0,0,0,0,0.01,0.02,0.02,0.02,0.12,0.12,0.12,0.21,0.21,0.21,0.1,0.1,0.1,0,0,0,0.03,0.03,0.03,0.05,0.05,0.05,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"generationtime_ms":1.746058464050293}';
        //return JSON.parse(resultTemp);
        const result = await axios.get('/v1/forecast?latitude=34.3892&longitude=132.1044&hourly=temperature_2m,precipitation&daily=precipitation_sum,precipitation_hours&timezone=Asia%2FTokyo');
        return result.data;
    } catch (error) {
        const {
            status,
            statusText
        } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
}

const res = getBreeds();
res.then(result => {
    const day = [];
    const daily = result["daily"];
    daily['time'].forEach((element, index) => {
        const dat = new Date(element);
        day.push(dat);
    });

    const R_date = [];
    const hashi = getRakan(day);
    const hourly = result["hourly"];
    hashi.forEach((element, index) => {
        const you = ["日", "月", "火", "水", "木", "金", "土"][element.getDay()];
        const daytext = (element.getMonth() + 1) + "月" + element.getDate() + "日(" + you + ")";
        const dayInfo = hashiriStatus(hourly, element, daytext);
        //const text = infoCreate(dayInfo);
        R_date.push(dayInfo)
    });
    console.log(R_date);
    R_date_temp = JSON.stringify(R_date, null, ' ');
    fs.writeFile('./src/assets/raka.json', R_date_temp, (err, data) => {
        if (err) console.log(err);
    });
});

