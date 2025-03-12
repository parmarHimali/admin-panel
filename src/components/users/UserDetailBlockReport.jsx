import React, { useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  get_blocked_by_others,
  get_reported_by_me,
  get_reported_by_others,
} from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserDetailBlockReport = ({ userDetails }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { blocked_by_others, reported_by_me, reported_by_others } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    if (Object.keys(userDetails).length != 0) {
      dispatch(get_reported_by_me(userDetails._id));
    }
  }, []);

  const handleSelectBlock = (key) => {
    if (key == "other") {
      dispatch(get_blocked_by_others(userDetails._id));
    }
  };

  const handleSelectReport = (key) => {
    if (key == "me") {
      dispatch(get_reported_by_me(userDetails._id));
    } else if (key == "other") {
      dispatch(get_reported_by_others(userDetails._id));
    }
  };
  return (
    <Row className="mb-3">
      <Col md={6}>
        <div className="detail">
          <Tabs
            fill
            defaultActiveKey="me"
            id="justify-tab-example"
            className="mb-3 w-100 tabb"
            justify
            onSelect={handleSelectBlock}
          >
            {/* blocked by ME  */}
            <Tab eventKey="me" title="Blocked By Me">
              <div className="block_by_me">
                {userDetails?.block_list?.length == 0 ? (
                  <h5 className="text-secondary text-center py-3">
                    Data not found
                  </h5>
                ) : (
                  userDetails?.block_list?.map((blocked) => {
                    return (
                      <div
                        className="d-flex align-items-center gap-3 bg-dark m-3"
                        key={blocked._id}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigateTo(
                            `/user-detail/${blocked.block_user_id._id}`
                          )
                        }
                      >
                        <img
                          src={blocked.block_user_id.profile_url || "/user.jpg"}
                          alt="profile"
                          width={"40px"}
                          style={{ borderRadius: "50%" }}
                        />
                        <div className="text-light">
                          {blocked.block_user_id.full_name}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Tab>
            {/* blocked by OTHERS  */}
            <Tab eventKey="other" title="Blocked By Others">
              <div className="block_by_others">
                {blocked_by_others?.length == 0 ? (
                  <h5 className="text-secondary text-center py-3">
                    Data not found
                  </h5>
                ) : (
                  blocked_by_others?.map((blocked) => {
                    return (
                      blocked.blocked_id !== null && (
                        <div
                          className="d-flex align-items-center gap-3 bg-dark m-3"
                          key={blocked._id}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigateTo(`/user-detail/${blocked.user_id}`)
                          }
                        >
                          <img
                            src={blocked?.profile_url || "/user.jpg"}
                            alt="profile"
                            width={"40px"}
                            style={{ borderRadius: "50%" }}
                          />
                          <div className="text-light">{blocked.full_name}</div>
                        </div>
                      )
                    );
                  })
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Col>
      <Col md={6}>
        <div className="detail">
          <Tabs
            fill
            defaultActiveKey="me"
            id="justify-tab-example"
            className="mb-3 w-100 tabb"
            justify
            onSelect={handleSelectReport}
          >
            {/* reported by ME  */}
            <Tab eventKey="me" title="Reported By Me">
              <div className="block_by_me">
                {reported_by_me?.length == 0 ? (
                  <h5 className="text-secondary text-center py-3">
                    Data not found
                  </h5>
                ) : (
                  reported_by_me?.map((reported) => {
                    return (
                      <div
                        className="d-flex align-items-center gap-3 bg-dark m-3"
                        key={reported._id}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigateTo(`/user-detail/${reported.user_id}`)
                        }
                      >
                        <img
                          src={reported.profile_url || "/user.jpg"}
                          alt="profile"
                          width={"40px"}
                          style={{ borderRadius: "50%" }}
                        />
                        <div className="text-light">{reported.full_name}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </Tab>
            {/* reported by OTHERS  */}
            <Tab eventKey="other" title="Reported By Others">
              <div className="block_by_others">
                {reported_by_others?.length == 0 ? (
                  <h5 className="text-secondary text-center py-3">
                    Data not found
                  </h5>
                ) : (
                  reported_by_others?.map((reported) => {
                    return (
                      <div
                        className="d-flex align-items-center gap-3 bg-dark m-3"
                        key={reported._id}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigateTo(`/user-detail/${reported.user_id}`)
                        }
                      >
                        <img
                          src={reported?.profile_url || "/user.jpg"}
                          alt="profile"
                          width={"40px"}
                          style={{ borderRadius: "50%" }}
                        />
                        <div className="text-light">{reported.full_name}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default UserDetailBlockReport;
