import React from "react";

const thClass =
  "px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50";

const UsersHeader = () => {
  return (
    <thead>
      <tr>
        <th className={thClass}>Name</th>
        <th className={thClass}>Status</th>
      </tr>
    </thead>
  );
};

export default UsersHeader;
