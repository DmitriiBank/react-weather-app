
export const Skeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton-top">
                <div className="skeleton-city"></div>
                <div className="skeleton-temp"></div>
            </div>
            <div className="skeleton-properties">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div className="skeleton-property" key={i}></div>
                ))}
            </div>
        </div>
    );
};
