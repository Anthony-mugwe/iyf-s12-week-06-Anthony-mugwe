// Day 3: Return a default user when the requested user does not exist.
async function fetchUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (response.status === 404) {
      return { id: userId, name: 'Guest User', email: 'guest@example.com' };
    }
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Could not fetch user:', error.message);
    return { id: userId, name: 'Offline Guest', email: 'offline@example.com' };
  }
}

fetchUser(999).then(console.log);
