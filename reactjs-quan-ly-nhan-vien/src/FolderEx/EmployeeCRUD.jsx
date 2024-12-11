import axios from "axios";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const EmployeeCRUD = () => {
  const navigate = useNavigate();
  const match = useMatch(`/employee-management/employeeCRUD/:id`);
  // nếu match có data là edit, nếu null là add
  console.log("match: ", match);

  const isEdit = !!match;

  const getEmployeeByID = () => {
    axios({
      url: `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${match.params.id}`,
      method: "GET",
    })
      .then((response) => {
        console.log("response: ", response.data);
        frmEditProduct.setValues(response.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  useEffect(() => {
    if (isEdit) {
      getEmployeeByID();
    }
  }, [isEdit]);

  const frmEditProduct = useFormik({
    initialValues: {
      maNhanVien: "",
      tenNhanVien: "",
      chucVu: "Employee",
      heSoChucVu: "",
      luongCoBan: "",
      soGioLamTrongThang: "",
    },
    onSubmit: (values) => {
      console.log("values: ", values);
      let url =
        "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/ThemNhanVien";
      let method = "POST";

      if (isEdit) {
        url = `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${values.maNhanVien}`;
        method = "PUT";
      }

      axios({
        url: url,
        method: method,
        data: values,
      })
        .then((response) => {
          console.log("response: ", response);
          if (isEdit) {
            alert("bạn đã update thành công");
          } else {
            alert("bạn đã thêm thành công");
          }
          navigate("../");
        })
        .catch((err) => {
          console.log("err: ", err.response.data);
          alert(err.response.data);
        });
    },
  });

  return (
    <div className="container">
      <h1 className="title text-3xl">
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h1>
      <div className="py-10">
        <form
          className="flex max-w-md flex-col gap-4 mx-auto"
          onSubmit={frmEditProduct.handleSubmit}
        >
          {/* id */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="maNhanVien1" value="Employee ID" />
            </div>
            <TextInput
              id="maNhanVien1"
              type="number"
              name="maNhanVien"
              disabled={isEdit}
              value={frmEditProduct.values.maNhanVien}
              onChange={frmEditProduct.handleChange}
            />
          </div>
          {/* name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="tenNhanVien1" value="Employee Name" />
            </div>
            <TextInput
              id="tenNhanVien1"
              type="text"
              name="tenNhanVien"
              value={frmEditProduct.values.tenNhanVien}
              onChange={frmEditProduct.handleChange}
            />
          </div>
          {/* jobTitle */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="chucVu1" value="Job Title" />
            </div>
            <Select
              id="chucVu1"
              name="chucVu"
              onChange={frmEditProduct.handleChange}
              value={frmEditProduct.values.chucVu}
              required
            >
              <option value={"Employee"}>EMPLOYEE</option>
              <option value={"Manager"}>MANAGER</option>
              <option value={"CEO"}>CEO</option>
            </Select>
          </div>
          {/* basicSalary */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="luongCoBan1" value="Basic Salary" />
            </div>
            <TextInput
              id="luongCoBan1"
              type="number"
              name="luongCoBan"
              value={frmEditProduct.values.luongCoBan}
              onChange={frmEditProduct.handleChange}
            />
          </div>
          {/* workingHours */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="soGioLamTrongThang1" value="Working Hours" />
            </div>
            <TextInput
              id="soGioLamTrongThang1"
              type="number"
              name="soGioLamTrongThang"
              value={frmEditProduct.values.soGioLamTrongThang}
              onChange={frmEditProduct.handleChange}
            />
          </div>
          <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeCRUD;
