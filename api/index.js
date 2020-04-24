const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const transactions = []
let counter = 1
let isExecutingTransaction = false

const schema = buildSchema(`
  scalar Date

  enum Type {
    CREDIT
    DEBIT
  }

  type Transaction {
    id: Int
    type: Type
    amount: Int
    effectiveDate: Date
  }

  type Balance {
    total: Int
    error: Boolean
  }

  type Query {
    balance: Balance
    transactions: [Transaction]
    transaction(id: Int): Transaction
  }

  type Mutation {
    addTransaction(type: String, amount: Int): Transaction
  }
`);

var root = {
  balance: () => {
    let result = { total: 0, error: false }
    if (isExecutingTransaction) return result.error = true
    
    transactions.forEach((transaction) => {
      result.total = transaction.type === 'DEBIT' ? result.total - transaction.amount : result.total + transaction.amount
    });
    return result;
  },
  transactions: () => {
    return transactions
  },
  transaction: (data) => {
    return transactions.filter(transaction => transaction.id === data.id);
  },
  addTransaction: (data) => {
    if (data.amount <= 0) throw new Error('Amount must be greater than 0');
    isExecutingTransaction = true
    const transaction = {
      'id': counter,
      'type': data.type,
      'amount': data.amount,
      'effectiveDate': new Date()
    }
    transactions.push(transaction);
    counter++;
    isExecutingTransaction = false
    return transaction
  }
}

const app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000)
console.log('Transactions API running on port: 4000');