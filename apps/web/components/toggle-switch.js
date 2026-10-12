import React, { useState } from "react";

function ToggleSwitch({ setStatus, id }) {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => {
    setIsToggled(!isToggled);
    if (isToggled) setStatus("NE");
    else setStatus("ANO");
  };
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} id={id} />
      <span className="switch" />
    </label>
  );
}
export default ToggleSwitch;
