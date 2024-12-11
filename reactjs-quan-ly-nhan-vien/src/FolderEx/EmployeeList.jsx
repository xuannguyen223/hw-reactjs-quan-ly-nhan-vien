import { Button, Checkbox, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [arrEmployee, setArrEmployee] = useState([]);
  console.log("arrEmployee: ", arrEmployee);

  const getAllEmployees = () => {
    axios({
      url: `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien`,
      method: "GET",
    })
      .then((response) => {
        console.log("response: ", response);
        setArrEmployee(response.data);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const renderDataAPI = () => {
    return arrEmployee?.map((item) => {
      return (
        <Table.Row
          key={item.maNhanVien}
          className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {item.maNhanVien}
          </Table.Cell>
          <Table.Cell>{item.tenNhanVien}</Table.Cell>
          <Table.Cell>{item.chucVu}</Table.Cell>
          <Table.Cell>
            {item.chucVu === "CEO"
              ? 3
              : item.chucVu === "Manager"
              ? 2
              : item.chucVu === "Employee"
              ? 1
              : item.heSoChucVu}
          </Table.Cell>
          <Table.Cell>{item.luongCoBan?.toLocaleString()}</Table.Cell>
          <Table.Cell>{item.soGioLamTrongThang}</Table.Cell>

          <Table.Cell>
            <NavLink
              to={`/employee-management/employeeCRUD/${item.maNhanVien}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </NavLink>
            <NavLink
              className="font-medium text-red-500 dark:text-blue-500 hover:underline ml-2"
              onClick={() => {
                handleDeleteEmployee(item.maNhanVien);
              }}
            >
              | Delete
            </NavLink>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  const handleDeleteEmployee = (id) => {
    axios({
      url: `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
      method: "DELETE",
    })
      .then((response) => {
        console.log("response: ", response.data);
        getAllEmployees();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <>
      {/* BTN ADD EMPLOYEE */}
      <NavLink
        to={"/employee-management/employeeCRUD"}
        className="m-3 bg-orange-500 rounded-md p-3 text-white inline-block"
      >
        Add New Employee
      </NavLink>
      {/* BLOCK TABLE */}
      <div className="overflow-x-auto my-5">
        <Table hoverable>
          <Table.Head className="text-center">
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Employee name</Table.HeadCell>
            <Table.HeadCell>job Title</Table.HeadCell>
            <Table.HeadCell>pay grade</Table.HeadCell>
            <Table.HeadCell>basic Salary</Table.HeadCell>
            <Table.HeadCell>working Hours</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">{renderDataAPI()}</Table.Body>
        </Table>
      </div>
    </>
  );
};

export default EmployeeList;
