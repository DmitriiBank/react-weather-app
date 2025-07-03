type Props =  { title: string; isWeatherIcon?: boolean }

export const PropertyIcon = ({ title, isWeatherIcon = false }: Props) => {
    const value = title.toLowerCase();

    if (isWeatherIcon) {
        if (value.includes("sunny") || value.includes("clear")) {
            return <i className="fas fa-sun weather-icon" style={{ color: "#FFD700" }} />;
        } else if (value.includes("cloud")) {
            return <i className="fas fa-cloud weather-icon" style={{ color: "#BDC3C7" }} />;
        } else if (value.includes("rain")) {
            return <i className="fas fa-cloud-rain weather-icon" style={{ color: "#3498DB" }} />;
        } else if (value.includes("snow")) {
            return <i className="far fa-snowflake weather-icon" style={{ color: "#AED6F1" }} />;
        } else if (value.includes("thunder") || value.includes("storm")) {
            return <i className="fas fa-bolt weather-icon" style={{ color: "#F1C40F" }} />;
        } else if (value.includes("fog") || value.includes("mist")) {
            return <i className="fas fa-smog weather-icon" style={{ color: "#D5DBDB" }} />;
        } else {
            return <i className="fas fa-cloud-sun weather-icon" style={{ color: "#F39C12" }} />;
        }
    }

    switch (title) {
        case "cloud":
            return <i className="fas fa-cloud"/>;
        case "humidity":
            return <i className="fas fa-tint" />;
        case "wind speed":
            return <i className="fas fa-wind" />;
        case "pressure":
            return <i className="fas fa-tachometer-alt" />;
        case "uv Index":
            return <i className="fas fa-sun" />;
        case "visibility":
            return <i className="fas fa-eye" />;
        default:
            return <i className="fas fa-info-circle" />;
    }
};
