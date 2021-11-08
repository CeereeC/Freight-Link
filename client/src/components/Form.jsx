import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import "./Component.css";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("/");

const initialValues = {
  sad: "",
  rad: "",
  asset: "",
  ld: "",
  units: "",
  pay: "",
};

export default function Form(props) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function addContract() {
    axios
      .post("/", {
        senderID: values.sad,
        recipientID: values.rad,
        vin: values.asset,
        units: values.units,
        loan_duration: values.ld,
        payment: values.pay,
      })
      .then((response) => {
        console.log(response.data.newTrans);
      })
      .catch((err) => {
        console.log(err, "Signature not added, try again");
      });
  }
  const deploy = async () => {
    const currentContract = {
      senderID: values.sad,
      recipientID: values.rad,
      vin: values.asset,
      units: values.units,
      loan_duration: values.ld,
      payment: values.pay,
    };
    const currentMessage = JSON.stringify(currentContract);
    const messsageData = {
      room: "4",
      author: props.hauilerID,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", messsageData);
  };

  return (
    <div className="overForm">
      <div>
        <form className="finalContract">
          <div>
            <label for="sad">Sender Address: </label>
            <input value={values.sad} onChange={handleInputChange} name="sad" />
          </div>
          <div>
            <label for="rad">Receiver Address: </label>
            <input value={values.rad} onChange={handleInputChange} name="rad" />
          </div>
          <div>
            <label for="asset">Asset ID: </label>
            <input
              value={values.asset}
              onChange={handleInputChange}
              name="asset"
            />
          </div>
          <div>
            <label for="ld">Loan Duration: </label>
            <input value={values.ld} onChange={handleInputChange} name="ld" />
          </div>
          <div>
            <label for="units">Units: </label>
            <input
              value={values.units}
              onChange={handleInputChange}
              name="units"
              label="Units: "
            />
          </div>
          <div>
            <label for="pay">Payment: </label>
            <input
              value={values.pay}
              onChange={handleInputChange}
              name="pay"
              label="Payment: "
            />
          </div>
        </form>
      </div>
      <div>
        <Fab variant="extended" onClick={() => deploy()}>
          Deploy Contract
        </Fab>
      </div>
      <br />
      <div>
        <Fab variant="extended" type="submit" onClick={() => addContract()}>
          Initiate Transaction
        </Fab>
      </div>
    </div>
  );
}
