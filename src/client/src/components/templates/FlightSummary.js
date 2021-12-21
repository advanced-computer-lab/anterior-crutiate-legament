import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";


export default function FlightSummary(props) {
  const [flight, setFlight] = React.useState({
    from: "",
    to: "",
    departure_time: "",
    arrival_time: "",
    Economy: "",
    Business: "",
    First: "",
  });

  const loadDataOnlyOnce = () => {
    let encodedSearchTerms = encodeURIComponent(
      JSON.stringify({ _id: props._id })
    );
    axios
      .get(
        `http://localhost:8000/api/user/searchFlights?searchFilters=${encodedSearchTerms}`
      )
      .then((flight) => {
        if (flight.data[0])
          setFlight({
            ...flight.data[0],
            departure_time: format(
              Date.parse(flight.data[0].departure_time),
              "PPPPp"
            ),
            arrival_time: format(
              Date.parse(flight.data[0].arrival_time),
              "PPPPp"
            ),
          });
        console.log(flight.data[0]);
        console.log("hi");
      });
  }

  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  
  return (
    <>
      <hr />
      <h3 className="text-center">
        {props.header} | From: {flight.from} To: {flight.to}
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell align="left">Departure</TableCell>
              <TableCell align="left">Arrival</TableCell>
              <TableCell align="left">Economy Seats</TableCell>
              <TableCell align="left">Business Seats</TableCell>
              <TableCell align="left">First Seats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={flight.flight_number}>
              <TableCell component="th" scope="row">
                {flight.flight_number}
              </TableCell>
              <TableCell align="left">{flight.departure_time}</TableCell>
              <TableCell align="left">{flight.arrival_time}</TableCell>
              <TableCell align="left">{flight.Economy}</TableCell>
              <TableCell align="left">{flight.Business}</TableCell>
              <TableCell align="left">{flight.First}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
