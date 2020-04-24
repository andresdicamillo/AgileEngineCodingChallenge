import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from "react-apollo"

const GET_TRANSACTIONS = gql`
{
  transactions {
    id
    type
    amount
    effectiveDate
  }
}
`;

const HistoryQuery = (props) => {
  return (
    <Query query={GET_TRANSACTIONS}>
    {props.children}
    </Query>)
}

export default HistoryQuery