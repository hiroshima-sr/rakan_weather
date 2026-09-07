const axiosBase = require('axios');
const fs = require('fs');

const weathercode = {
    0: {
        code:0,
        mark: "mdi-weather-sunny",
        color:"",
        text: "晴れ",
    },
    1: {
        code:1,
        mark: "mdi-weather-sunny",
        color:"",
        text: "晴れ",
    },
    2: {
        code:2,
        mark: "mdi-weather-partlycloudy",
        color:"",
        text: "晴れ時々曇り",
    },
    3: {
        code:3,
        mark: "mdi-weather-cloudy",
        color:"",
        text: "曇り",
    },
    45: {
        code:45,
        mark: "mdi-weather-fog",
        color:"",
        text: "霧",
    },
    48: {
        code:48,
        mark: "mdi-weather-fog",
        color:"",
        text: "霧",
    },
    51: {
        code:51,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    53: {
        code:53,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    55: {
        code:55,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    56: {
        code:56,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    57: {
        code:57,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    61: {
        code:61,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    63: {
        code:63,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    65: {
        code:65,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    66: {
        code:66,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    67: {
        code:67,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    71: {
        code:71,
        mark: "mdi-weather-hail",
        color:"",
        text: "雪",
    },
    73: {
        code:73,
        mark: "mdi-weather-snowy",
        color:"",
        text: "雪",
    },
    75: {
        code:75,
        mark: "mdi-weather-snowy",
        color:"",
        text: "雪",
    },
    77: {
        code:77,
        mark: "mdi-weather-snowy",
        color:"",
        text: "雪",
    },
    80: {
        code:80,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    81: {
        code:81,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    82: {
        code:82,
        mark: "mdi-weather-pouring",
        color:"",
        text: "雨",
    },
    85: {
        code:85,
        mark: "mdi-weather-snowy",
        color:"",
        text: "雪",
    },
    86: {
        code:86,
        mark: "mdi-weather-snowy",
        color:"",
        text: "雪",
    },
    95: {
        code:95,
        mark: "mdi-weather-lightning-rainy",
        color:"",
        text: "雷雨",
    },
    96: {
        code:96,
        mark: "mdi-weather-lightning-rainy",
        color:"",
        text: "雷雨(雹を伴う)",
    },
    99: {
        code:99,
        mark: "mdi-weather-lightning-rainy",
        color:"",
        text: "雷雨(雹を伴う)",
    },
    100: {
        code:100,
        mark: "mdi-comment-question-outline",
        color:"",
        text: "不明",
    },
}

const axios = axiosBase.create({
    baseURL: 'https://api.open-meteo.com',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json'
});


const sum = (arr) => {
    return arr.reduce(function (prev, current) {
        return prev + current;
    }, 0);
};
const average = (arr) => {
    return (Math.round((sum(arr) / arr.length) * 10) / 10);
};

const hashiriStatus = (hourly, date, dateStr) => {
    const temp = {
        date: date,
        dateStr: dateStr,
        maxTemp: 0,
        minTemp: 0,
        maxRain: 0,
        minRain: 0,
        avgTemp: 0,
        avgRain: 0,
        hour: [],
        precipitation: [],
        temperature: [],
        weathercode: []
    };
    hourly['precipitation'].forEach((element, index) => {
        const hou = new Date(hourly['time'][index]);

        const fase = hou.getDate() === date.getDate() &&
            12 <= hou.getHours() && hou.getHours() <= 23;

        const lose = hou.getDate() === date.getDate() + 1 &&
            hou.getHours() >= 0 && hou.getHours() <= 12;

        if (fase || lose) {
            temp['hour'].push(hou.getHours());
            temp['precipitation'].push(hourly['precipitation'][index]);
            temp['temperature'].push(hourly['temperature_2m'][index]);
            temp['weathercode'].push(weathercode[(hourly['weathercode'][index])]);
        }
    });
    temp['maxTemp'] = Math.max(...temp['temperature']);
    temp['minTemp'] = Math.min(...temp['temperature']);
    temp['maxRain'] = Math.max(...temp['precipitation']);
    temp['minRain'] = Math.min(...temp['precipitation']);
    temp['avgTemp'] = average(temp['temperature']);
    temp['avgRain'] = average(temp['precipitation']);

    const wccopy = JSON.parse(JSON.stringify(temp['weathercode']));
    const half = Math.ceil(wccopy.length / 2);    
    const firstHalf = wccopy.splice(0, half);
    const secondHalf = wccopy.splice(-half);
    temp['lowWeathercode'] = firstHalf.reduce((prev, current) => {
        return prev.code > current.code ? prev : current;
    }, {});
    temp['upperWeathercode'] = secondHalf.reduce((prev, current) => {
        return prev.code > current.code ? prev : current;
    }, {});

    return temp;
}

const getBreeds = async () => {
    try {
        const result = await axios.get('/v1/forecast?latitude=34.3892&longitude=132.1044&hourly=temperature_2m,precipitation,weathercode&daily=weathercode&timezone=Asia%2FTokyo');
        return result.data;
    } catch (error) {
        if (error.response) {
            const { status, statusText } = error.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`);
        } else {
            console.log(`Error! ${error.message}`);
        }
        throw error;
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
    const hourly = result["hourly"];
    day.forEach((element, index) => {
        const you = ["日", "月", "火", "水", "木", "金", "土"][element.getDay()];
        const daytext = (element.getMonth() + 1) + "月" + element.getDate() + "日(" + you + ")";
        const dayInfo = hashiriStatus(hourly, element, daytext);
        R_date.push(dayInfo)
    });
    console.log(R_date);
    const R_date_temp = JSON.stringify(R_date, null, ' ');
    fs.writeFile('./src/assets/raka.json', R_date_temp, (err, data) => {
        if (err) console.log(err);
    });
});

