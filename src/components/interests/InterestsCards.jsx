import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubInterests,
  blockUnblockInterest,
  blockUnblockSubInterest,
  dltInterest,
  dltSubInterest,
  editInterests,
  editSubInterest,
} from "../../store/interestSlice";
import { toast } from "react-toastify";
import { rgbaWithOpacity, rgbToHex } from "../../App";
const InterestsCards = () => {
  const [showSubInterest, setShowSubInterest] = useState(false);
  const [subInterest, setSubInterest] = useState("");
  const [addSubId, setAddSubId] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    interest: "",
    color_code: "",
  });

  const [isSubEdit, setIsSubEdit] = useState(false);
  const [subEditData, setSubEditData] = useState({
    subinterest_id: "",
    sub_interest: "",
  });

  const { subInterests, loadSubInterest, filteredInterest } = useSelector(
    (state) => state.interests
  );

  const dispatch = useDispatch();

  const handleAddSubInterest = async (e) => {
    e.preventDefault();
    console.log({ addSubId, subInterest });

    try {
      const res = await dispatch(
        addSubInterests({ addSubId, subInterest })
      ).unwrap();
      if (res.success) {
        toast.success(res.message);
        setShowSubInterest(false);
        setSubInterest("");
        setAddSubId("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }; //done

  const handleEditInterest = async (e, iId) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        editInterests({
          interest_id: iId,
          interestd: editData.interest,
          color_code: editData.color_code,
        })
      ).unwrap();
      if (data.success) {
        setIsEdit(false);
        setEditData({
          _id: "",
          interest: "",
          color_code: "",
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.messgae);
    }
  }; //done
  const handleDeleteSubInterest = async (subId) => {
    try {
      const data = await dispatch(dltSubInterest(subId)).unwrap();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }; //done
  const handleSubEdit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(editSubInterest(subEditData)).unwrap();
      if (data.success) {
        setSubEditData({
          sub_interest: "",
          subinterest_id: "",
        });
        setIsSubEdit(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }; //done
  const handleDeleteInterest = async (iId) => {
    try {
      const data = await dispatch(dltInterest(iId)).unwrap();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }; //done
  const handleBlockSub = async (subID) => {
    try {
      const data = await dispatch(blockUnblockSubInterest(subID)).unwrap();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }; //done
  const handleBlockInterest = async (iId) => {
    try {
      const data = await dispatch(blockUnblockInterest(iId)).unwrap();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }; //done

  return (
    <>
      {loadSubInterest ? (
        <div className="d-flex w-100 justify-content-center">
          <Spinner animation="grow" variant="light" />
        </div>
      ) : filteredInterest?.length == 0 ? (
        <h5 className="text-secondary text-center py-3">Interests not found</h5>
      ) : (
        filteredInterest?.map((subInt) => {
          return (
            <div className="interest-card" key={subInt._id}>
              <div className="card-heading mb-3">
                <div className="card-badge">
                  <div
                    className="badge"
                    style={{
                      color: subInt.color_code,
                      backgroundColor: rgbaWithOpacity(subInt.color_code, 0.1),
                    }}
                  >
                    {subInt.interest}
                  </div>
                </div>
                <div className="btn-container">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setIsEdit(true);
                      setEditData({
                        _id: subInt._id,
                        interest: subInt.interest,
                        color_code: subInt.color_code.startsWith("#")
                          ? subInt.color_code
                          : rgbToHex(subInt.color_code),
                      });
                    }}
                  >
                    <CiEdit />
                  </Button>
                  <Button
                    variant={
                      subInt.is_block ? "outline-success" : "outline-warning"
                    }
                    size="sm"
                    onClick={() => {
                      const isBlock = confirm(
                        `Are you sure to ${
                          subInt.is_block ? "activate" : "Deactivate"
                        } the interest?`
                      );
                      if (isBlock) {
                        handleBlockInterest(subInt._id);
                      }
                    }}
                  >
                    <MdBlockFlipped />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      const isDelete = confirm(
                        "Are you sure to delete the interest?"
                      );
                      if (isDelete) {
                        handleDeleteInterest(subInt._id);
                      }
                    }}
                  >
                    <RiDeleteBin7Line />
                  </Button>
                  <Button
                    className="outline-pink d-flex gap-1 align-items-center"
                    size="sm"
                    onClick={() => {
                      setShowSubInterest(true);
                      setAddSubId(subInt._id);
                    }}
                  >
                    <IoAddOutline />
                    <span>Add Sub-Interest</span>
                  </Button>
                </div>
              </div>
              <hr style={{ color: "white" }} className="my-2" />
              <span className="sub-heading">Sub Interests</span>
              <Row
                className="sub-cards-container mt-2"
                xl={4}
                lg={3}
                md={2}
                sm={1}
              >
                {subInt.sub_interest_data.length == 0 ? (
                  <>
                    <h6 className="text-secondary">No sub-interest found!</h6>
                  </>
                ) : (
                  subInt?.sub_interest_data?.map((sub) => {
                    return (
                      <Col className="sub-card" key={sub._id}>
                        <div className="sub">
                          <div className="sub-card-title">
                            {sub.sub_interest}
                          </div>
                          <hr
                            style={{ color: "white" }}
                            className="mt-2 mb-0"
                          />
                          <span className="sub-heading">Action</span>
                          <div className="btn-container mt-2 justify-content-end">
                            <Button
                              variant="outline-primary"
                              className="py-1"
                              onClick={() => {
                                setIsSubEdit(true);
                                setSubEditData({
                                  subinterest_id: sub._id,
                                  sub_interest: sub.sub_interest,
                                });
                              }}
                            >
                              <CiEdit />
                            </Button>
                            <Button
                              className="py-1"
                              variant={
                                sub.is_block
                                  ? "outline-success"
                                  : "outline-warning"
                              }
                              onClick={() => {
                                const isBlock = confirm(
                                  `Are you sure to ${
                                    sub.is_block ? "activate" : "Deactivate"
                                  } the sub-interest?`
                                );
                                if (isBlock) {
                                  handleBlockSub(sub._id);
                                }
                              }}
                            >
                              <MdBlockFlipped />
                            </Button>
                            <Button
                              className="py-1"
                              variant="outline-danger"
                              onClick={() => {
                                const isDelete = confirm(
                                  "Are you sure to delete the sub-interest?"
                                );
                                if (isDelete) {
                                  handleDeleteSubInterest(sub._id);
                                }
                              }}
                            >
                              <RiDeleteBin7Line />
                            </Button>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                )}
              </Row>
            </div>
          );
        })
      )}

      {/* edit sub interest  */}
      <Modal show={isSubEdit} centered>
        <div className="d-flex justify-content-between px-3 pt-3">
          <h6>Edit Sub-Interest</h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => {
              setIsSubEdit(false);
              setSubEditData({
                sub_interest: "",
                subinterest_id: "",
              });
            }}
          ></button>
        </div>
        <Modal.Body>
          <Form
            onSubmit={handleSubEdit}
            className="d-flex align-items-center gap-3 mb-2"
          >
            <Form.Control
              className="bg-dark"
              type="text"
              placeholder="Sub-Interest Name"
              size="sm"
              value={subEditData.sub_interest}
              onChange={(e) =>
                setSubEditData({
                  ...subEditData,
                  sub_interest: e.target.value.trimStart(),
                })
              }
            />
            <Button
              className="d-flex gap-1 align-items-center btn-pink"
              size="sm"
              type="submit"
            >
              <IoAddOutline />
              <span>Save</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* edit interest  */}
      <Modal show={isEdit} centered>
        <div className="d-flex justify-content-between px-3 pt-3">
          <h6>Edit Interest</h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setIsEdit(false)}
          ></button>
        </div>
        <Modal.Body>
          <Form className="d-flex align-items-center gap-3 mb-2">
            <Form.Control
              type="color"
              value={editData.color_code}
              // defaultValue={editData.color_code}
              onChange={(e) =>
                setEditData({ ...editData, color_code: e.target.value })
              }
            />
            <Form.Control
              className="bg-dark"
              type="text"
              placeholder="Sub-Interest Name"
              size="sm"
              value={editData.interest}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  interest: e.target.value.trimStart(),
                })
              }
            />
            <Button
              className="d-flex gap-1 align-items-center btn-pink"
              size="sm"
              type="submit"
              onClick={(e) => handleEditInterest(e, editData._id)}
            >
              <IoAddOutline />
              <span>Save</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* add sub interest  */}
      <Modal show={showSubInterest} centered>
        <div className="d-flex justify-content-between px-3 pt-3">
          <h6>Add Sub-Interest</h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShowSubInterest(false)}
          ></button>
        </div>
        <Modal.Body>
          <Form
            onSubmit={handleAddSubInterest}
            className="d-flex align-items-center gap-3 mb-2"
          >
            <Form.Control
              className="bg-dark"
              type="text"
              placeholder="Sub-Interest Name"
              size="sm"
              value={subInterest}
              onChange={(e) => setSubInterest(e.target.value.trimStart())}
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

export default InterestsCards;
