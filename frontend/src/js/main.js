import { getTopEarnings } from './helpers/getTopEarnings.js';
import { displayTopEarners } from './helpers/displayTopEarners.js';
import { displayTransactions } from './helpers/displayTransactions.js';

// Set back-end server base URL
const baseURL = 'http://localhost:3000';

// Set transactions year to last year
const currentYear = new Date().getFullYear();
const transactionsYear = currentYear - 1;
document.getElementById('year').innerText = transactionsYear;

(async function fetchData() {
  // Fetch transactions data
  const response = await fetch(`${baseURL}/api/get`);
  const data = await response.json();

  // Filter last year's transactions
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

  // Display IDs, Names and Earnings columns
  displayTopEarners(dataFromYear, topEarnings);

  // Display top earner's alpha transactions list
  displayTransactions(topEarnerTransactions);

  // Make an HTTP POST request with challenge results
  const challengeResults = { id: data.id, result: topEarnerTransactions };
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(challengeResults),
  };
  const postResponse = await fetch(`${baseURL}/api/post`, config);

  // Show response in console log
  console.log(postResponse);
})();
