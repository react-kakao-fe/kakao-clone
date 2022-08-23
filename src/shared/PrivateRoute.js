import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ access, refresh, component: Component }) {
  return access && refresh ? (
    Component
  ) : (
    <Navigate to="/login" {...alert("접근할 수 없는 페이지입니다.")} />
  );
}

export default PrivateRoute;
