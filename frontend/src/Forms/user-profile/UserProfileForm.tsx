//might have different components
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from '../../components/loadingButton';
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";
//properties that our form has
const formSchema = z.object({
    email: z.string().optional(), //read only (not for validation)
    name: z.string().min(1, "name is required"), //atleast 1 character in input
    address: z.string().min(1, "address is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "countrty is required")
})
//determining the types based on the form
type UserFormData = z.infer<typeof formSchema>

type Props = {
    //can do API stuffs in the page level
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    currentUser : User
}

const UserProfileForm = ({ isLoading, onSave, currentUser }: Props) => {
    //creating forms using react hooks
    //telling type as userform data
    const form = useForm<UserFormData>({
        //to handle validation and stuffs
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    })

    useEffect(() => {
        form.reset(currentUser);
    },[currentUser,form])

    return (
        //shadcn form
        <Form {...form}>
            {/* like a container */}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">User Profile</h2>
                    <FormDescription>
                        View and Change your profile information here
                    </FormDescription>
                </div>
                {/* Created a type based on ZOD schema */}
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            {/* Input have access to field */}
                            <Input {...field} disabled className="bg-white" />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            {/* Input have access to field */}
                            <Input {...field}  className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                {/* Input have access to field */}
                                <Input {...field}  className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                {/* Input have access to field */}
                                <Input {...field}  className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                {/* Input have access to field */}
                                <Input {...field}  className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-orange-500">Submit</Button>}
            </form>
        </Form>
    )
}

export default UserProfileForm;