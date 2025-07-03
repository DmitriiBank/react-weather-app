import {PropertyIcon} from "./PropertyIcon.tsx";

type Props = { title: string; value: string }

export const Property = ({title, value}: Props) => (
    <div className="property">
        <div className="property-icon">
            <PropertyIcon title={title}/>
        </div>
        <div className="property-info">
            <div className="property-info__value">{value}</div>
            <div className="property-info__description">{title}</div>
        </div>
    </div>
)