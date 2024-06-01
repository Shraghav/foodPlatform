import { useUpdateMyUser } from "@/API/MyUserAPI";
import UserProfileForm from "@/Forms/user-profile/UserProfileForm";

const UserProfilePage = () => {
    //from my user api where we fetched request and returned things
    const { updateUser, isLoading } = useUpdateMyUser();
    return (
        <UserProfileForm onSave={updateUser} isLoading={isLoading} />
    )
}

export default UserProfilePage;