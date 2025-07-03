import {Property} from "./Property";
import type {WeatherProperty} from "../utils/weather-app-types.ts";



type Props = {
    properties: WeatherProperty[]
}
export const Properties = ({properties}: Props) => {

    return (
        <div className={'properties'}>
        {properties.map((prop) =>
            <Property key={prop.title} {...prop} />
        )}
    </div>
    )
};

