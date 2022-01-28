import ToggleSwitch from "./toggle-switch";
import { useState } from "react";

export default function FromToggleQuestion({ title, description }) {
    const [sharedState, setSharedState] = useState(false);
    console.log(sharedState);
    return (
        <div className="mb-2">
            <p className="font-semibold">{title}</p>
            <p>{description}</p>
            <ToggleSwitch sharedState={sharedState} setSharedState={setSharedState}/>
        </div>
    )
}