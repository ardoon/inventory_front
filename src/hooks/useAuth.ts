import callApi from "@/helpers/callApi";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateUser } from "@/store/slices/authSlice";
import { useAppDispatch } from ".";

const useAuth = () => {
    const dispatch = useAppDispatch();
    
    const { data, error } = useSWR('user_me', async() => {
        return await callApi().get('/auth/check')
    })

    dispatch(updateUser(data?.data))

    return { user: data?.data, error, loading: !data && !error }
}

export default useAuth;