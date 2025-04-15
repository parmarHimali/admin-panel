import React from "react";
import { Button, Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import {
  getConnectionDetails,
  handleBlockUser,
  handleDeleteUser,
  removeSelectedUser,
} from "../../store/userSlice";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdBlockFlipped, MdVerified } from "react-icons/md";

const UserDetailProfile = ({ userDetails }) => {
  const { connectionDetail, loadingDetails } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleSelect = (key) => {
    if (key == "connections") {
      dispatch(getConnectionDetails(userDetails._id));
    }
  };
  return (
    <Row md={2} className="my-3">
      <Col>
        <div className="detail d-flex flex-column align-items-center">
          <img
            src={userDetails?.profile_url || "/user.jpg"}
            alt="profile"
            crossOrigin="anonymous"
            width={"80px"}
            className="mb-2"
            style={{ borderRadius: "50%" }}
          />
          <h5>
            {userDetails?.full_name} {`(${userDetails?.unique_name})`}{" "}
            {userDetails.is_verified ? <MdVerified /> : ""}
          </h5>
          <div>Email : {userDetails?.email_address || "-"}</div>
          <div>
            Birth Date :{" "}
            {new Date(userDetails?.dob)
              .toUTCString()
              .split(" ")
              .slice(0, 4)
              .join(" ") || "-"}
          </div>
          <div>
            Mobile No. : {userDetails?.country_code}{" "}
            {userDetails?.mobile_number || "-"}
          </div>
          <div>Name Of Follower : {userDetails?.name_of_followers || "-"}</div>
          <div className="btn-container my-3">
            <Button
              variant={
                userDetails?.is_block ? "outline-success" : "outline-warning"
              }
              className="py-2 px-2"
              onClick={() => {
                const isBlock = confirm(
                  `Are you sure to ${
                    userDetails?.is_block ? "unblock" : "block"
                  } the account?`
                );
                if (isBlock) {
                  dispatch(
                    handleBlockUser({
                      userId: userDetails?._id,
                    })
                  );
                }
              }}
            >
              <MdBlockFlipped />
            </Button>
            <Button
              variant="outline-danger"
              className="py-2 px-2"
              onClick={() => {
                const isDelete = confirm("Are you sure to delete the account?");
                if (isDelete) {
                  dispatch(handleDeleteUser(userDetails._id));
                }
                dispatch(removeSelectedUser());
                navigateTo("/users/1/10");
              }}
            >
              <RiDeleteBin7Line />
            </Button>
          </div>
          <Row>
            <Col className="text-center">
              <h5>{userDetails?.follower_count}</h5>
              <span>Followers</span>
            </Col>
            <Col className="text-center">
              <h5>{userDetails?.following_count}</h5>
              <span>Followings</span>
            </Col>
            <Col className="text-center">
              <h5>{userDetails?.post_count}</h5>
              <span>Posts</span>
            </Col>
            <Col className="text-center">
              <h5>{userDetails?.block_other_count}</h5>
              <span>Blocked</span>
            </Col>
            <Col className="text-center">
              <h5>{userDetails?.report_count}</h5>
              <span>Reports</span>
            </Col>
          </Row>
        </div>
      </Col>
      <Col>
        <div className="detail">
          <Tabs
            fill
            defaultActiveKey="followers"
            id="justify-tab-example"
            className="mb-3 w-100 tabb"
            justify
            onSelect={handleSelect}
          >
            <Tab eventKey="followers" title="Followers">
              <div className="followers">
                {userDetails?.followers_list?.length == 0 ? (
                  <h5 className="text-secondary text-center py-3">
                    Data not found
                  </h5>
                ) : (
                  userDetails?.followers_list?.map((follower) => {
                    return (
                      <div
                        className="d-flex align-items-center gap-3 bg-dark m-3"
                        key={follower._id}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigateTo(`/user-detail/${follower?.user_id?._id}`)
                        }
                      >
                        <img
                          src={follower.user_id.profile_url || "/user.jpg"}
                          alt="profile"
                          width={"40px"}
                          crossOrigin="anonymous"
                          style={{ borderRadius: "50%" }}
                        />
                        <div className="text-light">
                          {follower.user_id.full_name}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Tab>
            {console.log("following list", userDetails?.following_list)}
            <Tab eventKey="followings" title="Followings">
              <div className="followings">
                {userDetails?.following_list?.length == 0 ? (
                  <h5 className="text-secondary text-center py-3">
                    Data not found
                  </h5>
                ) : (
                  userDetails?.following_list?.map((following) => {
                    return (
                      following.following_id !== null && (
                        <div
                          className="d-flex align-items-center gap-3 bg-dark m-3"
                          key={following._id}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigateTo(
                              `/user-detail/${following?.following_id?._id}`
                            )
                          }
                        >
                          <img
                            src={
                              following.following_id?.profile_url || "/user.jpg"
                            }
                            alt="profile"
                            width={"40px"}
                            crossOrigin="anonymous"
                            style={{ borderRadius: "50%" }}
                          />
                          <div className="text-light">
                            {following.following_id?.full_name}
                          </div>
                        </div>
                      )
                    );
                  })
                )}
              </div>
            </Tab>
            <Tab eventKey="connections" title="Connections">
              {loadingDetails ? (
                <div className="w-100 mt-3 text-center">
                  <Spinner animation="grow" variant="secondary" />
                </div>
              ) : (
                <div className="connections">
                  {connectionDetail.length > 0 ? (
                    connectionDetail?.map((conn) => {
                      return (
                        <div
                          className="d-flex align-items-center gap-3 m-3 bg-dark"
                          key={conn._id}
                          style={{ cursor: "pointer" }}
                          onClick={() => navigateTo(`/user-detail/${conn._id}`)}
                        >
                          <img
                            src={conn.profile_url || "/user.jpg"}
                            alt="profile"
                            width={"40px"}
                            crossOrigin="anonymous"
                            style={{ borderRadius: "50%" }}
                          />
                          <div className="text-light">{conn.full_name}</div>
                        </div>
                      );
                    })
                  ) : (
                    <h5 className="text-secondary text-center py-3">
                      Data not found
                    </h5>
                  )}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default UserDetailProfile;
