import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import InterestsHeader from "./InterestsHeader";
import InterestsCards from "./InterestsCards";

const Interests = () => {
  return (
    <Container style={{ width: "95%" }}>
      <InterestsHeader />
      <div className="horizontal-line">
        <hr style={{ color: "white" }} />
        <span>Interests</span>
      </div>
      <div className="d-flex flex-column gap-3 mb-4">
        <InterestsCards />
        {/* <InterestsCards /> */}
        {/* <InterestsCards /> */}
      </div>
    </Container>
  );
};

export default Interests;
