import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { BASE_URL, getCookieValue } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DashboardCards = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(`${BASE_URL}/admin/dashboard`);
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Container style={{ width: "95%" }}>
      <h6 className="my-4">Dashboard</h6>
      {loading ? (
        <div className="w-100 mt-3 text-center">
          <Spinner animation="grow" variant="secondary" />
        </div>
      ) : (
        <Row lg={4} md={3} sm={2} className="g-3">
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.users}</h2>
              <h5 style={{ color: "#ccc" }}>Total Users</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.pendingVerificationList}</h2>
              <h5 style={{ color: "#ccc" }}>Total Requests For Verification</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.postList}</h2>
              <h5 style={{ color: "#ccc" }}>Total Posts</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.repostList}</h2>
              <h5 style={{ color: "#ccc" }}>Total Re-posts</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.supportList}</h2>
              <h5 style={{ color: "#ccc" }}>Total Supports</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.opportunties_post}</h2>
              <h5 style={{ color: "#ccc" }}>Total Opportunities Post</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.verifiedUserList}</h2>
              <h5 style={{ color: "#ccc" }}>Total Verified User</h5>
            </div>
          </Col>
          <Col>
            <div className="p-4 bg-dark rounded">
              <h2>{data.interestList}</h2>
              <h5 style={{ color: "#ccc" }}>Total Interests</h5>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DashboardCards;
