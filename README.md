# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setFilteredUsers } from "../../store/userSlice";
import { IoAddOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../../App";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const UserHeader = ({ setSearch, search }) => {
  const [userData, setUserData] = useState({
    full_name: "",
    email_address: "",
    password: "",
    mobile_number: "",
    dob: "",
    interested: [],
    unique_name: "",
  });
  const [showAddUser, setShowAddUser] = useState(false);
  const { usersList } = useSelector((state) => state.users);
  const { subInterests } = useSelector((state) => state.interests);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    const filtered = usersList.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(query.toLowerCase()) ||
        user.unique_name.toLowerCase().includes(query.toLowerCase())
      );
    });
    dispatch(setFilteredUsers(filtered));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log(userData);
    console.log({
      ...userData,
      user_type: "user",
      device_token: "ijhugfcgiokjhwds",
      device_type: "android",
    });

    try {
      const { data } = await axios.post(`${BASE_URL}/user/sign_up`, {
        ...userData,
        interested: JSON.stringify(userData.interested),
        user_type: "user",
        device_token: "ijhugfcgiokjhwds",
        device_type: "android",
      });
      console.log(data);
      if (data.success) {
        dispatch(
          addUser({
            country_code: data.data.country_code,
            createdAt: data.data.createdAt,
            dob: data.data.dob,
            email_address: data.data.email_address,
            full_name: data.data.full_name,
            is_deleted: data.data.is_deleted,
            mobile_number: data.data.mobile_number,
            profile_picture: data.data.profile_picture,
            profile_url: data.data.profile_url,
            unique_name: data.data.unique_name,
            user_type: data.data.user_type,
            _id: data.data._id,
          })
        );
        toast.success("User account created successfully!");
        setUserData({
          full_name: "",
          email_address: "",
          password: "",
          mobile_number: "",
          dob: "",
          interested: [],
          unique_name: "",
        });
        setShowAddUser(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  const handleSelect = (e) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setUserData({ ...userData, interested: selectedOptions });
  };

  return (
    <>
      <div className="mt-3">Users</div>
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
          onClick={() => setShowAddUser(true)}
        >
          <IoAddOutline />
          <span>Add User</span>
        </Button>
      </div>
      <div className="horizontal-line">
        <hr style={{ color: "white" }} />
        <span>Users</span>
      </div>
      <Modal show={showAddUser} centered>
        <div className="d-flex justify-content-between px-3 pt-3">
          <h6>Add User</h6>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShowAddUser(false)}
          ></button>
        </div>
        <datalist id="interests">
          <option value="Edge"></option>
        </datalist>

        <Modal.Body>
          <Form className="p-2" onSubmit={handleAddUser}>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Full Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter your full name"
                name="full_name"
                value={userData.full_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Email Address</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter your email address"
                name="email_address"
                value={userData.email_address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                placeholder="Enter password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Mobile Number</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Enter your mobile number"
                name="mobile_number"
                value={userData.mobile_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Date of Birth</Form.Label>
              <Form.Control
                type="date"
                size="sm"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Unique Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter your unique name"
                name="unique_name"
                value={userData.unique_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Your Interests</Form.Label>
              <Form.Select
                size="sm"
                name="interested"
                multiple
                onChange={handleSelect}
              >
                {subInterests?.map((subInt) => {
                  return subInt.sub_interest_data?.map((sub) => {
                    return (
                      <option value={sub._id} key={sub._id}>
                        {sub.sub_interest}
                      </option>
                    );
                  });
                })}
              </Form.Select>
            </Form.Group>
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

export default UserHeader;

```
