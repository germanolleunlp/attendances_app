// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const { ROLES } = require("@/app/lib/constants");

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "teacher",
    email: "teacher@teacher.com",
    password: "teacher",
    role: ROLES.TEACHER,
  },
];

module.exports = {
  users,
};
