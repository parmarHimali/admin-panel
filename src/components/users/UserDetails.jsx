import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { MdBlockFlipped } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import {
  getUserDetail,
  handleBlockUser,
  handleDeleteUser,
  removeSelectedUser,
} from "../../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookieValue, rgbaWithOpacity } from "../../App";
import UserDetailProfile from "./UserDetailProfile";
import UserDetailInterest from "./UserDetailInterest";
import UserDetailBlockReport from "./UserDetailBlockReport";
import UserDetailPosts from "./UserDetailPosts";
const UserDetails = () => {
  const { userDetails, loadingUserDetails } = useSelector(
    (state) => state.users
  );
  const { uid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const admin_token = getCookieValue("admin_token");
    if (!admin_token) {
      navigateTo("/signin");
    }
  }, []);
  useEffect(() => {
    dispatch(getUserDetail(uid));
  }, [uid]);
  const navigateTo = useNavigate();
  console.log(userDetails);

  return (
    <Container style={{ width: "96%" }}>
      {loadingUserDetails ? (
        <div className="w-100 mt-3 text-center">
          <Spinner animation="grow" variant="secondary" />
        </div>
      ) : (
        <>
          {userDetails ? (
            <Container className="user-details mb-3">
              {/* profile and follower */}
              <UserDetailProfile userDetails={userDetails} />
              {/* verification and interest  */}
              <UserDetailInterest userDetails={userDetails} />
              {/* block and report */}
              <UserDetailBlockReport userDetails={userDetails} />
              {/* post saved opportunities */}

              <UserDetailPosts userDetails={userDetails} />
            </Container>
          ) : (
            <h5 className="d-flex flex-column text-secondary py-3 align-items-center gap-2 mt-5">
              <span>User not found!</span>
              <Button
                className="outline-pink"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
            </h5>
          )}
        </>
      )}
    </Container>
  );
};

export default UserDetails;
