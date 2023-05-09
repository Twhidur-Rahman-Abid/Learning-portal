import React from "react";

const Table = ({ tableHeaders = [], children }) => {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          {tableHeaders.map((TH, i) => (
            <th key={i} className="table-th">
              {TH}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{children}</tbody>
    </table>
  );
};

export default Table;
