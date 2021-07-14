document.getElementById('submit').addEventListener('click', addExpense);

function addExpense(event) {
  event.preventDefault();

  const expenseRow = document.getElementById('expenseTable').insertRow(1);
  
  //Chunk 1
  const expenseDate = expenseRow.insertCell(0);
  const expenseDescription = expenseRow.insertCell(1);
  const expenseAmount = expenseRow.insertCell(2);
  const expenseCategory = expenseRow.insertCell(3);
  const expenseDelete = expenseRow.insertCell(4);
  
  let formatter = new Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const expenseDeleteButton = document.createElement('button');
  const image = new Image(20,20);
  image.src = "delete.jpg";
  expenseDeleteButton.appendChild(image);
  expenseDeleteButton.addEventListener('click', () => expenseRow.remove());

  //Chunk 2
  expenseDate.textContent = getFormatedDate(document.getElementById('expenseDate').value);
  expenseDescription.textContent = document.getElementById('expenseDescription').value;
  expenseAmount.textContent = formatter.format(document.getElementById('expenseAmount').value);
  expenseCategory.textContent = document.getElementById('expenseCategory').value;
  expenseDelete.appendChild(expenseDeleteButton);

  document.getElementById('form').reset();
}

function getFormatedDate(date) {
  [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}
