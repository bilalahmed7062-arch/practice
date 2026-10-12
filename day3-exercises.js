/**
 * Exercise 1: Write a wait(ms) function that returns a Promise
 */
export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${ms}ms`);
    }, ms);
  });
};

/**
 * Exercise 2: Fetch users from JSONPlaceholder with async/await and try/catch
 */
export const fetchUsers = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    console.log(`Successfully fetched ${users.length} users.`);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

/**
 * Exercise 3: Fetch a user and their posts together with Promise.all
 */
export const fetchUserAndPosts = async (userId) => {
  const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  try {
    // Both network requests fire simultaneously
    const [userRes, postsRes] = await Promise.all([
      fetch(userUrl),
      fetch(postsUrl),
    ]);

    if (!userRes.ok || !postsRes.ok) {
      throw new Error('Failed to retrieve user or posts');
    }

    const [user, posts] = await Promise.all([
      userRes.json(),
      postsRes.json(),
    ]);

    return { user, posts };
  } catch (error) {
    console.error(`Error fetching user ${userId} and posts:`, error.message);
    throw error;
  }
};
// --- Execution Runner ---
const runExercises = async () => {
  console.log('--- 1. Testing wait(ms) ---');
  const waitMessage = await wait(1000);
  console.log(waitMessage);

  console.log('\n--- 2. Testing fetchUsers() ---');
  const users = await fetchUsers();
  console.log('First user:', users[0]?.name);

  console.log('\n--- 3. Testing fetchUserAndPosts(userId) ---');
  const { user, posts } = await fetchUserAndPosts(1);
  console.log(`User: ${user.name}`);
  console.log(`Fetched ${posts.length} posts for this user.`);

  console.log('\n--- 4. Event Loop Puzzle ---');
  console.log('1: Synchronous start');

  setTimeout(() => {
    console.log('2: setTimeout (macrotask)');
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log('3: Promise 1 (microtask)');
    })
    .then(() => {
      console.log('4: Promise 2 (microtask)');
    });

  console.log('5: Synchronous end');
};

runExercises();