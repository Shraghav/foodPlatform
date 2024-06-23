import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "./CuisineSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/loadingButton";
import { Button } from "@/components/ui/button";

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
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.string({
        required_error: "estimated delivery time is required",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select atleast one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required")
    })),
    imageFile: z.instanceof(File, { message: "message is required" })
})

type RestaurantFormData = z.infer<typeof formSchema> //creating a type based on the property we specified

type Props = {
    //at page level we will pass in function that calls createmy restauran 
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

//managing by react hook form and validated by zod
const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    })
    //submit validated form data
    const onSub = (formDataJson: RestaurantFormData) => {
        // todo -> form data json to form data object
        const formData = new FormData(); //builtin
        //http request only deal with strings
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        //easier to send values to stripe
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            //lowest denomination
            formData.append(
                `menuItems[${index}][price]`,
                (menuItem.price * 100).toString())
        })
        if (formDataJson.imageFile) {
            formData.append('imageFile', formDataJson.imageFile);
        }

        onSave(formData); //check props as when it is being on save it should also contain restauramt form data
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSub)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
                <Separator />
                <CuisineSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}


export default ManageRestaurantForm;