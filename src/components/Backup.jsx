import api from "../api/api.js";

import Button from "./utils/Button.jsx";

import { useConfirmModalContext } from "../hooks/useConfirmModal.jsx";

export default function Backup() {
  const {
    actionCreators: { open, close },
  } = useConfirmModalContext();
  const backups = [
    {
      id: 1,
      date: "2021-09-01",
      time: "12:00",
    },
    {
      id: 2,
      date: "2021-09-02",
      time: "12:00",
    },
    {
      id: 3,
      date: "2021-09-03",
      time: "12:00",
    },
  ];
  return (
    <div className="backup">
      <div className="backup-console">
        <h2 className="backup-header">Backup your Pinniped data</h2>
        <Button
          type="inherit"
          onClick={() => {
            open(
              "Click 'Start backup' to initialize your backup.",
              async () => {
                console.log("backing up");
                setTimeout(() => {
                  close();
                }, 1000);
                // await api.backup();
              },
              { no: "Cancel", yes: "Start backup" }
            );
          }}
        >
          <i className="fa-regular fa-play"></i>
          Backup
        </Button>
      </div>
      <div className="backups-log">
        {backups.map((backup) => {
          return (
            <div key={backup.id} className="backup-log">
              <div className="backup-log-date">{backup.date}</div>
              <div className="backup-log-time">{backup.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
