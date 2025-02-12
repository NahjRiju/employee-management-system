import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '../types/Employee';

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<Employee[]>('http://localhost:5000/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    const employeeToUpdate = employees.find((e) => e.id === id);
    if (employeeToUpdate) {
      axios.put(`http://localhost:5000/employees/${id}`, employeeToUpdate)
        .then(() => {
          setEditingId(null);
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
        });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>
              {editingId === employee.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={employee.name}
                  onChange={(e) =>
                    setEmployees((prev) =>
                      prev.map((emp) =>
                        emp.id === employee.id ? { ...emp, name: e.target.value } : emp
                      )
                    )
                  }
                />
              ) : (
                employee.name
              )}
            </td>
            <td>
              {editingId === employee.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={employee.department}
                  onChange={(e) =>
                    setEmployees((prev) =>
                      prev.map((emp) =>
                        emp.id === employee.id ? { ...emp, department: e.target.value } : emp
                      )
                    )
                  }
                />
              ) : (
                employee.department
              )}
            </td>
            <td>
              {editingId === employee.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={employee.contact}
                  onChange={(e) =>
                    setEmployees((prev) =>
                      prev.map((emp) =>
                        emp.id === employee.id ? { ...emp, contact: e.target.value } : emp
                      )
                    )
                  }
                />
              ) : (
                employee.contact
              )}
            </td>
            <td>
              {editingId === employee.id ? (
                <>
                  <button className="btn btn-primary" onClick={() => handleSave(employee.id)}>Save</button>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-warning" onClick={() => handleEdit(employee.id)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
