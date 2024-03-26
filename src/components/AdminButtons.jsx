import SubNavbar from "./utils/SubNavbar";

export default function AdminButtons({
  currentInterface,
  setCurrentInterface,
}) {
  const buttons = ["Backup", "Admin"];

  let icon = {
    Backup: <i className="fa-light fa-cabinet-filing"></i>,
    Admin: <i className="fa-light fa-user-tie"></i>,
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
