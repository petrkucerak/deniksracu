import ToggleSwitch from "./toggle-switch";

export default function FromToggleQuestion({ title, description }) {
    return (
        <div className="mb-2">
            <p className="font-semibold">{title}</p>
            <p>{description}</p>
            <ToggleSwitch />
        </div>
    )
}