import { useGetMyUser, useUpdateMyUser } from "@/API/MyUserAPI";
import UserProfileForm from "@/Forms/user-profile/UserProfileForm";

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
    if (isGetLoading) {
        return <span>Loading....</span>
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>
    }
    //from my user api where we fetched request and returned things
   
    return (
        <UserProfileForm currentUser = {currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
    )
}

export default UserProfilePage;