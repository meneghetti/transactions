export function displayTopEarners(dataFromYear, topEarnings) {
  topEarnings.forEach(earning => {
    // Display IDs column
    const idNode = document.createElement('li');
    const idTextnode = document.createTextNode(earning.id);
    idNode.appendChild(idTextnode);
    document.getElementById('ids').appendChild(idNode);

    // Display names column
    const uniqueEmployee = dataFromYear.find(
      data => data.employee.id === earning.id
    );
    const nameNode = document.createElement('li');
    const nameTextnode = document.createTextNode(uniqueEmployee.employee.name);
    nameNode.appendChild(nameTextnode);
    document.getElementById('names').appendChild(nameNode);

    // Display total earnings column
    const node = document.createElement('li');
    const textnode = document.createTextNode(
      earning.totalAmount.toLocaleString('en-US')
    );
    node.appendChild(textnode);
    document.getElementById('earnings').appendChild(node);
  });

  // Make Top Earners table visible
  document.getElementById('topEarners').classList.add('visible');
}
