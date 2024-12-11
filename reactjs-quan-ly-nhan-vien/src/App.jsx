import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayoutComponent from "./FolderEx/AdminLayoutComponent";
import EmployeeList from "./FolderEx/EmployeeList";
import EmployeeCRUD from "./FolderEx/EmployeeCRUD";
import Page404 from "./FolderEx/Page404";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<AdminLayoutComponent />} />
          <Route path="/employee-management" element={<AdminLayoutComponent />}>
            <Route index element={<EmployeeList />} />
            <Route path="employeeCRUD" element={<EmployeeCRUD />} />
            <Route path="employeeCRUD/:ID" element={<EmployeeCRUD />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
