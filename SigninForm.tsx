import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/use-toast";


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
import { Button} from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import Loader3 from "@/components/ui/shared/Loader3";
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations";
// import { Description } from "@radix-ui/react-toast";
import { useUserContext } from "@/context/AuthContext";
// import { Loader } from "lucide-react";
 

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } =
  useSignInAccount();


   // 1. Define your form.
   const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
   
     const session = await signInAccount({
      email: values.email,
      password: values.password,
     })

   if(!session){
    return toast({ title: 'Please Try Again!', description: 'SignIn Failed! '})
   }

   const isLoggedIn = await checkAuthUser();

   if(isLoggedIn ){
    form.reset();
      navigate('/')
   } else {
    return toast( { title: 'Sign up failed. Please try again! '})
   }

  }
 



  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src ="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-center">Resume Your Journey with PAREA !</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2"> Welcome Back !! </p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5 w-full mt-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
{/* 
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className="shad-button_primary" type="submit">
        {isUserLoading ? (
          <div className="flex-center gap-2">
            <Loader3 /> Loading...
          </div>
        ): (
          "SignIn"
        )
        }
        </Button>
        <p className="text-small-regular text-light-2 text-center">Do not exist here ? 
        <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1" >Get Existence</Link>
        </p>
      </form>
      </div>
    </Form>
  )
}

export default SigninForm