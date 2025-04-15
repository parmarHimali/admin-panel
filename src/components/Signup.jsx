import { Form, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email_address: "",
      password: "",
    },
    validate: (values) => {
      const err = {};
      if (values.email_address.trim() === "") {
        err.email_address = "provide an email address";
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          values.email_address
        )
      ) {
        err.email_address = "please provide valid email format";
      }

      if (values.password.trim() == "") {
        err.password = "Password is required";
      } else if (values.password.length < 6) {
        err.password = "Password must contain atleast 6 characters";
      }

      return err;
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const { data } = await axios.post(`${BASE_URL}/admin/admin_signUp`, {
          user_type: "admin",
          email_address: values.email_address,
          password: values.password,
          device_type: "web",
          device_token: "hfghjaksfbkdlspdoslkdmncv",
        });
        if (data.success) {
          const d = new Date();
          d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);
          document.cookie = `admin_token=${
            data.data?.token
          }; expires=${d.toUTCString()}; path=/`;
          toast.success(data.message);
          resetForm();
          navigateTo("/");
        } else {
          toast.error(data.message);
          resetForm();
        }
      } catch (error) {
        console.log(error);
        resetForm();
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-100 vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div>
        <div className="form-container p-4 rounded">
          <h3 className="text-light text-center">Sign Up</h3>
          <Form onSubmit={formik.handleSubmit} noValidate={true}>
            <Form.Group className="mb-2">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={formik.values.email_address}
                onChange={(e) =>
                  formik.setFieldValue(
                    "email_address",
                    e.target.value.trimStart()
                  )
                }
                name="email_address"
                onBlur={formik.handleBlur}
              />
              {formik.errors.email_address && formik.touched.email_address && (
                <Form.Text className="text-danger">
                  {formik.errors.email_address}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                value={formik.values.password}
                name="password"
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value.trimStart())
                }
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <Form.Text className="text-danger">
                  {formik.errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <div className="mt-1">
              Already have an account?
              <Link className="ms-2 text-pink" to="/signin">
                Sign In
              </Link>
            </div>
            <Button type="submit" className="mt-3 btn-pink">
              {loading ? (
                <div className="d-flex gap-1 align-items-center">
                  <Spinner animation="grow" variant="light" size="sm" />
                  <span>Signing Up</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
