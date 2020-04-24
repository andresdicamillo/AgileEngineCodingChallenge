# Money accounting system

Coding challenge for handling money transactions for only one user.

Stack used for API: Node, Express, GraphQL

Stack used for Client: React, Apollo, GraphQL

## Setup api and client

```
npm install
```

## Run api and client

```
npm start
```

## Test graphql queries and Mutations

navigate http://localhost:4000/graphql and add the following mutation.

Note: There is no need to execute this queries. The interface has a form to add transactions.

```
mutation {
  addTransaction( type:"credit", amount:250) {
    id
    type
    amount
  }
}
```

to get transactions execute this query

```
{
  transactions{
    type
    amount
    effectiveDate
  }
}
```
