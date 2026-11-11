// Day 5: Fetch three endpoints in parallel and handle each result.
async function fetchResource(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }
  return response.json();
}

async function loadDashboardData() {
  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/todos/1'
  ];

  const results = await Promise.allSettled(urls.map(fetchResource));

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${index + 1} succeeded:`, result.value);
    } else {
      console.error(`Request ${index + 1} failed:`, result.reason.message);
    }
  });
}

loadDashboardData();
