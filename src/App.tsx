import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';

import { Employee } from './types/Employee';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  return (
    <div className="container">
      <h1 className="my-4">Employee Management System</h1>
      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>Add Employee</button>
      <EmployeeTable />
      {isModalOpen && (
        <EmployeeModal onClose={handleCloseModal} onSave={handleSaveEmployee} />
      )}
    </div>
  );
};

export default App;
