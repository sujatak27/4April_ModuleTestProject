document.addEventListener('DOMContentLoaded', function() {
    let employees = [];
  
    document.getElementById('addEmployeeBtn').addEventListener('click', function() {
      const name = document.getElementById('name').value;
      const profession = document.getElementById('profession').value;
      const age = document.getElementById('age').value;
  
      if (name === '' || profession === '' || age === '') {
        showMessage('Error : Please make sure all fields are filled before adding an employee', 'error');
        return;
      }
  
      const newEmployee = {
        id: generateId(),
        name: name,
        profession: profession,
        age: age
      };
  
      employees.push(newEmployee);
      renderEmployees();
      showMessage('Success : Employee added', 'success');
    });
  
    function renderEmployees() {
      const employeeList = document.getElementById('employeeList');
      employeeList.innerHTML = '';
  
      employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee-item');
        employeeDiv.innerHTML = `
          <p><strong>Name:</strong> ${employee.name}</p>
          <p><strong>Profession:</strong> ${employee.profession}</p>
          <p><strong>Age:</strong> ${employee.age}</p>
          <button class="delete-btn" data-id="${employee.id}">Delete</button>
        `;
        employeeList.appendChild(employeeDiv);
      });
  
      attachDeleteHandlers(); // Reattach event listeners after rendering
    }
  
    function attachDeleteHandlers() {
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-id'));
          employees = employees.filter(employee => employee.id !== id);
          renderEmployees();
        });
      });
    }
  
    function generateId() {
      return employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    }
  
    function showMessage(message, type) {
      const messagesDiv = document.getElementById('messages');
      messagesDiv.innerHTML = `<p class="${type}-message">${message}</p>`;
    }
  
    // Initial rendering of the employee list when the page loads
    renderEmployees();
  });