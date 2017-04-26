/*
Zhanwen "Phil" Chen
FCI coding challenge
Problem 2: Parking Ticket

To run,
0. Make sure dictionary.txt and Trie.js are in the same directory
1. Install node.js (https://nodejs.org/en/).
  Latest version recommended. Minimum 6.4.0
2. In terminal, $ node Ticket.js
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getTicketTotal = (datePaid, dateDue, ticket) => {
  if (datePaid <= dateDue) {
    return ticket;
  }
  if (datePaid.getFullYear() > dateDue.getFullYear()) {
    return ticket + 500;
  }
  if (datePaid.getMonth() > dateDue.getMonth()) {
    const monthsLate = datePaid.getMonth() - dateDue.getMonth();
    return ticket + monthsLate * 35;
  }

  const daysLate = datePaid.getDate() - dateDue.getDate();
  return ticket + daysLate;
};

rl.question('When was the ticket paid? ', (answer1) => {
  const datePaidArr = answer1.split(' ');
  const datePaid = new Date(parseInt(datePaidArr[2]),
                        parseInt(datePaidArr[0]-1), parseInt(datePaidArr[1]));
  console.log(datePaid);

  rl.question('When was the ticket due? ', (answer2) => {
    const dateDueArr = answer2.split(' ');
    const dateDue = new Date(parseInt(dateDueArr[2]),
                          parseInt(dateDueArr[0]-1), parseInt(dateDueArr[1]));
    console.log(dateDue);

    rl.question('What was the original amount of fine? ', (answer3) => {
      const ticket = parseInt(answer3.split(' ')[0]);
      console.log(`original ticket amount = ${ticket}`);

      console.log('The correct amount is ' +
        getTicketTotal(datePaid, dateDue, ticket));

      rl.close();
    });
  });
});
