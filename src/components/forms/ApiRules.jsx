// Dependencies
import styled from "styled-components";

// Hooks
import { useConfirmModalContext } from "../../hooks/useConfirmModal";

const RULES = ["public", "user", "creator", "admin"];

export default function ApiRules({ schema, dispatch }) {
  const {
    actionCreators: { open },
  } = useConfirmModalContext();

  const rule = (operation, current) => {
    return (
      <div className="rule">
        {RULES.map((rule) => (
          <div
            key={rule}
            className={`rule-btn ${current === rule ? "active" : ""}`}
            onClick={() => {
              if (
                rule === "creator" &&
                !schema.columns.find((column) => column.type === "creator")
              ) {
                open(
                  "You need to have a creator column established within your schema to set a 'creator rule'."
                );
                return;
              }
              dispatch({
                type: "EDIT_RULE",
                payload: { operation, rule },
              });
            }}
          >
            {rule}
          </div>
        ))}
      </div>
    );
  };
  return (
    <ApiInterface>
      <div className="get-all-rule">
        <span className="method-for-rule">Get All Rule:</span>{" "}
        {rule("getAllRule", schema.getAllRule)}
      </div>
      <div className="get-one-rule">
        <span className="method-for-rule">Get One Rule:</span>{" "}
        {rule("getOneRule", schema.getOneRule)}
      </div>
      <div className="create-rule">
        <span className="method-for-rule">Create Rule:</span>{" "}
        {rule("createRule", schema.createRule)}
      </div>
      <div className="update-rule">
        <span className="method-for-rule">Update Rule:</span>{" "}
        {rule("updateRule", schema.updateRule)}
      </div>
      <div className="delete-rule">
        <span className="method-for-rule">Delete Rule:</span>{" "}
        {rule("deleteRule", schema.deleteRule)}
      </div>
    </ApiInterface>
  );
}

const ApiInterface = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  & div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .method-for-rule {
      color: var(--text-color);
      font-weight: 600;
      padding: 3px;
      border-bottom: 1px solid var(--light-gray);
    }
    & .rule {
      display: flex;
      align-items: center;
      gap: 30px;
      border: 1px solid var(--light-gray);
      padding: 10px;
      border-radius: var(--min-radius);

      & .rule-btn {
        cursor: pointer;
        &:hover {
          color: var(--blue-light);
        }
        &.active {
          color: var(--accent2);
          font-weight: 600;
        }
      }
    }
  }
`;
