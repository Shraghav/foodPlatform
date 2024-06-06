import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";

const formSchema = z.object({
    //form properties and types
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    city: z.string({
        required_error: "city is required",
    }),
    country: z.string({
        required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price name is required",
        invalid_type_error : "must be a valid number",
    }),
    estimatedDeliveryTime: z.string({
        required_error: "estimated delivery time is required",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select atleast one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1,"price is required")
    })),
    imageFile : z.instanceof(File, {message: "message is required"})
})

type restaurantFormData = z.infer<typeof formSchema> //creating a type based on the property we specified

type Props = {
    //at page level we will pass in function that calls createmy restauran 
    onSave: (restaurantFormData: FormData) => void; 
    isLoading: boolean;
}

//managing by react hook form and validated by zod
const ManageRestaurantForm = ({onSave, isLoading}: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems :[{name: "", price: 0}]
        }
    })
    //submit validated form data
    const onSubmit = (formDataJson: restaurantFormData) => {
        // todo -> form data json to form data object
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CuisineSection />
            </form>
        </Form>
    )
}


export default ManageRestaurantForm;