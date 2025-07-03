import {useEffect, useState, useCallback} from "react";
import {CityInfo} from "./CityInfo";
import {Properties} from "./Properties";
import {type WeatherData} from "../utils/weather-app-types";
import {Skeleton} from "./templates/Skeleton.tsx";

type Props = {
    city: string;
    setCity: (city: string) => void;
    onOpenPopup: () => void;
    citiesList: string[];
    setCitiesList: React.Dispatch<React.SetStateAction<string[]>>;
};

export const WeatherApp = ({
                               city,
                               setCity,
                               onOpenPopup,
                               citiesList,
                               setCitiesList,
                           }: Props) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCitiesList, setShowCitiesList] = useState(false);


    const fetchWeather = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_KEY}&q=${city}&aqi=no`
            );

            if (!response.ok) {
                console.log(new Error(`HTTP error! status: ${response.status}`));
            }

            const weatherData = await response.json();

            if (weatherData.error) {
                console.log(new Error(`City not found`));
            }

            const {
                current: {
                    cloud,
                    temp_c,
                    humidity,
                    last_updated: observationTime,
                    pressure_mb: pressure,
                    uv: uvIndex,
                    vis_km: visibility,
                    is_day: isDay,
                    condition,
                    wind_kph: windSpeed,
                },
                location: {name},
            } = weatherData;

            const cleanData: WeatherData = {
                isDay: isDay === 1 ? "is-day" : "",
                city: name,
                temp_c: Math.round(temp_c),
                observationTime,
                condition: condition.text,
                properties: [
                    {title: "cloud", value: `${cloud}%`},
                    {title: "humidity", value: `${humidity}%`},
                    {title: "wind speed", value: `${windSpeed} km/h`},
                    {title: "pressure", value: `${pressure} mb`},
                    {title: "uv Index", value: `${uvIndex} / 10`},
                    {title: "visibility", value: `${visibility} km`},
                ],
            };

            setWeather(cleanData);
            const serverCityName = cleanData.city;

            setCitiesList((prev) => {
                const filteredPrev = prev.filter(c => c !== serverCityName);

                return [serverCityName, ...filteredPrev].slice(0, 5);
            });


            setCity(cleanData.city);

        } catch (err) {
            console.error("Fetch error:", err);
            setError(err instanceof Error ? err.message : "Failed to load weather data");
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    }, [city, setCitiesList, setCity]);


    useEffect(() => {
        const controller = new AbortController();
        fetchWeather();
        return () => controller.abort();
    }, [fetchWeather]);

    const toggleCitiesList = () => {
        setShowCitiesList(!showCitiesList);
    };

    const handleCitySelect = (selectedCity: string) => {
            setCity(selectedCity);
            setShowCitiesList(false);
    };

    if (error) {
        return (
            <div className="container">
                <div className="error-message">{error}</div>
                <button
                    onClick={onOpenPopup}
                    className="retry-button"
                >
                    Try another city
                </button>
            </div>
        );
    }


    if (isLoading || !weather) {
        return (
            <div className="container">
                <Skeleton />
            </div>
        );
    }

    return (
        <div>
        <div className={`container ${weather.isDay}`}>

            <div className="top" >
                <div className="city">
                    <div className="city-subtitle">Weather Today in</div>
                    <div
                        className="city-title"
                        onClick={toggleCitiesList}
                        style={{cursor: 'pointer'}}
                    >
                        <span>{weather.city}</span>
                    </div>

                    {showCitiesList && citiesList.length > 0 && (
                        <div className="recent-cities-list">
                            <p>Recent cities:</p>
                            {citiesList.map((item) => (
                                    <button
                                        key={item}
                                        className="city-suggestion"
                                        onClick={() => handleCitySelect(item)}
                                    >
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                    )}

                    <button
                        className="city-add-button"
                        onClick={onOpenPopup}
                    >
                        + Change City
                    </button>
                </div>

                <CityInfo
                    condition={weather.condition}
                    observationTime={weather.observationTime}
                    temp_c={weather.temp_c}
                />
            </div>

            <div>
                <Properties properties={weather.properties} />
            </div>
        </div>
        </div>
    );
};