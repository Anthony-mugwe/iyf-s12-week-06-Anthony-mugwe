// Day 2: Chain three Promise-returning functions.
function step(message) {
  const wait = Math.floor(Math.random() * 900) + 300;
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(message, `(${wait}ms)`);
      resolve(message);
    }, wait);
  });
}

async function runChain() {
  console.time('Promise chain');
  await step('Step 1 complete');
  await step('Step 2 complete');
  await step('Step 3 complete');
  console.timeEnd('Promise chain');
}

runChain();
