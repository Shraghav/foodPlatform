//contains hooks that interact with my api endpoint

import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //syntax to get environment variables using vite

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest = async ():Promise<User> => { //returning type
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user")
        }
        return response.json();
    }

    const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest);

    if (error) {
        toast.error(error.toString())
    }
    return {currentUser,isLoading}
}
//describe the properties that are needed
type CreateUserRequest = {
    auth0Id: string,
    email: string
};

//using hooks to call endpoints
export const useCreateMyUser = () => {
    //fetches token from auth-0 server
    const { getAccessTokenSilently } = useAuth0();
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            //set of options to fetch request
            method: "Post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
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

//keeping type separate as certain times we don't want to send all data
type UpdateMyUserRequest = {
    name: string;
    address: string;
    city: string;
    country: string
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    //creating fetch request function
    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) {
            throw new Error("Failed to update user")
        }
        return response.json();
    }

    //passing to useMutation (react quesry can handle the request for us)
    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User profile updated")
    }
    if (error) {
        toast.error(error.toString());
        reset()//don't want the error display this whenever the component re render
    }

    return {updateUser,isLoading}
}