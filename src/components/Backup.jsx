import { useState } from "react";
import api from "../api/api.js";

import Button from "./utils/Button.jsx";

import { useConfirmModalContext } from "../hooks/useConfirmModal.jsx";

import Field from "./forms/fields/Field.jsx";

const Form = ({ close }) => {
  const [backupName, setBackupName] = useState("");

  return (
    <div>
      <p style={{ fontSize: "1.3rem", marginBottom: "30px" }}>
        Initialize new backup
      </p>
      <Field
        label="Backup name"
        type="text"
        value={backupName}
        onChange={(val) => setBackupName(val)}
        placeholder="Leave empty to autogenerate"
        validator={(val) => {
          if (val.length === 0) return "";
          if (!/^[a-zA-Z0-9]+\.db$/.test(val)) return "Invalid backup name";
          return "";
        }}
        validatorContext="Must follow the format [a-zA-Z0-9]+.db"
      />

      <div
        className="buttons"
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          margin: "20px 0 10px 0",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            console.log("backing up", backupName);
            close();
          }}
        >
          Start Backup
        </Button>
      </div>
    </div>
  );
};

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
        <Button type="inherit" onClick={() => open(<Form close={close} />)}>
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
