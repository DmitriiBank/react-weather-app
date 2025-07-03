import { useState } from "react";

type Props = {
    onClose: () => void;
    onSubmit: (city: string) => void;
};

export const Popup = ({ onClose, onSubmit }: Props) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();

        if (!trimmedInput) {
            setError("Please enter a city name");
            return;
        }

        if (!/^[a-zA-Z\s-]+$/.test(trimmedInput)) {
            setError("Only letters, spaces and hyphens are allowed");
            return;
        }

        onSubmit(trimmedInput);
        setInput("");
    };

    return (
        <div className="popup active">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>
                    ✕
                </button>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter city name"
                        className="form-input"
                        required
                    />
                    {error && <div className="error-text">{error}</div>}
                    <button type="submit" className="form-submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};