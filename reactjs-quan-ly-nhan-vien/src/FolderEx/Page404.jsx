import { Button } from "flowbite-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center gap-4 my-5 justify-center h-screen">
      <h1 className="text-red-500 text-4xl text-center font-bold my-4">
        Opps, you are in Page 404!
      </h1>
      {/* Nếu dùng to={"/"} thì sẽ ra thẳng trang home, còn ../ như bên dưới 
      thì sẽ dc đẩy ra thư mục cha của trang đang đứng*/}
      <NavLink to={"/"}>
        <Button color="warning">GO BACK !!!</Button>
      </NavLink>
    </div>
  );
};

export default Page404;
