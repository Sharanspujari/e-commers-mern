// import React from 'react'
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom"

const CheckAuth = ({isAuthenticated,userInfo,children}) => {
   
    const location = useLocation();
    console.log('location: ', location.pathname);
    console.log("checkISAUTH",isAuthenticated);
if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("register"))){
    return <Navigate to={"/auth/login"}/>
}

if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
    if(userInfo?.role==="admin"){
        return <Navigate to={"/admin/dashboard"}/>
    }else{
        return <Navigate to={"/shop/home"}/>
    }
    
}
if(isAuthenticated && userInfo?.role !== "admin" && location.pathname.includes("admin")){
    return <Navigate to={"unauth-page"}/>
}
 
if(isAuthenticated && userInfo?.role === "admin" && location.pathname.includes("shop") ){
    return <Navigate to={"/admin/dashboard"}/>
}
return <>{children}</>

}
CheckAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired, // Must be a boolean
    userInfo: PropTypes.shape({               // Must be an object with specific properties
      role: PropTypes.string,
    }),
    children: PropTypes.node,                // Must be a React node
  };
  
  // Adding defaultProps (optional)
  CheckAuth.defaultProps = {
    userInfo: null, // Defaults to null if userInfo is not provided
  };
  
export default CheckAuth