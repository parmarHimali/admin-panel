import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_post_details } from "../../store/postSlice";
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { getCookieValue, rgbaWithOpacity } from "../../App";

const PostDetails = () => {
  const { pid } = useParams();
  const { postDetails, postLoading } = useSelector((state) => state.posts);
  const [showImage, setShowImage] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const admin_token = getCookieValue("admin_token");
    if (!admin_token) {
      navigateTo("/signin");
    }
  }, []);
  useEffect(() => {
    dispatch(get_post_details(pid));
  }, []);
  useEffect(() => {
    console.log(postDetails);
  }, [postDetails]);
  return (
    <Container className="user-details mb-3 d-flex justify-content-center">
      {postLoading ? (
        <div className="d-flex w-100 justify-content-center pt-3">
          <Spinner variant="light" animation="grow" />
        </div>
      ) : (
        <Row className="my-5 ">
          <Col>
            <div
              className="post-details p-5 d-flex justify-content-center flex-column align-items-center"
              style={{ width: "fit-content" }}
            >
              <h6>Post Details</h6>
              <div className="">
                <div className="fw-bold">Created By</div>
                <div className="d-flex align-items-center gap-3 m-3">
                  <img
                    src={postDetails?.user_id?.profile_url || "/user.jpg"}
                    alt="profile"
                    width={"40px"}
                    crossOrigin="anonymous"
                    style={{ borderRadius: "50%" }}
                  />
                  <div className="text-light">
                    {postDetails?.user_id?.full_name}
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-bold mb-2">Post details</div>
                  <div
                    className="bedge px-2 py-1 mt-2 rounded"
                    style={{
                      backgroundColor: rgbaWithOpacity(
                        postDetails.interest_id?.color_code,
                        0.1
                      ),
                      color: postDetails.interest_id?.color_code,
                      width: "fit-content",
                    }}
                  >
                    {postDetails.interest_id?.interest}
                  </div>
                </div>
                <Row>
                  <Col lg={3}>Title</Col>
                  <Col lg={9} style={{ color: "#ccc" }}>
                    {postDetails.title || "-"}
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>Description</Col>
                  <Col lg={9} style={{ color: "#ccc" }}>
                    {postDetails.description || "-"}
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>Post Type</Col>
                  <Col lg={9} style={{ color: "#ccc" }}>
                    {postDetails.post_type}
                  </Col>
                </Row>
                {postDetails.post_type == "poll" && (
                  <Col className="py-2">
                    <div className="post" style={{ cursor: "pointer" }}>
                      {postDetails.options?.map((opt) => {
                        return (
                          <div className="poll-main mt-2" key={opt.option_key}>
                            <div
                              style={{
                                width: `${opt.option_percentage}%`,
                              }}
                            >
                              {opt.option_value}
                            </div>
                            <div>{opt.option_percentage}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                )}
                {postDetails.post_type == "media" && (
                  <img
                    src="https://lvlup.services:9001/public/post_media/9734_1709995832896.jpg"
                    alt="post pic"
                    className="post-media mt-2"
                    crossOrigin="anonymous"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowImage(true)}
                  />
                )}
                <hr />
                <Row className="mt-4">
                  <Col className="text-center">
                    <h5>{postDetails.view_count}</h5>
                    <span>Views</span>
                  </Col>
                  <Col className="text-center">
                    <h5>{postDetails.like_count}</h5>
                    <span>Likes</span>
                  </Col>
                  <Col className="text-center">
                    <h5>{postDetails.comment_count}</h5>
                    <span>Comments</span>
                  </Col>
                  <Col className="text-center">
                    <h5>{postDetails.repost_count}</h5>
                    <span>Reposts</span>
                  </Col>
                  <Col className="text-center">
                    <h5>{postDetails.post_save_count}</h5>
                    <span>Saved</span>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <Modal
        show={showImage}
        onHide={() => setShowImage(false)}
        centered
        className="d-flex justify-content-center post-modal"
      >
        <Modal.Body>
          <img
            src="https://lvlup.services:9001/public/post_media/9734_1709995832896.jpg"
            alt="post pic"
            style={{ width: "500px", height: "500px", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PostDetails;
