import callApi from "@/helpers/callApi";
import useSWR from "swr";

const useAuth = async () => {
    const { data, error } = useSWR('user_me', async() => {
        return  await callApi().get('/auth/check')
    })

    return { user: data?.data, error, loading: !data && !error }
}

export default useAuth;