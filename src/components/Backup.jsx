import { useState, useEffect } from "react";
import styled from "styled-components";

import api from "../api/api.js";

import Button from "./utils/Button.jsx";
import Field from "./forms/fields/Field.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useConfirmModalContext } from "../hooks/useConfirmModal.jsx";

import downloadFile from "../utils/download_file.js";

const Form = ({ close, setBackups }) => {
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
          if (!val) return "";
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
            api
              .backup(backupName)
              .then(({ data }) =>
                setBackups((prev) => [...prev, data.backupFileName])
              )
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                close();
              });
          }}
        >
          Start Backup
        </Button>
      </div>
    </div>
  );
};

export default function Backup() {
  const [backups, setBackups] = useState([]);

  const {
    actionCreators: { open, close },
  } = useConfirmModalContext();

  useEffect(() => {
    api
      .getBackups()
      .then((data) => {
        setBackups(data.backups);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container className="backup">
      <div className="backup-console">
        <h2 className="backup-header">Backup your Pinniped data</h2>
        <Button
          type="inherit"
          onClick={() => open(<Form close={close} setBackups={setBackups} />)}
        >
          <FontAwesomeIcon icon="fa-regular fa-play" />
          Backup
        </Button>
      </div>
      <div className="backups-log">
        {!backups.length ? (
          <div className="no-backups">
            <p>No Backups.</p>
            <p>
              Please use the Backup button above to create your first backup.
            </p>
          </div>
        ) : (
          backups.map((backup) => {
            return (
              <div key={backup} className="backup-log">
                <div className="backup-name">{backup}</div>
                <div className="backup-actions">
                  <div
                    className="backup-download"
                    onClick={async () => {
                      api
                        .downloadBackup(backup)
                        .then((blob) => {
                          downloadFile(blob, backup);
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    }}
                  >
                    <FontAwesomeIcon icon="fa-sharp fa-light fa-circle-down" />
                  </div>
                  <div
                    className="backup-delete"
                    onClick={() => {
                      api
                        .deleteBackup(backup)
                        .then(() => {
                          setBackups((prev) =>
                            prev.filter((b) => b !== backup)
                          );
                        })
                        .catch((err) => {});
                    }}
                  >
                    <FontAwesomeIcon icon="fa-regular fa-trash" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  & .backup-console {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    & .backup-header {
      font-size: 1.3rem;
    }

    & button {
      & i {
        margin-right: 10px;
      }
    }
  }

  & .backups-log {
    border: 1px solid var(--pk);
    min-height: 200px;
    border-radius: var(--min-radius);
    padding: 10px;

    & .no-backups {
      font-size: 1.3rem;
      color: var(--text-color);
      & p {
        margin: 10px;
      }
    }

    & .backup-log {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      cursor: default;
      border-radius: var(--min-radius);
      &:hover {
        background-color: var(--hover);
      }

      & .backup-actions {
        display: flex;
        gap: 20px;

        & div {
          cursor: pointer;
          & i {
            font-size: 1.5rem;
          }
        }
        & .backup-download {
          &:hover {
            color: var(--blue);
          }
        }

        & .backup-delete {
          &:hover {
            color: var(--red);
          }
        }
      }
    }
  }
`;
