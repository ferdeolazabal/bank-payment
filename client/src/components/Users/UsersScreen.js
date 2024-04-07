// @ts-nocheck
import React from "react";
import UsersRow from "./UsersRow";
import UsersHeader from "./UsersHeader";
import { useSelector } from "react-redux";

const UsersScreen = () => {
  const users = useSelector(({ users }) => users.users);

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="flex flex-col mt-8">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <UsersHeader />

              <tbody className="bg-white">
                {users.length > 0 &&
                  users.map((user) => <UsersRow key={user._id} user={user} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
