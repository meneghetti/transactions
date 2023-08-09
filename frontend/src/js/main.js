import data from './services/data.js';
import { getTopEarnings } from './services/getTopEarnings.js';

// Filter last year's transactions
const currentYear = new Date().getFullYear();
const transactionsYear = currentYear - 1;
document.getElementById('year').innerText = transactionsYear;
const dataFromYear = data.transactions.filter(t =>
  t.timeStamp.startsWith(transactionsYear)
);

// Get total earnings by employee, sorted from highest to lowest
const topEarnings = getTopEarnings(dataFromYear);

// Get top earner
const topEarner = topEarnings[0];
document.getElementById('topEarner').innerText = topEarner.name;

// Get alpha transactions from top earner
const topEarnerTransactions = dataFromYear
  .filter(t => t.employee.id === topEarner.id && t.type === 'alpha')
  .map(t => t.transactionID);

topEarnings.forEach(earning => {
  // Display IDs list
  const idNode = document.createElement('li');
  const idTextnode = document.createTextNode(earning.id);
  idNode.appendChild(idTextnode);
  document.getElementById('ids').appendChild(idNode);

  // Display names list
  const uniqueEmployee = dataFromYear.find(
    data => data.employee.id === earning.id
  );
  const nameNode = document.createElement('li');
  const nameTextnode = document.createTextNode(uniqueEmployee.employee.name);
  nameNode.appendChild(nameTextnode);
  document.getElementById('names').appendChild(nameNode);

  // Display total earnings list
  const node = document.createElement('li');
  const textnode = document.createTextNode(
    earning.totalAmount.toLocaleString('en-US')
  );
  node.appendChild(textnode);
  document.getElementById('earnings').appendChild(node);
});

// Display top earner's alpha transactions list
document.getElementById('transactionIds').innerText =
  topEarnerTransactions.join(', ');
