import React, { useState } from "react";
import "./Component.css";
import container4_transparent from "../img/container4_transparent.gif";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../fonts/Hurufo/HurufoNumeroBold.ttf";

export default function Login(props) {
  const [loginText, setLoginText] = useState("Login");

  function checkCompany() {
    switch (props.companyID) {
      case "01":
        props.setCompanyID("NinjaVan");
        props.setHauilerID("Haulier Terrence");
        return true;
      case "02":
        props.setCompanyID("DHL");
        props.setHauilerID("Haulier Andrew");
        return true;
      case "03":
        props.setCompanyID("DHL");
        props.setHauilerID("Admin Micheal");
        return true;
      case "04":
        props.setCompanyID("Pacific Containers");
        props.setHauilerID("Admin James");
        return true;
      default:
        return false;
    }
  }

  function login() {
    if (checkCompany()) {
      props.change();
    } else {
      setLoginText("Invalid");
      setTimeout(() => {
        setLoginText("Login");
      }, 2000);
    }
  }

  return (
    <div className="containerLogin">
      <img className="drop" src={container4_transparent} />
      <h1
        className="logo"
        style={{
          fontFamily: "HurufoNumeroBold",
          fontWeight: "bold",
          fontSize: "2.5em",
        }}
      >
        F R E I G H T L I N K
      </h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Company ID"
          variant="outlined"
          onChange={(event) => {
            props.setCompanyID(event.target.value);
          }}
          value={props.companyID}
        />
      </div>
      <br />
      <div>
        <TextField
          id="outlined-basic"
          label="Personnel ID"
          variant="outlined"
          onChange={(event) => {
            props.setHauilerID(event.target.value);
          }}
          value={props.hauilerID}
        />
      </div>
      <br />
      <Button
        onClick={() => login()}
        variant="outlined"
        href="#outlined-buttons"
      >
        {loginText}
      </Button>
    </div>
  );
}
