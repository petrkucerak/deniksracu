import React, { useState } from "react";

function ToggleSwitch({ sharedState, setSharedState }) {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => {
    setIsToggled(!isToggled);
    setSharedState(isToggled);
  };
  return (
    <label className="toggle-switch my-2">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
export default ToggleSwitch;