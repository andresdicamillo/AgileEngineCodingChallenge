import React from 'react';
import ExpansionPanel from './Components/ExpansionPanel'
import HistoryQuery from './Graphql/HistoryQuery'
import BalanceQuery from './Graphql/BalanceQuery'
import Transaction from './Graphql/AddTransaction'
import { Typography, Grid, Paper, makeStyles } from '@material-ui/core';

const getBalance = () => {
  return (<BalanceQuery>
    { ({loading, error, data}) => {
      if (loading) return 'Loading balance...'
      if (error) return '-'
      return data.balance.total
    }}
  </BalanceQuery>)
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
    const classes = useStyles();

    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <center>
              <Typography>Your balance is: {getBalance()}</Typography>
            </center>
          </h1>
        </header>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <HistoryQuery>
              { ({loading, error, data}) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Cannot Fetch History</p>
                if (data.transactions.length === 0) return <p>No history available</p>
                return <ExpansionPanel transactions={data.transactions} />
              }}
            </HistoryQuery>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Transaction />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  export default App