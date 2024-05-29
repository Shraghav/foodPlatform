//contains hooks that interact with my api endpoint

import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //syntax to get environment variables using vite
//describe the properties that are needed
type CreateUserRequest = {
    auth0Id: string,
    email: string
};

//using hooks to call endpoints
export const useCreateMyUser = () =>{
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            //set of options to fetch request
            method: "Post",
            headers: {
                "Content-Type": "application/json" //type of request that is being expected in body
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to create user")
        }
    };
    //the below hook will manage the loading, createuser from the api 
    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);
    return {
        createUser, isLoading, isError, isSuccess
    }
    //can call anywhere just by importing
}