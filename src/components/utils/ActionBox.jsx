import { createPortal } from "react-dom";
import styled from "styled-components";

import api from "../../api/api.js";

import { useNotificationContext } from "../../hooks/useNotifications.jsx";
import { useConfirmModalContext } from "../../hooks/useConfirmModal.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionBox({
  table,
  selectedRows,
  setSelectedRows,
  setRows,
}) {
  const {
    notificationState: { showing },
  } = useNotificationContext();
  const {
    actionCreators: { open },
  } = useConfirmModalContext();

  const handleDelete = () => {
    const promises = selectedRows.map((selectedRow) => {
      return api.deleteOne(table.id, selectedRow);
    });

    Promise.all(promises).then(() => {
      setSelectedRows([]);
      setRows((prev) => prev.filter((r) => !selectedRows.includes(r.id)));
    });
  };

  const actionBox = selectedRows.length && (
    <ActionBoxWrapper className={showing && "above-notification"}>
      <div className="left">
        <span>
          {selectedRows.length} Row{`${selectedRows.length > 1 ? "s" : ""}`}{" "}
          Selected
        </span>
        <span className="reset" onClick={() => setSelectedRows([])}>
          Reset
        </span>
      </div>
      <div
        onClick={() => {
          open(
            `Are you sure you want to delete the selected row${
              selectedRows.length > 1 ? "s" : ""
            }?`,
            handleDelete
          );
        }}
        className="row-delete right"
      >
        <FontAwesomeIcon icon="fa-regular fa-trash" />
      </div>
    </ActionBoxWrapper>
  );

  return createPortal(actionBox, document.querySelector("#action-box"));
}

const ActionBoxWrapper = styled.div`
  position: absolute;
  width: 250px;
  height: 40px;
  bottom: 60px;
  left: 50%;
  border: 1px solid var(--light-gray);
  background-color: white;
  border-radius: 20px;
  box-shadow: var(--shadow-3);
  padding: 0 20px;
  z-index: 70;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.above-notification {
    bottom: 100px;
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .left {
    display: flex;
    align-items: center;
    gap: 10px;
    & .reset {
      display: inline-block;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      border: 2px solid black;
      font-weight: 600;
      &:hover {
        /* font-size: 1.2rem; */
        background-color: var(--hover);
      }
    }
  }

  & .row-delete {
    display: inline-block;
    padding: 4px;
    cursor: pointer;
    color: var(--error-font);
    font-size: 1.3rem;
    &:hover {
      font-size: 1.2rem;
      border-radius: 50%;
      background-color: var(--red-light);
    }
  }
`;
