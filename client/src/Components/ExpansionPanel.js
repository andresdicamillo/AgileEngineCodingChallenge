import React from 'react';
import Moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  column: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: '20%'
  },
  debit: {
    color: 'red'
  },
  credit: {
    color: 'green'
  }
}));

export default function ExpansionPanelComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {props.transactions.map((transaction, index) => {
          return (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography className={classes.column}>Type: <span className={transaction.type === 'DEBIT' ? classes.debit : classes.credit}>{transaction.type}</span></Typography>
                <Typography className={classes.column}>Amount: {transaction.amount}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <div><Typography>Date: {Moment(transaction.effectiveDate).format('MM-DD-YYYY hh:mm')}</Typography></div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
    </div>
  );
}