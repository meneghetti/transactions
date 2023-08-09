import { getTopEarnings } from './helpers/getTopEarnings.js';
import { displayTopEarners } from './helpers/displayTopEarners.js';
import { displayTransactions } from './helpers/displayTransactions.js';
import { postResults } from './helpers/postResults.js';

// Set transactions year to last year
const currentYear = new Date().getFullYear();
const transactionsYear = currentYear - 1;
document.getElementById('year').innerText = transactionsYear;

async function getData() {
  // Fetch transactions data
  const response = await fetch('http://localhost:3000/api/get');
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

  // Display employees IDs, Names and Earnings columns
  displayTopEarners(dataFromYear, topEarnings);

  // Display top earner's alpha transactions list and data ID
  displayTransactions(topEarnerTransactions, data.id);

  // Format challenge results object
  const challengeResults = { id: data.id, result: topEarnerTransactions };

  return challengeResults;
}

// Make an HTTP POST request with challenge results
(async function () {
  const results = await getData();
  postResults(results);
})();
