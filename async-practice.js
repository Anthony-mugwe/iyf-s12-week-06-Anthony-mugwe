// 1. A Promise that resolves after a delay.
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Finished waiting ${milliseconds}ms`), milliseconds);
  });
}

// 2. Promise-returning functions and chaining.
function getUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error('User ID must be greater than zero.'));
        return;
      }
      resolve({ id: userId, name: 'Alex' });
    }, 300);
  });
}

function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, userId, title: 'Learning JavaScript' },
      { id: 2, userId, title: 'Understanding Promises' }
    ]), 300);
  });
}

function getComments(postId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, postId, text: 'Great work!' },
      { id: 2, postId, text: 'Very helpful.' }
    ]), 300);
  });
}

// 3. Promise chain.
function loadUserContentWithPromises(userId) {
  return getUser(userId)
    .then(user => getPosts(user.id).then(posts => ({ user, posts })))
    .then(async result => {
      const comments = await getComments(result.posts[0].id);
      return { ...result, comments };
    });
}

// 4. The same workflow using async/await and try/catch.
async function loadUserContent(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error('Could not load user content:', error.message);
    throw error;
  }
}

// 5. Promise.all runs independent work in parallel.
async function loadSeveralUsers() {
  const users = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
  console.log('All users:', users);
  return users;
}

// 6. Promise.race returns the first settled result.
async function raceExample() {
  const fast = delay(100);
  const slow = delay(500);
  return Promise.race([fast, slow]);
}

