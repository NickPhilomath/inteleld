import apiClient from "../services/api-client";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getHeaders } from "./useData";
import { AxiosError } from "axios";

interface Props {
    id: number | undefined
    keys: QueryKey;
    url: string;
    staleTime?: number | undefined;
}

const useEntity = <T>({id, keys, url, staleTime} : Props) => {
    const fetchEntity = () =>
        apiClient.get<T>(url + "/" + id, {headers: getHeaders()}).then((res) => { console.log("data**entity", res.data); return res.data});

    return useQuery<T, AxiosError>({
        // queryKey: [url, id],
        queryKey: keys,
        queryFn: fetchEntity,
        staleTime: staleTime,
    });
}

export default useEntity;