export function displayTransactions(topEarnerTransactions) {
  // Display top earner's alpha transactions list
  document.getElementById('transactionIds').innerText =
    topEarnerTransactions.join(', ');
  document.getElementById('transactionsWrapper').classList.add('visible');
}
