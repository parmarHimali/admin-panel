import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IoAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addInterest, setFilteredInterest } from "../../store/interestSlice";

const InterestsHeader = () => {
  const [showInterest, setShowInterest] = useState(false);
  const [interestName, setInterestName] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [search, setSearch] = useState("");
  const { subInterests } = useSelector((state) => state.interests);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!showInterest && (interestName != "" || color != "#ffffff")) {
      setColor("#ffffff");
      setInterestName("");
    }
  }, [showInterest]);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (interestName.trim() == "") {
      toast.error("Please provide interest name");
      return;
    }
    try {
      const data = await dispatch(
        addInterest({ interestName, color })
      ).unwrap();
      if (data.success) {
        toast.success(data.message);
        setInterestName("");
        setColor("#ffffff");
        setShowInterest(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    const filtered = subInterests
      .map((interest) => {
        const matchedSubInterests = interest?.sub_interest_data.filter((sub) =>
          sub.sub_interest.toLowerCase().includes(query.toLowerCase())
        );

        return matchedSubInterests.length > 0
          ? { ...interest, sub_interest_data: matchedSubInterests }
          : null;
      })
      .filter(Boolean);
    dispatch(setFilteredInterest(filtered));
  };
  return (
    <>
      <div className="mt-3">Interests</div>
      <div className="d-flex justify-content-between my-3">
        <Form className="w-50">
          <Form.Control
            type="text"
            placeholder="Search here"
            className="bg-dark border-dark"
            value={search}
            onChange={handleSearch}
          />
        </Form>
        <Button
          className="btn-pink d-flex gap-2 align-items-center"
          onClick={() => setShowInterest(true)}
        >
          <IoAddOutline />
          <span>Add Interest</span>
        </Button>
      </div>
      <Modal show={showInterest} onHide={() => setShowInterest(false)} centered>
        <div className="d-flex justify-content-between px-3 pt-3">
          <h6>Add Interest</h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShowInterest(false)}
          ></button>
        </div>
        <Modal.Body>
          <Form
            onSubmit={handleAdd}
            className="d-flex align-items-center gap-3 mb-2"
          >
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Form.Control
              className="bg-dark"
              type="text"
              placeholder="Interest Name"
              size="sm"
              value={interestName}
              onChange={(e) => setInterestName(e.target.value.trimStart())}
            />
            <Button
              className="d-flex gap-1 align-items-center"
              size="sm"
              type="submit"
              variant="light"
            >
              <IoAddOutline />
              <span>Add</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InterestsHeader;
