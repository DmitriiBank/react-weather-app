import { useState, useEffect } from "react";
import { WeatherApp } from "./components/WeatherApp";
import { Popup } from "./components/templates/Popup";

const CITIES_STORAGE_KEY = "weatherAppCities";

export default function App() {
    const [city, setCity] = useState<string>("");
    const [citiesList, setCitiesList] = useState<string[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isGeolocating, setIsGeolocating] = useState(true);


    useEffect(() => {
        const getCityByGeolocation = async (lat: number, lon: number) => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_GEOCODING_KEY}`
                );

                const data = await response.json();
                return data[0]?.name || "Moscow";
            } catch (error) {
                console.error("Geocoding error:", error);
                return "";
            }
        };

        const handleGeolocation = async () => {
            let parsed: string[] = [];

            const stored = localStorage.getItem(CITIES_STORAGE_KEY);
            if (stored) {
                parsed = JSON.parse(stored);
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const detectedCity = await getCityByGeolocation(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                        if (detectedCity) {
                            parsed = [detectedCity, ...parsed.filter(c => c !== detectedCity)].slice(0, 5);
                        }

                        setCitiesList(parsed);
                        setCity(parsed[0] || "Tel Aviv");
                        setIsGeolocating(false);
                    },
                    () => {
                        setCitiesList(parsed);
                        setCity(parsed[0] || "Tel Aviv");
                        setIsGeolocating(false);
                    }
                );

            } else {
                setCitiesList(parsed);
                setCity(parsed[0] || "Tel Aviv");
                setIsGeolocating(false);
            }
        };


        handleGeolocation();
    }, []);


    useEffect(() => {
        if (citiesList.length > 0) {
            localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(citiesList));
        }
    }, [citiesList]);

    const handleCityChange = (newCity: string) => {
        setCity(newCity);
        setIsPopupOpen(false);
    };

    if (isGeolocating) {
        return (
            <div className="container">
                <div className="loading">Определяем ваше местоположение...</div>
            </div>
        );
    }

    return (
        <div className={'app'}>
            <WeatherApp
                city={city}
                onOpenPopup={() => setIsPopupOpen(true)}
                citiesList={citiesList}
                setCitiesList={setCitiesList}
                setCity={setCity}
            />
            {isPopupOpen && (
                <Popup
                    onClose={() => setIsPopupOpen(false)}
                    onSubmit={handleCityChange}
                />
            )}
        </div>
    );
}