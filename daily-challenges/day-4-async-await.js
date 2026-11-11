// Day 4: Convert callback-style steps into async/await.
function getUser(userId, callback) {
  setTimeout(() => callback(null, { id: userId, name: 'Maya' }), 400);
}

function getUserAsPromise(userId) {
  return new Promise((resolve, reject) => {
    getUser(userId, (error, user) => {
      if (error) reject(error);
      else resolve(user);
    });
  });
}

async function showUser() {
  try {
    const user = await getUserAsPromise(1);
    console.log('Loaded user:', user);
  } catch (error) {
    console.error('User loading failed:', error);
  }
}

showUser();
