import { useState } from "react";
import "./style.css";
import { AiOutlineSortAscending } from "react-icons/ai";
import PropTypes from "prop-types";

const EditableTable = (props) => {
  const { data } = props;
  const [employees, setEmployees] = useState(data);
  const [sortBy, setSortBy] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [collapsed, setCollapsed] = useState(false);

  PropTypes.EditableTable = {
    data: PropTypes.object,
  };

  const handleSort = (sortCriteria) => {
    setSortBy(sortCriteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    let sortedEmployees = employees.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    setEmployees(sortedEmployees);
  };

  const onChangeInput = (e, employeeId) => {
    const { name, value } = e.target;

    const editData = employees.map((item) =>
      item.employeeId === employeeId && name ? { ...item, [name]: value } : item
    );
    setEmployees(editData);
  };

  var newArray = employees.filter(function (el) {
    return (
      el.name === searchText ||
      el.email === searchText ||
      el.position === searchText
    );
  });

  return (
    <div className="container">
      <h1 className="title">ReactJS Editable Table</h1>
      <input
        type="text"
        placeholder="Search by name or email or position"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>

            <th>
              <button onClick={() => setCollapsed(!collapsed)}>
                Toggle Column
              </button>
            </th>
          </tr>
          <tr>
            <th >
              Name &nbsp;&nbsp;&nbsp;&nbsp;
              <AiOutlineSortAscending onClick={() => handleSort("name")}/>{" "}
            </th>

            <th >
              Email &nbsp;&nbsp;&nbsp;&nbsp;
              <AiOutlineSortAscending onClick={() => handleSort("email")}/>
            </th>
            <th >
              Position &nbsp;&nbsp;&nbsp;&nbsp;
              <AiOutlineSortAscending onClick={() => handleSort("position")} />
            </th>
          </tr>
        </thead>
        <tbody>
          {newArray.length === 0
            ? employees.map(({ employeeId, name, email, position }) => (
                <tr key={employeeId}>
                  <td>
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => onChangeInput(e, employeeId)}
                    />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={email}
                      type="text"
                      onChange={(e) => onChangeInput(e, employeeId)}
                    />
                  </td>
                  <td style={{ display: collapsed ? "none" : "table-cell" }}>
                    <input
                      name="position"
                      type="text"
                      value={position}
                      onChange={(e) => onChangeInput(e, employeeId)}
                    />
                  </td>
                </tr>
              ))
            : newArray.map(({ employeeId, name, email, position }) => (
                <tr key={employeeId}>
                  <td>
                    <input name="name" value={name} type="text" />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={email}
                      type="text"
                      onChange={(e) => onChangeInput(e, employeeId)}
                      placeholder="Type Email"
                    />
                  </td>
                  <td style={{ display: collapsed ? "none" : "table-cell" }}>
                    <input
                      name="position"
                      type="text"
                      value={position}
                      onChange={(e) => onChangeInput(e, employeeId)}
                      placeholder="Type Position"
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
