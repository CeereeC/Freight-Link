import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Component.css";
import Form from "./Form";

const accordionLine = {
  "&.MuiAccordion-root:before": {
    backgroundColor: "white",
  },
};

export default function Extension(props) {
  return (
    <div>
      <Accordion
        elevation={0}
        classes={{
          root: accordionLine,
        }}
        icons={false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div
            className="yellow_background"
            style={{ textAlign: "center", width: "100%" }}
          >
            <h1 style={{ fontFamily: "HurufoNumeroThin" }}>
              Create Smart Contract
            </h1>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Form hauilerID={props.hauilerID} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
