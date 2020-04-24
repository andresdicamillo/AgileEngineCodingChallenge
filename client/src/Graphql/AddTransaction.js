import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';

const ADD_TRANSACTION = gql`
  mutation create($amount: Int!, $type: String!) {
    addTransaction(amount: $amount, type: $type) {
      id
      amount
      type
    }
  }
`;

const Transaction = () => {
  const [amount, setAmount] = React.useState(0)
  const [type, setType] = React.useState('CREDIT');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <Mutation mutation={ADD_TRANSACTION} variables={{ amount: parseInt(amount), type }} onError={() => {}}>
      {(addTransaction, result) => {
        const { data, loading, error, called } = result;

        if (!called || error) {
          return (
            <div>
              <form autoComplete="off">
                {error && <div>
                  {<Alert severity="error">{error.message}</Alert>}
                </div>}
                <div>
                  <FormControl component="fieldset">
                    <TextField
                      type="number"
                      placeholder="Amount"
                      value={amount}
                      onChange={handleAmountChange}
                      label="Insert Amount"
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleTypeChange}>
                      <FormControlLabel value="CREDIT" control={<Radio />} label="Credit" />
                      <FormControlLabel value="DEBIT" control={<Radio />} label="Debit" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addTransaction}
                >
                  Add new transaction
                </Button>
                </div>
              </form>
            </div>
          );
        }
        if (loading) {
          return <div>LOADING</div>;
        }

        if (data) {
          const { amount, id } = data.addTransaction;

          return (
            <div>
              <div>{`Transaction with ${amount} amount added with id ${id}`}</div>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.location.reload()}
                >
                  See results
                </Button>
            </div>
          );
        } else {
          return null;
        }
      }}
    </Mutation>
  );
}

export default Transaction