
export const cityWeather = {
    city: "",
    temp_c: 0,
    observationTime: "00:00 AM",
    isDay: "yes",
    condition: "",
    properties: {
        cloud: {},
        humidity: {},
        windSpeed: {},
        pressure: {},
        uvIndex: {},
        visibility: {},
    },
};


export interface WeatherProperty {
    title: string;
    value: string;
}

export interface WeatherData {
    isDay: string;
    city: string;
    temp_c: number;
    observationTime: string;
    condition: string;
    properties: WeatherProperty[];
}

export const mockWeatherData: Record<string, WeatherData> = {
    'Moscow': {
        isDay: 'is-day',
        city: 'Moscow',
        temp_c: 18,
        observationTime: '2025-07-03 14:30',
        condition: 'Partly cloudy',
        properties: [
            { title: 'cloud', value: '60%' },
            { title: 'humidity', value: '65%' },
            { title: 'wind speed', value: '12 km/h' },
            { title: 'pressure', value: '1013 mb' },
            { title: 'uv Index', value: '6 / 10' },
            { title: 'visibility', value: '10 km' },
        ],
    },
    'London': {
        isDay: '',
        city: 'London',
        temp_c: 22,
        observationTime: '2025-07-03 14:30',
        condition: 'Overcast',
        properties: [
            { title: 'cloud', value: '85%' },
            { title: 'humidity', value: '78%' },
            { title: 'wind speed', value: '8 km/h' },
            { title: 'pressure', value: '1008 mb' },
            { title: 'uv Index', value: '3 / 10' },
            { title: 'visibility', value: '8 km' },
        ],
    },
    'New York': {
        isDay: 'is-day',
        city: 'New York',
        temp_c: 28,
        observationTime: '2025-07-03 14:30',
        condition: 'Sunny',
        properties: [
            { title: 'cloud', value: '20%' },
            { title: 'humidity', value: '55%' },
            { title: 'wind speed', value: '15 km/h' },
            { title: 'pressure', value: '1015 mb' },
            { title: 'uv Index', value: '8 / 10' },
            { title: 'visibility', value: '12 km' },
        ],
    },
    'Tokyo': {
        isDay: 'is-day',
        city: 'Tokyo',
        temp_c: 25,
        observationTime: '2025-07-03 14:30',
        condition: 'Light rain',
        properties: [
            { title: 'cloud', value: '90%' },
            { title: 'humidity', value: '85%' },
            { title: 'wind speed', value: '6 km/h' },
            { title: 'pressure', value: '1009 mb' },
            { title: 'uv Index', value: '2 / 10' },
            { title: 'visibility', value: '6 km' },
        ],
    },
};

