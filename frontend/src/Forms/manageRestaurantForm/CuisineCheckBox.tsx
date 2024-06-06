import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cuisine: string,
    field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckBox = ({ cuisine, field }: Props) => {
    return(
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox
                    className="bg-white"
                    //check field value
                    // field.value = ['pasta','pizza']
                    // cusine = "pizza" //condition true
                    checked={field.value.includes(cuisine)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            //if the value is checked, then it is added to the field values
                            field.onChange([...field.value, cuisine])
                        }
                        else {
                            //remving the current cuisine
                            field.onChange(field.value.filter((value:string)=> value!==cuisine))
                        }
                    }}
                />
            </FormControl>
            <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
        </FormItem>
  )
}

export default CuisineCheckBox;