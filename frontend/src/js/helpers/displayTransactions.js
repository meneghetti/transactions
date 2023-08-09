export function displayTransactions(topEarnerTransactions, dataId) {
  // Display top earner's alpha transactions list and data ID
  document.getElementById('transactionIds').innerText =
    topEarnerTransactions.join(', ');
  document.getElementById('dataId').innerText = dataId;
  document.getElementById('transactionsWrapper').classList.add('visible');
}
