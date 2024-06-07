import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Add an image that will be displayed on search results. Adding an image will over write the existing one
                </FormDescription>
            </div>

            <div className="flex flex-col gap-8 w-[50%]">
                <FormField
                    control={control}
                    name="imagefile"
                    render={({ field }) =>
                    <FormItem>
                        <FormControl>
                                <Input
                                    className="bg-white"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    //takes only 1 file
                                    onChange={(e)=> field.onChange(e.target.files? e.target.files[0]: null)}
                                />     
                            </FormControl>
                            <FormMessage />
                    </FormItem>}
                />
            </div>
        </div>
    )
}

export default ImageSection;