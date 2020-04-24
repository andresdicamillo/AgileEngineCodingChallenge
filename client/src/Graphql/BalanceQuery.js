import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from "react-apollo"

const GET_BALANCE = gql`
  {
    balance {
      total
      error
    }
  }
`;

const BalanceQuery = (props) => {
  return (
    <Query query={GET_BALANCE}>
    {props.children}
    </Query>
  )
}

export default BalanceQuery