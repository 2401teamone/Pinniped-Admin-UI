import { useState, useEffect } from "react";

import Field from "../forms/fields/Field.jsx";
import PK from "./PK.jsx";

import api from "../../api/api.js";

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

  return <td className="td">{value === undefined ? "" : component}</td>;
}
