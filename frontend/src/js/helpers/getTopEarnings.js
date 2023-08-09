export function getTopEarnings(data) {
  // Get total earnings by employee
  const totalEarnings = data.reduce((acc, cur) => {
    acc[cur.employee.id] = (acc[cur.employee.id] || 0) + cur.amount;
    return acc;
  }, {});

  // Sort total earnings from highest to lowest
  const sortedEarnings = Object.entries(totalEarnings).sort(
    (a, b) => b[1] - a[1]
  );

  // Format sorted earnings objects
  const formatedEarnings = sortedEarnings.map(a => {
    return { id: a[0], totalAmount: a[1] };
  });

  // Add employee name to corresponding object
  const topEarnings = formatedEarnings.map(earning => {
    return {
      ...earning,
      name: data.find(data => data.employee.id === earning.id).employee.name,
    };
  });

  return topEarnings;
}
