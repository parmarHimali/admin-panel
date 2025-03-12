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
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email_address: "",
      password: "",
      mobile_number: "",
      dob: "",
      interested: [],
      unique_name: "",
    },
    onSubmit: async (values) => {
      console.log({
        ...values,
        mobile_number: String(values.mobile_number),
        interested: JSON.stringify(values.interested),
        user_type: "user",
        device_token: "ijhugfcgiokjhwds",
        device_type: "android",
      });

      try {
        const { data } = await axios.post(`${BASE_URL}/user/sign_up`, {
          ...values,
          mobile_number: String(values.mobile_number),
          interested: JSON.stringify(values.interested),
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

          setShowAddUser(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    },
    validate: (values) => {
      const err = {};

      if (values.full_name.trim() == "") {
        err.full_name = "Please provide your full name";
      } else if (!/^[A-Za-z ]+$/.test(values.full_name)) {
        err.full_name = "Name can only contain alphabets";
      }

      if (values.email_address.trim() == "") {
        err.email_address = "Please provide email address";
      } else if (
        !/^[A-Za-z0-9_.]+@[A-Za-z0-9_.]+\.[A-Za-z]{2,4}$/.test(
          values.email_address
        )
      ) {
        err.email_address = "Provide valid email format";
      }

      if (values.password.trim() == "") {
        err.password = "Please provide password";
      } else if (values.password.length < 6) {
        err.password = "Password must contain atleast 6 characters";
      } else if (!/[^A-Za-z0-9 ]/.test(values.password)) {
        err.password = "Password must contain atleast 1 special character";
      }
      if (values.mobile_number == "") {
        err.mobile_number = "Please provide mobile number";
      } else if (!/\d{10}/.test(values.mobile_number)) {
        err.mobile_number = "Mobile number must contain 10 digits";
      }

      if (values.dob == "") {
        err.dob = "Please provide Date of Birth";
      } else if (new Date(values.dob) > new Date()) {
        err.dob = "Date of Birth cannot be in future";
      }
      if (values.unique_name.trim() == "") {
        err.unique_name = "Please provide unique name";
      }
      // if (values.interested.length == 0) {
      //   err.interested = "Select atleast one interest";
      // }
      return err;
    },
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
          onClick={() => {
            formik.resetForm();
            setShowAddUser(true);
          }}
        >
          <IoAddOutline />
          <span>Add User</span>
        </Button>
      </div>
      <div className="horizontal-line">
        <hr style={{ color: "white" }} />
        <span>Users</span>
      </div>
      <Modal
        show={showAddUser}
        centered
        onHide={() => {
          formik.resetForm();
          setShowAddUser(false);
        }}
      >
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
          <Form className="p-2" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Full Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter your full name"
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
              />
              {formik.errors.full_name && formik.touched.full_name && (
                <div className="text-danger">{formik.errors.full_name}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Email Address</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter your email address"
                name="email_address"
                value={formik.values.email_address}
                onChange={formik.handleChange}
              />
              {formik.errors.email_address && formik.touched.email_address && (
                <div className="text-danger">{formik.errors.email_address}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                placeholder="Enter password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Mobile Number</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                placeholder="Enter your mobile number"
                name="mobile_number"
                value={formik.values.mobile_number}
                onChange={formik.handleChange}
              />
              {formik.errors.mobile_number && formik.touched.mobile_number && (
                <div className="text-danger">{formik.errors.mobile_number}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Date of Birth</Form.Label>
              <Form.Control
                type="date"
                size="sm"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
              {formik.errors.dob && formik.touched.dob && (
                <div className="text-danger">{formik.errors.dob}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Unique Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter your unique name"
                name="unique_name"
                value={formik.values.unique_name}
                onChange={formik.handleChange}
              />
              {formik.errors.unique_name && formik.touched.unique_name && (
                <div className="text-danger">{formik.errors.unique_name}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-1">Your Interests</Form.Label>
              <Form.Select
                size="sm"
                name="interested"
                multiple
                onChange={() => {
                  const selectedOptions = Array.from(
                    event.target.selectedOptions,
                    (option) => option.value
                  );
                  formik.setFieldValue("interested", selectedOptions);
                }}
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
              {formik.errors.interested && formik.touched.interested && (
                <div className="text-danger">{formik.errors.interested}</div>
              )}
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
