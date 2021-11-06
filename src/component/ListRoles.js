import React, { useState, useEffect } from "react";

export const ListRoles = () => {
  const [state, setstate] = useState([]);

  const token = JSON.parse(localStorage.getItem("user")).token;
  console.log(token);
  async function listRoles() {
    return fetch(
      "https://icraf-interview-wmugc.ondigitalocean.app/list-roles",
      {
        method: "GET",
        headers: { Authorization: `token ${token}` },
      }
    ).then((data) => data.json());
  }
  useEffect(() => {
    listRoles().then((data) => {
      console.log(data);

      setstate(data);
    });
  }, []);
  const [permission, setPermissions] = useState([]);

  async function listPermission() {
    return fetch(
      "https://icraf-interview-wmugc.ondigitalocean.app/list-all-permissions",
      {
        method: "GET",
        headers: { Authorization: `token ${token}` },
      }
    ).then((data) => data.json());
  }
  useEffect(() => {
    listPermission().then((data) => {
      console.log(data);

      setPermissions(data);
    });
  }, []);

  return (
    <div className="main">
      <div className="list-students">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Name</th>
              <th scope="col">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {state.map((student, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{student.id}</th>
                  <td>{student.name}</td>
                  <td>
                    {
                      // if student.permissions is empty
                      student.permissions.length === 0 ? (
                        <p>No permissions</p>
                      ) : (
                        permission
                          .filter(
                            (permission) =>
                              permission.id === student.permissions[0]
                          )
                          .map((permission) => (
                            <p key={permission.id} className="text-warning">
                              {permission.name}
                            </p>
                          ))
                      )
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};