import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/ArrowDownward';
import KeyboardArrowUpIcon from '@material-ui/icons/ArrowUpward';
import { format} from 'date-fns'
import axios from 'axios';


function createData(flightNumber, from, to, departure, arrival) {
  return {
    flightNumber,
    from,
    to,
    departure,
    arrival
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const getReturnFlights = (e) => {
    console.log(e);
     setOpen(!open) ;
  };
   

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={getReturnFlights}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.flight_number}
        </TableCell>
        <TableCell align="left">{row.from}</TableCell>
        <TableCell align="left">{row.to}</TableCell>
        <TableCell align="left">{format(row.departure_time,"PPPPp")}</TableCell>
        <TableCell align="left">{format(row.arrival_time,"PPPPp")}</TableCell>
      </TableRow>

  {/*    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>  */}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    flight_number: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    departure_time: PropTypes.string.isRequired,
    arrival_time: PropTypes.string.isRequired,

    returnFlights: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        flightNumber: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        departure: PropTypes.string.isRequired,
        arrival: PropTypes.string.isRequired,
      }),
    ).isRequired,

    price: PropTypes.number.isRequired,
    }).isRequired,
};

const yy = format(new Date(),"PPPPp"); 
const xx = yy.toString() ; 



export default function CollapsibleTable(props) {
  console.log(props.searchResults) ;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="left">Flight Number</TableCell>
            <TableCell align="left">From</TableCell>
            <TableCell align="left">To</TableCell>
            <TableCell align="left">Departure</TableCell>
            <TableCell align="left">Arrival</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.searchResults.map((row) => (
            <Row id={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}