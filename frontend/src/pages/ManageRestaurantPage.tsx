import { useCreateMyRestaurant } from "@/API/MyRestauranAPI";
import ManageRestaurantForm from "@/Forms/manageRestaurantForm/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
    return (
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  )
}

export default ManageRestaurantPage;