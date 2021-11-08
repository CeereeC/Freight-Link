import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export default function Block(props) {
  const ledger = props.ledger;
  console.log(ledger);
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary={"Hash: " + ledger._id} />
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText primary={"Sender ID: " + ledger.senderID} />
      </ListItem>
      <ListItem>
        <ListItemText primary={"Recipient ID: " + ledger.recipientID} />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={"Asset ID: " + ledger.vin} />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={"Units: " + ledger.units} />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={"Loan Duration: " + ledger.loan_duration} />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={"Payment: " + ledger.payment} />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={"Date of Transaction: " + ledger.time} />
      </ListItem>
    </List>
  );
}
