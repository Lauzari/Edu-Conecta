import { useEffect } from "react";
import "./Alert.css";

export default function Alert({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className="alert-popup">
            {message}
        </div>
    );
}
