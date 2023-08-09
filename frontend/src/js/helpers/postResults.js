// Body example for request status test
const bodyExample = {
  id: 'aa22a666-6bb7-47f1-aaac-cccda8da246d',
  result: ['TX_007', 'TX_009'],
};

export async function postResults(challengeResults) {
  // Make an HTTP POST request with challenge results
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(challengeResults),
  };
  const postResponse = await fetch('http://localhost:3000/api/post', config);

  // Show POST response in console
  console.log(postResponse);
}
