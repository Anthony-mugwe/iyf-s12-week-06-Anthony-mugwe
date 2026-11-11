// Day 1: Delayed Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Waiting...');
  await delay(2000);
  console.log('This prints after 2 seconds');
}

run();
