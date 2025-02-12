const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to get all employees
app.get('/employees', (req, res) => {
  fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading employee data');
      return;
    }
    const employees = JSON.parse(data);
    res.json(employees);
  });
});

// Endpoint to add a new employee
app.post('/employees', (req, res) => {
  const newEmployee = req.body;
  fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading employee data');
      return;
    }
    const employees = JSON.parse(data);
    employees.push(newEmployee);
    fs.writeFile('employees.json', JSON.stringify(employees, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving employee data');
        return;
      }
      res.status(201).json(newEmployee);
    });
  });
});

// Endpoint to update an existing employee
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = req.body;
  fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading employee data');
      return;
    }
    let employees = JSON.parse(data);
    employees = employees.map(emp => emp.id === id ? updatedEmployee : emp);
    fs.writeFile('employees.json', JSON.stringify(employees, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving employee data');
        return;
      }
      res.json(updatedEmployee);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
