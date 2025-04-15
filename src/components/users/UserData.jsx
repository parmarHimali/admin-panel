import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersList,
  handleBlockUser,
  handleDeleteUser,
} from "../../store/userSlice";
import { Button, Spinner } from "react-bootstrap";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdBlockFlipped, MdVerified } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
const customStyles = {
  table: {
    style: {
      backgroundColor: "#ccc",
    },
  },
  headRow: {
    style: {
      minHeight: "40px",
      backgroundColor: "#434343e1",
      color: "white",
      padding: "10px 0",
      fontSize: "14px",
      textAlign: "center",
    },
  },

  rows: {
    style: {
      textAlign: "center",
      fontSize: "14px",
      backgroundColor: "#282828",
      color: "white",
      padding: "10px 0",
      borderBottom: "1px solid #ccc",
    },
  },
  cells: {
    style: {
      textAlign: "center",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#212121",
      color: "white",
      marginBottom: "20px",
      borderTop: "1px solid black",
    },
    pageButtonsStyle: {
      color: "white",
      fill: "white",
      borderRadius: "5px",
      "&:disabled": {
        cursor: "not-allowed",
        fill: "#ffffff47",
      },
    },
  },
};
const UserData = ({ search }) => {
  const { pageId, rows } = useParams();
  const [page, setPage] = useState(pageId || 1);
  const [rowsPerPage, setRowsPerPage] = useState(rows || 10);
  const [order, setOrder] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { filteredUsersList, totalUsers, loadingUsers } = useSelector(
    (state) => state.users
  );
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (sortBy != "" && order != "") {
      dispatch(
        getUsersList({ page, rowsPerPage, search, sortOrder: order, sortBy })
      );
    } else {
      dispatch(getUsersList({ page, rowsPerPage, search }));
    }
  }, [page, rowsPerPage, search]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    navigateTo(`/users/${newPage}/${rowsPerPage}`);
  };
  const handlePerRowsChange = async (newPerPage, newPage) => {
    setRowsPerPage(newPerPage);
    setPage(newPage);
    navigateTo(`/users/${newPage}/${newPerPage}`);
  };
  const handleSort = (column, sortDirection) => {
    console.log(column, sortDirection);
    setOrder(sortDirection == "asc" ? "1" : "-1");
    setSortBy(column.name == "Name" ? "full_name" : "unique_name");
    if (column.name == "Name") {
      dispatch(
        getUsersList({
          page,
          rowsPerPage,
          sortOrder: sortDirection == "asc" ? "1" : "-1",
          sortBy: "full_name",
          search,
        })
      );
    }
    if (column.name == "Unique Name") {
      dispatch(
        getUsersList({
          page,
          rowsPerPage,
          sortOrder: sortDirection == "asc" ? "1" : "-1",
          sortBy: "unique_name",
          search,
        })
      );
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          className="d-flex gap-2 align-items-center position-relative"
          style={{ cursor: "pointer", width: "600px" }}
          onClick={() => navigateTo(`/user-detail/${row._id}`)}
        >
          <img
            src={row.profile_url || "/user.jpg"}
            alt="profile"
            height={"40px"}
            crossOrigin="anonymous"
            style={{ borderRadius: "50%" }}
          />{" "}
          <span>{row.full_name}</span>
          {row.is_verified && (
            <MdVerified
              style={{
                fontSize: "17px",
                color: "green",
                bottom: "-2px",
                left: "28px",
              }}
              className="position-absolute"
            />
          )}
        </div>
      ),
      width: "270px",
      sortable: true,
    },
    {
      name: "Unique Name",
      selector: (row) => row.unique_name,
      sortable: true,
      width: "170px",
    },
    {
      name: "E-mail",
      selector: (row) => row.email_address,
      width: "270px",
    },
    {
      name: "Birth Date",
      selector: (row) => row.dob,
      cell: (row) => (row.dob ? row.dob.split("T")[0] : "N/A"),
      width: "170px",
    },
    {
      name: "Mobile No.",
      selector: (row) => row.mobile_number || "-",
      width: "170px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <Button
            variant={row.is_block ? "outline-success" : "outline-warning"}
            size="sm"
            className="d-flex justify-content-center align-items-center py-2"
            onClick={() => {
              const isBlock = confirm(
                `Are you sure to ${
                  row.is_block ? "unblock" : "block"
                } the account?`
              );
              if (isBlock) {
                dispatch(handleBlockUser({ userId: row._id }));
              }
            }}
          >
            <MdBlockFlipped />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="d-flex justify-content-center align-items-center py-2"
            onClick={() => {
              const isDelete = confirm("Are you sure to delete the account?");
              if (isDelete) {
                dispatch(handleDeleteUser(row._id));
                // dispatch(getUsersList(page, rowsPerPage));
              }
            }}
          >
            <RiDeleteBin7Line />
          </Button>
        </div>
      ),
      width: "110px",
    },
  ];

  return (
    <>
      {/* {loadingUsers ? (
        <div className="d-flex w-100 justify-content-center pt-3">
          <Spinner variant="light" animation="grow" />
        </div>
      ) : ( */}
      <DataTable
        data={filteredUsersList || []}
        columns={columns}
        pagination
        customStyles={customStyles}
        noDataComponent={
          <h5 className="text-light bg-dark fw-bold w-100 text-center p-2 m-0">
            User not found!
          </h5>
        }
        paginationServer
        paginationTotalRows={totalUsers}
        paginationPerPage={rowsPerPage}
        paginationDefaultPage={page}
        paginationRowsPerPageOptions={[10, 20, 30]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        sortServer
        onSort={handleSort}
      />
      {/* )} */}
    </>
  );
};

export default UserData;
