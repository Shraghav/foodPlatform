import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { cuisineList } from "@/config/restaurant-options-config" 
import CuisineCheckBox from "./CuisineCheckBox";

const CuisineSection = () => {
    //link our form fields here
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant offers
                </FormDescription>
            </div>
            <FormField control={control} name="cuisines" render={({ field }) => (
                <FormItem>
                    {/* control entire section */}
                    <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisineItem) => (
                            //field -> regsiter cusines inside checkbox
                            <CuisineCheckBox cuisine={cuisineItem} field={field} />
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    )
};

export default CuisineSection;