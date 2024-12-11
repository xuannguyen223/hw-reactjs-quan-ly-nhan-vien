import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayoutComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Chuyển hướng tự động sang trang /employee-management khi user vào trang này
    navigate("/employee-management");
  }, []);

  return (
    <div className="flex ">
      <div className="dashboard p-3 w-1/5">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <NavLink
          to={"/employee-management"}
          className={
            "block my-5 bg-orange-300 p-2 rounded-md text-white text-xl"
          }
        >
          Employee Management
        </NavLink>
      </div>
      <div className="outlet bg-black/5 w-4/5 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayoutComponent;
