import React, { useEffect } from "react";
import axios from "axios";
import { getAdminToken } from "../../../handleToken.js";
import { useHistory, useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar.js";

class DeletePopup extends React.Component {
  render() {
    return (
      <div className="delete-pop-up">
        <h3>
          Are you sure you want to delete this flight? This action is
          irrevirsable
        </h3>
        <br />
        <button className="btn btn-danger" onClick={this.props.deleteFlight}>
          Delete
        </button>
        <br />
        <br />
        <button className="btn btn-secondary" onClick={this.props.hidePopUp}>
          Cancel
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default function RootFunction(props) {
  const history = useHistory();
  const data = useLocation();
  useEffect(() => {
    if (!getAdminToken()) history.push("/adminLogin");
  }, []);
  return <EditFlight history={history} data={data} getToken={props.getToken} />;
}

class EditFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {
        _id: "",
        flight_number: "",
        from: "",
        to: "",
        departure_time: "",
        arrival_time: "",
        Economy: "",
        Business: "",
        First: "",
        adultEconomyPrice: "",
        childEconomyPrice: "",
        adultBusinessPrice: "",
        childBusinessPrice: "",
        adultFirstPrice: "",
        childFirstPrice: "",
      },
      message: "",
      showDeletePopUp: false,
    };
  }

  sendEditRequest = async (event) => {
    event.preventDefault();
    let dataCorrect = true;
    const departure_time = new Date(this.state.flight.departure_time);
    const arrival_time = new Date(this.state.flight.arrival_time);
    if (departure_time.getTime() > arrival_time.getTime()) dataCorrect = false;
    if (!dataCorrect) {
      this.setState({ message: "Error: enter valid dates and try again!" });
    } else {
      let endpoint = `http://localhost:8000/api/admin/adminUpdateFlight`;
      let reqTerms = JSON.parse(JSON.stringify(this.state.flight));
      reqTerms.token = getAdminToken();
      await axios.put(endpoint, reqTerms);
      this.setState({ message: "Flight Updated Successfully!" });
    }
  };
  deleteFlight = async (event) => {
    event.preventDefault();
    let endpoint = `http://localhost:8000/api/admin/adminDeleteFlight`;
    let reqTerms = JSON.parse(JSON.stringify(this.state.flight));
    reqTerms.token = getAdminToken();
    await axios.delete(endpoint, { data: reqTerms });
    this.hidePopUp();
    this.props.history.push("/admin");
  };

  hidePopUp = () => {
    this.setState({ showDeletePopUp: false });
    this.setState({ message: "" });
  };

  componentDidMount() {
    let flightId = this.props.data.state ? this.props.data.state.flight_id : undefined;
    let encodedSearchTerms = encodeURIComponent(
      JSON.stringify({ _id: flightId, token: getAdminToken() })
    );
    let endpoint = `http://localhost:8000/api/admin/adminSearchFlights?searchFilters=${encodedSearchTerms}`;
    axios.get(endpoint).then((res) => {
      let myFlight = res.data[0];
      myFlight.arrival_time = myFlight.arrival_time.substring(0, 16);
      myFlight.departure_time = myFlight.departure_time.substring(0, 16);
      this.setState({
        flight: myFlight,
      });
    });
  }
  set(name) {
    return (event) => {
      this.state.flight[name] = event.target.value;
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <AdminNavbar />
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={this.sendEditRequest}>
              <br />
              <h1 className="text-center">
                Edit Flight {this.state.flight.flight_number}
              </h1>
              <br />
              <label>Flight Number: </label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.flight_number}
                onChange={this.set("flight_number")}
                required
              ></input>
              <br></br>

              <label>From: </label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.from}
                onChange={this.set("from")}
                required
              ></input>
              <br></br>

              <label>To: </label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.to}
                onChange={this.set("to")}
                required
              ></input>
              <br></br>

              <label>Departure time: </label>
              <input
                type="datetime-local"
                className="form-control"
                defaultValue={this.state.flight.departure_time}
                onChange={this.set("departure_time")}
                required
              ></input>
              <br></br>

              <label>Arrival time: </label>
              <input
                type="datetime-local"
                className="form-control"
                defaultValue={this.state.flight.arrival_time}
                onChange={this.set("arrival_time")}
                required
              ></input>
              <br></br>

              <label>Economy seats: </label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.Economy}
                onChange={this.set("Economy")}
                required
              ></input>
              <br></br>

              <label>Business seats:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.Business}
                onChange={this.set("Business")}
                required
              ></input>
              <br></br>

              <label>First class seats:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.First}
                onChange={this.set("First")}
                required
              ></input>
              <br></br>

              <label>Adult Economy price:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.adultEconomyPrice}
                onChange={this.set("adultEconomyPrice")}
                required
              ></input>
              <br></br>

              <label>Child Economy price:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.childEconomyPrice}
                onChange={this.set("childEconomyPrice")}
                required
              ></input>
              <br></br>

              <label>Adult Business price:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.adultBusinessPrice}
                onChange={this.set("adultBusinessPrice")}
                required
              ></input>
              <br></br>

              <label>Child Business price:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.childBusinessPrice}
                onChange={this.set("childBusinessPrice")}
                required
              ></input>
              <br></br>

              <label>Adult First Class price:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.adultFirstPrice}
                onChange={this.set("adultFirstPrice")}
                required
              ></input>
              <br></br>

              <label>Child First Class price:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.state.flight.childFirstPrice}
                onChange={this.set("childFirstPrice")}
                required
              ></input>
              <br></br>

              <input
                className="btn btn-primary"
                type="submit"
                value="Save"
              ></input>
            </form>
            <br />
            <button
              className="btn btn-danger"
              onClick={() => {
                this.setState({ showDeletePopUp: true });
              }}
            >
              Delete
            </button>
            <br />
            <br />
            <h4 className="text-center font-weight-bold">
              {this.state.message}
            </h4>
            {this.state.showDeletePopUp ? (
              <DeletePopup
                deleteFlight={this.deleteFlight}
                hidePopUp={this.hidePopUp}
              />
            ) : null}
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}
