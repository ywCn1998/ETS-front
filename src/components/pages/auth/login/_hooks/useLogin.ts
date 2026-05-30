import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

// ------------------ models
// import { useMutation } from "@tanstack/react-query";
// import profileApi from "@src/services/profile.api";
import { IUserLogin } from "@src/models/user";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { loginUser } from "@src/ifc/services/auth.api";





const useLoginform = () => {
    const navigate = useNavigate();
    const validationSchema = yup.object({
        username: yup.string().required('Username is required!'),
        password: yup.string().required('Password is required!')
    })



    const methods = useForm<IUserLogin>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const {
        handleSubmit,
        formState: { errors },
    } = methods;


    // -------------------- form and submit to api
    const { isPending, mutate: loginMutate } =
        useMutation({
            mutationFn: loginUser,
            onSuccess: (response) => {
                localStorage.setItem('token', response.data?.data?.token)
                // localStorage.setItem('refreshToken', response.data.data.refreshToken)
                // localStorage.setItem('fullName', response.data.data.fullName)
                // localStorage.setItem('expiration', response.data.data.expiration)
                navigate('/dashboard')
            },
            onError: (error: AxiosError) => {
                console.log('error', error)
            },
        });

    const OnSubmit = handleSubmit((data) => {
        loginMutate({
            username: data.username,
            password: data.password
        })
    });



    return {
        handleSubmit,
        errors,
        methods,
        isPending,
        OnSubmit
    }
}

export default useLoginform;