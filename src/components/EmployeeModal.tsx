import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '../types/Employee';

interface EmployeeModalProps {
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ onClose, onSave }) => {
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    name: '',
    department: '',
    contact: '',
  });

  const [maxId, setMaxId] = useState<number>(0);

  useEffect(() => {
    axios.get<Employee[]>('http://localhost:5000/employees')
      .then((response) => {
        const employees = response.data;
        if (employees.length > 0) {
          const maxCurrentId = Math.max(...employees.map(emp => emp.id));
          setMaxId(maxCurrentId);
        }
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleSave = () => {
    const newEmployee = { ...employee, id: maxId + 1 };
    axios.post('http://localhost:5000/employees', newEmployee)
      .then((response) => {
        onSave(response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  return (
    <div className="modal show d-block custom-modal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title">Add Employee</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={employee.name}
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                className="form-control"
                value={employee.department}
                onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Contact:</label>
              <input
                type="text"
                className="form-control"
                value={employee.contact}
                onChange={(e) => setEmployee({ ...employee, contact: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
