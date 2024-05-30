import { useCreateMyUser } from "@/API/MyUserAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//has access to useAuth0 hook   
const AuthCallBack = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    const hasCreatedUser = useRef(false); //we don't want component to re render whenevr we update teh variable
    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            //user.sub is the id
            createUser({ auth0Id: user.sub, email: user.email })
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [createUser,navigate,user])
    return <>Loading.....</>
  
}

export default AuthCallBack;