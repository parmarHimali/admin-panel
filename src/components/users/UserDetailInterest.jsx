import React, { useState } from "react";
import { Col, ListGroup, Modal, Row } from "react-bootstrap";
import { rgbaWithOpacity } from "../../App";
import { MdVerified } from "react-icons/md";

const UserDetailInterest = ({ userDetails }) => {
  const [showImg, setShowImg] = useState(false);
  return (
    <Row className="mb-3">
      <Col md={8}>
        <div className="detail">
          <h6>verification info</h6>
          <hr />
          {userDetails.is_verified ? (
            <Row className="verification-detail">
              <Col lg={4}>
                <img
                  src={
                    // userDetails.account_verification?.gov_document ??
                    "https://lvlup.services:9001/public/verification_document/9879_1735557043735.png"
                  }
                  alt="government document"
                  height={"300px"}
                  width={"100%"}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setShowImg(true)}
                />
              </Col>
              <Col>
                <Row sm={1} className="gap-2">
                  <Col className="d-flex justify-content-between">
                    <span>Legal Name :</span>
                    <span>{userDetails.account_verification?.legal_name}</span>
                  </Col>
                  <Col className="d-flex justify-content-between">
                    <span>DOB :</span>
                    <span>
                      {new Date(userDetails.account_verification?.dob)
                        .toUTCString()
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")}
                    </span>
                  </Col>
                  <Col className="d-flex justify-content-between">
                    <span>Country :</span>
                    <span>
                      {userDetails.account_verification?.country_name}
                    </span>
                  </Col>
                  <Col className="d-flex justify-content-between">
                    <span>Profession :</span>
                    <span>{userDetails.account_verification?.profession}</span>
                  </Col>
                  <Col className="d-flex justify-content-between">
                    <span>Link :</span>
                    <a
                      href={
                        userDetails.account_verification?.news_source_one?.startsWith(
                          "http"
                        )
                          ? userDetails.account_verification?.social_link
                          : `https://${userDetails.account_verification?.social_link}`
                      }
                      target="_blank"
                    >
                      {userDetails.account_verification?.social_link}
                    </a>
                  </Col>
                  <Col className="d-flex justify-content-between">
                    <span>Link :</span>
                    <div className="d-flex flex-column">
                      <a
                        href={
                          userDetails.account_verification?.news_source_one?.startsWith(
                            "http"
                          )
                            ? userDetails.account_verification?.news_source_one
                            : `https://${userDetails.account_verification?.news_source_one}`
                        }
                        target="_blank"
                      >
                        {userDetails.account_verification?.news_source_one}
                      </a>
                      <a
                        target="_blank"
                        href={
                          userDetails.account_verification?.news_source_one?.startsWith(
                            "http"
                          )
                            ? userDetails.account_verification?.news_source_two
                            : `https://${userDetails.account_verification?.news_source_two}`
                        }
                      >
                        {userDetails.account_verification?.news_source_two}
                      </a>
                      <a
                        target="_blank"
                        href={
                          userDetails.account_verification?.news_source_one?.startsWith(
                            "http"
                          )
                            ? userDetails.account_verification
                                ?.news_source_three
                            : `https://${userDetails.account_verification?.news_source_three}`
                        }
                      >
                        {userDetails.account_verification?.news_source_three}
                      </a>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} className="align-self-end">
                {userDetails.account_verification.verified_status ==
                  "verified" && (
                  <div
                    className="btn-sm me-2 d-flex justify-content-center align-items-center"
                    style={{
                      color: "rgb(5, 119, 33)",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <MdVerified />
                      <span>Verifed</span>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          ) : (
            <h5 className="text-secondary text-center py-3">Data not found</h5>
          )}
        </div>
      </Col>
      <Col md={4}>
        <div className="detail">
          <h6>Interest</h6>
          <hr />
          <div className="interest-details">
            {userDetails?.interested?.length > 0 ? (
              <ListGroup>
                {userDetails?.interested?.map((interest) => {
                  return (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
                      key={interest._id}
                    >
                      <span>{interest.sub_interest}</span>
                      <div
                        className="bedge p-1 px-2 rounded"
                        style={{
                          color: interest.interest_id.color_code,
                          backgroundColor: rgbaWithOpacity(
                            interest.interest_id.color_code,
                            0.1
                          ),
                          fontSize: "14px",
                        }}
                      >
                        {interest.interest_id.interest}
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <h5 className="text-secondary text-center py-3">
                Data not found
              </h5>
            )}
          </div>
        </div>
      </Col>
      <Modal
        show={showImg}
        onHide={() => setShowImg(false)}
        className="d-flex justify-content-center post-modal"
        centered
      >
        <img
          src={
            // userDetails.account_verification?.gov_document ??
            "https://lvlup.services:9001/public/verification_document/9879_1735557043735.png"
          }
          style={{ width: "500px", height: "600px", objectFit: "contain" }}
          alt="government document"
          onClick={() => setShowImg(true)}
        />
      </Modal>
    </Row>
  );
};

export default UserDetailInterest;
