import users from '../../../data/user.js';
const sortedUsers = users.sort((a, b) =>
  a.name.localeCompare(b.name)
);

const groupedUsers = sortedUsers.reduce((groups, user) => {
  const firstLetter = user.name[0].toUpperCase();
  if (!groups[firstLetter]) groups[firstLetter] = [];
  groups[firstLetter].push(user);
  return groups;
}, {});