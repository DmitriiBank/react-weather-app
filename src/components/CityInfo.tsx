
import {PropertyIcon} from "./PropertyIcon.tsx";

type Props = {
    condition: string;
    observationTime: string;
    temp_c: number;
}
export const CityInfo = ({
                             condition,
                             observationTime,
                             temp_c
                         }: Props ) => {
    return (
        <div className="city-info">
            <div className="top-left">
                <PropertyIcon title={condition} isWeatherIcon/>
                <div className="description">{condition}</div>
            </div>

            <div className="top-right">
                <div className="city-info__subtitle"> Last updated: {new Date(observationTime).toLocaleTimeString()}</div>
                <div className="city-info__title">{temp_c}</div>
            </div>
        </div>
    );
};

