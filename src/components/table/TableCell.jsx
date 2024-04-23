import { useState, useEffect } from "react";
import styled from "styled-components";

import Field from "../forms/fields/Field.jsx";
import PK from "./PK.jsx";

import { format } from "date-fns";

export default function TableCell({ column, row }) {
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    setValue(row[column.name]);
  }, [column.name, row]);

  let component;
  switch (column.type) {
    case "pk":
      component = <PK id={row.id} />;
      break;
    case "created_at":
    case "updated_at":
      component = <span>{value && format(value, "PP")}</span>;
      break;
    default:
      component = (
        <Field
          type={column.type}
          value={value}
          config={{
            inline: true,
          }}
          options={column.options}
          tabIndex={false}
          disable={true}
        />
      );
  }

  return <TdWrapper>{value === undefined ? "" : component}</TdWrapper>;
}

const TdWrapper = styled.td`
  vertical-align: middle;
  width: fit-content;
  min-width: 80px;
  padding-right: 30px;

  & .pk {
    width: fit-content;
    cursor: default;
    position: relative;
    display: flex;
    gap: 10px;
    padding: 4px 7px;
    border-radius: 30px;
    background-color: var(--pk);

    & .copy-btn {
      cursor: pointer;
      &:hover {
        color: var(--blue);
      }
    }

    & .copy-tooltip {
      font-size: 0.8em;
      position: absolute;
      z-index: 1000000000;
      top: 20px;
      left: 2px;
      box-shadow: var(--shadow-1);
      background-color: black;
      color: white;
      font-weight: 700;
      padding: 7px 10px;
      border-radius: 5px;

      &.copied {
        background-color: var(--green);
      }
    }
  }
`;
