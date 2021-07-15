document.getElementById('submit').addEventListener('click', addExpense);

let formatter = new Intl.NumberFormat('us-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function addExpense(event) {
  event.preventDefault();

  const expenseRow = document.getElementById('expenseTable').insertRow(1);
  
  const expenseDate = expenseRow.insertCell(0);
  const expenseDescription = expenseRow.insertCell(1);
  const expenseWhere = expenseRow.insertCell(2);
  const expenseAmount = expenseRow.insertCell(3);
  const expenseCategory = expenseRow.insertCell(4);
  const expenseDelete = expenseRow.insertCell(5);

  const expenseDeleteButton = document.createElement('button');
  const image = new Image(20,20);
  image.src = "delete.jpg";
  expenseDeleteButton.appendChild(image);
  expenseDeleteButton.addEventListener('click', () => {
    expenseRow.remove();
    renderTotal();
  });

  expenseDate.textContent = getFormatedDate(document.getElementById('expenseDate').value);
  expenseDescription.textContent = document.getElementById('expenseDescription').value;
  expenseWhere.textContent = document.getElementById('expenseWhere').value;
  expenseAmount.textContent = formatter.format(document.getElementById('expenseAmount').value);
  expenseCategory.textContent = document.getElementById('expenseCategory').value;
  expenseDelete.appendChild(expenseDeleteButton);
  
  renderTotal();
  
  document.getElementById('form').reset();
}

function renderTotal() {
  const rows = document.getElementById('expenseTable').rows.length
  let list = 0;
  for (let i = rows - 1; i > 0; i--) {
    list += parseFloat(document.getElementById('expenseTable').rows[i].cells[3].innerText.substring(1))
  }
  document.getElementById("total").textContent = formatter.format(list)
}
renderTotal()

function getFormatedDate(date) {
  [year, month, day] = date.split("-");
  if (year == "") {
    return "";
  } else return `${month}/${day}/${year}`;
}

