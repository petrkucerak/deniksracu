import ToggleSwitch from "./toggle-switch";
import { useState } from "react";

export default function FromToggleQuestion({ title, description }) {
    const [status, setStatus] = useState("NE");
    return (
        <div className="mb-2">
            <p className="font-semibold">{title}</p>
            <p>{description}</p>
            <div className="flex space-x-3 mt-1 mb-2">
                <ToggleSwitch  setStatus={setStatus}/>
                <p>{status}</p>
            </div>
        </div>
    )
}