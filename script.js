document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();

  const date = document.getElementById('expenseDate');
  const description = document.getElementById('expenseDescription');
  const location = document.getElementById('expenseWhere');
  const amount = formatter.format(document.getElementById('expenseAmount'));
  const category = document.getElementById('expenseCategory');

  if (!description.value || !amount.value || !date.value || !location.value) {
    alert('Please fill out all input fields before submitting.');
    return;
  }

  const expenseObject = {
    id: Date.now(),
    date: date.value,
    description: description.value,
    location: location.value,
    amount: amount.value,
    category: category.value
  };

  const expenseArray = getExpenses();
  addExpense(expenseObject);
  expenseArray.push(expenseObject);
  pushToLocalStorage(expenseArray);
});

function addExpense(expense) {
  const expenseRow = document.getElementById('expenseTable').insertRow(1);

  const expenseDate = expenseRow.insertCell(0);
  const expenseDescription = expenseRow.insertCell(1);
  const expenseWhere = expenseRow.insertCell(2);
  const expenseAmount = expenseRow.insertCell(3);
  const expenseCategory = expenseRow.insertCell(4);
  const expenseDelete = expenseRow.insertCell(5);

  expenseDate.textContent = getFormatedDate(expense.date);
  expenseDescription.textContent = expense.description;
  expenseWhere.textContent = expense.location;
  expenseAmount.textContent = expense.amount;
  expenseCategory.textContent = expense.category;
  const deleteButton = createDeleteButton(expense);
  expenseDelete.appendChild(deleteButton);

  renderTotal();

  document.getElementById('form').reset();
}

function getExpenses() {
  return JSON.parse(localStorage.getItem('expenseArray')) || [];
}

function pushToLocalStorage(array) {
  localStorage.setItem('expenseArray', JSON.stringify(array));
}

const formatter = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function createDeleteButton(expense) {
  const expenseDeleteButton = document.createElement('button');
  expenseDeleteButton.textContent = 'X';
  expenseDeleteButton.setAttribute('id', 'deleteButton');
  expenseDeleteButton.addEventListener('click', () => {
    deleteExpense(expenseDeleteButton, expense.id);
  });

  return expenseDeleteButton;
}

function deleteExpense(deleteButton, id) {
  deleteButton.parentElement.parentElement.remove();
  const expenseArray = getExpenses();
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === id) {
      expenseArray.splice(i, 1);
      renderTotal();
      pushToLocalStorage(expenseArray);
    }
  }
}

function renderTotal() {
  const rows = document.getElementById('expenseTable').rows.length;
  let list = 0;
  for (let i = rows - 1; i > 0; i--) {
    list += parseFloat(
      document
        .getElementById('expenseTable')
        .rows[i].cells[3].innerText.substring(1)
        .replace(',', '')
    );
  }
  document.getElementById('total').textContent = formatter.format(list);
}
renderTotal();

function getFormatedDate(date) {
  [year, month, day] = date.split('-');
  if (year == '') {
    return '';
  } else return `${month}/${day}/${year}`;
}

window.addEventListener('load', () => {
  const expenseArray = getExpenses();
  expenseArray.forEach((expense) => {
    addExpense(expense);
  });
});
