import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../ui/shared/FileUploader"
import { Models } from "appwrite"
import { PostValidation } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";

type PostFormProps = {
    post?: Models.Document;
}

const PostForm = ({ post }: PostFormProps ) => {

    const { mutateAsync : createPost } = 
    useCreatePost();

    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();



    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post? post?.location : "",
            tags: post ? post?.tags : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        const newPost = await createPost({
            ...values,
            userId: user.id ,
        })

        if(!newPost) {
            toast({
                title: "Consider Spicing Up this Universe a LITTLE !",
                description: "No New Posts Available. Create a post or Try Again Later.",
            })
        }
        navigate('/');
        
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5x1">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label text-2xl">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label text-2xl">Upload Image</FormLabel>
                            <FormControl>
                                <FileUploader 
                                fieldChange={field.onChange}
                                mediaUrl={ post?.imageUrl }
                                />
                            </FormControl>
                            <FormMessage className="shda-form_message" />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label text-2xl">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input"  {...field} />
                            </FormControl>
                            <FormMessage className="shda-form_message" />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label text-2xl">Add_Tags</FormLabel>
                            <FormControl>
                                <Input 
                                type="text"
                                className="shad-input text-lg"
                                placeholder="Discrete Mathematics, COA, Maths 4"   {...field} />
                            </FormControl>
                            <FormMessage className="shda-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-9 items-center justify-end ">
                <Button type="button" className="shad-button_dark_4 flex ml-4 mb-2 mt-2  rounded-tl-[20px] rounded-tr-[180px] rounded-br-[30px] rounded-bl-[120px] h-24 w-56 text-2xl">Cancel</Button>
                <Button type="submit" className="shad-button_primary whitespace-nowrap flex ml-4 mb-2 mt-2  rounded-tl-[20px] rounded-tr-[180px] rounded-br-[30px] rounded-bl-[120px] h-24 w-56 text-3xl">Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default PostForm

