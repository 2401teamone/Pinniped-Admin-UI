import SubNavbar from "./utils/SubNavbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminButtons({
  currentInterface,
  setCurrentInterface,
}) {
  const buttons = ["Backup", "Admins"];

  let icon = {
    Backup: <FontAwesomeIcon icon="fa-light fa-cabinet-filing" />,
    Admins: <FontAwesomeIcon icon="fa-light fa-user-tie" />,
  };
  return (
    <SubNavbar>
      <div className="admin-buttons">
        {buttons.map((button) => {
          return (
            <div
              key={button}
              className={`admin-button ${
                currentInterface === button ? "active" : ""
              }`}
              onClick={() => setCurrentInterface(button)}
            >
              <span>{icon[button]}</span>
              <span>{button}</span>
            </div>
          );
        })}
      </div>
    </SubNavbar>
  );
}
