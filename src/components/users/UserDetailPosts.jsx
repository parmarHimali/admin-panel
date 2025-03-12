import React, { useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { rgbaWithOpacity } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getOpportunities } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserDetailPosts = ({ userDetails }) => {
  const { opportunities } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleSelect = (key) => {
    if (key == "opportunities") {
      dispatch(getOpportunities(userDetails._id));
    }
  };
  return (
    <Row className="mb-3">
      <Col>
        <div className="detail post-detail">
          <Tabs
            fill
            defaultActiveKey="posts"
            id="justify-tab-example"
            className="mb-3 w-100 tabb position-sticky top-0 z-3"
            justify
            onSelect={handleSelect}
          >
            {/* posts  */}
            <Tab eventKey="posts" title="Posts">
              <Row md={3} className="posts">
                {userDetails?.post?.length > 0 ? (
                  userDetails?.post?.map((postt) => {
                    if (postt.post_type == "text") {
                      return (
                        <Col key={postt._id} className="py-2">
                          <div
                            className="post"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigateTo(`/post-detail/${postt._id}`)
                            }
                          >
                            <h5>{postt.title}</h5>
                            <p className="text-secondary">
                              {postt.description}
                            </p>
                            <div
                              className="bedge px-2 py-1   rounded"
                              style={{
                                backgroundColor: rgbaWithOpacity(
                                  postt?.interest_id?.color_code,
                                  0.1
                                ),
                                color: postt?.interest_id?.color_code,
                              }}
                            >
                              {postt?.interest_id?.interest}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    if (postt.post_type == "poll") {
                      return (
                        <Col key={postt._id} className="py-2">
                          <div
                            className="post"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigateTo(`/post-detail/${postt._id}`)
                            }
                          >
                            <h5>{postt.title}</h5>
                            {postt?.options?.map((opt) => {
                              return (
                                <div className="poll-main" key={opt.option_key}>
                                  <div
                                    style={{
                                      width: `${opt.option_percentage}%`,
                                    }}
                                  >
                                    title
                                  </div>
                                  <div>{opt.option_percentage}</div>
                                </div>
                              );
                            })}

                            <div
                              className="bedge px-2 py-1   rounded"
                              style={{
                                backgroundColor: rgbaWithOpacity(
                                  postt?.interest_id?.color_code,
                                  0.1
                                ),
                                color: postt?.interest_id?.color_code,
                              }}
                            >
                              {postt?.interest_id?.interest}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    if (postt.post_type == "media") {
                      return (
                        <Col key={postt._id} className="py-2">
                          <div
                            className="post"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigateTo(`/post-detail/${postt._id}`)
                            }
                          >
                            <h5>{postt.title}</h5>

                            <img
                              src={
                                "https://lvlup.services:9001/public/post_media/9734_1709995832896.jpg"
                              }
                              className="post-media"
                              alt="post"
                            />

                            <div
                              className="bedge px-2 py-1 rounded"
                              style={{
                                backgroundColor: rgbaWithOpacity(
                                  postt?.interest_id?.color_code,
                                  0.1
                                ),
                                color: postt?.interest_id?.color_code,
                              }}
                            >
                              {postt?.interest_id?.interest}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                  })
                ) : (
                  <h5 className="text-secondary text-center py-3 w-100">
                    Data not found
                  </h5>
                )}
              </Row>
            </Tab>
            {/* opportunities */}
            <Tab eventKey="opportunities" title="Opportunities">
              {opportunities.length === 0 ? (
                <h5 className="text-secondary text-center py-3">
                  Data not found
                </h5>
              ) : (
                <Row className="posts" md={2}>
                  {opportunities?.map((opp) => {
                    return (
                      <Col className="py-2" key={opp._id}>
                        <div className="post">
                          <div className="title">
                            <h5 className="mb-1">{opp.position_title}</h5>
                            <h6 className="text-secondary">
                              {opp.company_name}
                            </h6>
                          </div>
                          <div className="d-flex justify-content-between gap-2">
                            <p>
                              {opp.pay_type} : {opp.pay_type == "Hourly" && "$"}
                              {opp.pay_amount}
                              {opp.pay_type == "Commission" ||
                                (opp.pay_type == "Equity" && "%")}
                            </p>
                            <span style={{ color: "#3FE266" }}>
                              {opp.position_status}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="badges d-flex gap-2">
                              <div
                                className="badge p-2"
                                style={{
                                  color: opp.industry_color_code,
                                  backgroundColor: rgbaWithOpacity(
                                    opp.industry_color_code,
                                    0.1
                                  ),
                                }}
                              >
                                {opp.industry}
                              </div>

                              <div
                                className="badge p-2"
                                style={{
                                  color: opp.position_color_code,
                                  backgroundColor: rgbaWithOpacity(
                                    opp.position_color_code,
                                    0.1
                                  ),
                                }}
                              >
                                {opp.position}
                              </div>

                              {console.log(
                                rgbaWithOpacity(opp.stage_color_code, 0.1)
                              )}
                              <div
                                className="badge p-2"
                                style={{
                                  color: opp.stage_color_code,
                                  backgroundColor: rgbaWithOpacity(
                                    opp.stage_color_code.trim(),
                                    0.1
                                  ),
                                }}
                              >
                                {opp.stage}
                              </div>
                            </div>
                          </div>
                          <div className="text-secondary my-2">
                            {opp.overview}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Tab>
            {/* saves */}
            <Tab eventKey="saves" title="Saves">
              <Row md={3} className="posts">
                {userDetails?.save_post_details?.length > 0 ? (
                  userDetails?.save_post_details?.map((postt) => {
                    if (postt.post_id?.post_type == "text") {
                      return (
                        <Col
                          key={postt.post_id._id}
                          className="py-2"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigateTo(`/post-detail/${postt.post_id._id}`)
                          }
                        >
                          <div className="post">
                            <h5>{postt.post_id?.title}</h5>
                            <p className="text-secondary">
                              {postt.post_id?.description}
                            </p>
                            <div
                              className="bedge px-2 py-1   rounded"
                              style={{
                                backgroundColor: rgbaWithOpacity(
                                  postt?.post_id?.interest_id?.color_code,
                                  0.1
                                ),
                                color: postt?.post_id?.interest_id?.color_code,
                              }}
                            >
                              {postt?.post_id?.interest_id?.interest}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    if (postt.post_id?.post_type == "poll") {
                      return (
                        <Col key={postt.post_id._id} className="py-2">
                          <div className="post">
                            <h5>{postt.post_id?.title}</h5>
                            {postt.post_id?.options?.map((opt) => {
                              return (
                                <div className="poll-main">
                                  <div
                                    style={{
                                      width: `${opt.option_percentage}%`,
                                    }}
                                  >
                                    title
                                  </div>
                                  <div>{opt.option_percentage}</div>
                                </div>
                              );
                            })}

                            <div
                              className="bedge px-2 py-1   rounded"
                              style={{
                                backgroundColor: rgbaWithOpacity(
                                  postt?.interest_id?.color_code,
                                  0.1
                                ),
                                color: postt?.interest_id?.color_code,
                              }}
                            >
                              {postt?.interest_id?.interest}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                    if (postt.post_id?.post_type == "media") {
                      return (
                        <Col key={postt.post_id?._id} className="py-2">
                          <div
                            className="post"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigateTo(`/post-detail/${postt.post_id?._id}`)
                            }
                          >
                            <h5>{postt.post_id?.title}</h5>

                            <img
                              src={
                                "https://lvlup.services:9001/public/post_media/9734_1709995832896.jpg"
                              }
                              className="post-media"
                              alt="post"
                            />

                            <div
                              className="bedge px-2 py-1 rounded"
                              style={{
                                backgroundColor: rgbaWithOpacity(
                                  postt.post_id?.interest_id?.color_code,
                                  0.1
                                ),
                                color: postt?.interest_id?.color_code,
                              }}
                            >
                              {postt.post_id?.interest_id?.interest}
                            </div>
                          </div>
                        </Col>
                      );
                    }
                  })
                ) : (
                  <h5 className="text-secondary text-center py-3 w-100">
                    Data not found
                  </h5>
                )}
              </Row>
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default UserDetailPosts;
