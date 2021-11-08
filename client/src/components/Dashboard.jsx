import React, { useState } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Block from "./Block";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Extension from "./Extension";
import Extend from "./Extend";
import "./Component.css";

export default function Dashboard(props) {
  const [transacts, setTransacts] = useState([]);
  const [hist, setHist] = useState(false);

  const scrollable = {
    width: "50em",
    overflowX: "auto",
    whiteSpace: "nowrap",
    margin: "auto",
  };

  function getTrans() {
    axios
      .get("/t")
      .then((response) => {
        const latest = response.data.transactions;
        setTransacts(latest);
        setHist(true);
      })
      .catch((err) => {
        console.log(err, "Signature not added, try again");
      });
  }

  function BlockChain() {
    console.log(transacts);
    return transacts.map((item) => <Block ledger={item} />);
  }

  return (
    <div className="dashB">
      <h2
        style={{
          fontFamily: "HurufoNumeroThin",
          fontWeight: "bold",
          fontSize: "2.5em",
        }}
      >
        Company : {props.companyID}
      </h2>
      <h2
        style={{
          fontFamily: "HurufoNumeroThin",
          fontWeight: "bold",
          fontSize: "2.5em",
        }}
      >
        ID : {props.hauilerID}
      </h2>

      <Extend />
      <Extension hauilerID={props.hauilerID} />
      <br />
      <br />
      <Fab
        variant="extended"
        onClick={() => (hist ? setHist(false) : getTrans())}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        View Transaction History
      </Fab>
      {hist && (
        <div style={scrollable}>
          <Stack direction="row" spacing={2}>
            <BlockChain blocks={transacts} />
          </Stack>
        </div>
      )}
    </div>
  );
}
