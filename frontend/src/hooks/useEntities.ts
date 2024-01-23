import apiClient from "../services/api-client";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getHeaders } from "./useData";
import { AxiosError } from "axios";

interface FetchResponse<T> {
    data: T[];
}

interface Props {
    keys: QueryKey;
    url: string;
    staleTime?: number | undefined;
}

const useEntities = <T>({keys, url, staleTime} : Props) => {
    const fetchEntities = () =>
        apiClient.get<FetchResponse<T>>(url, {headers: getHeaders()}).then((res) => { console.log("data**", res.data.data); return res.data.data});

    return useQuery<T[], AxiosError>({
        // queryKey: ["drivers"],
        queryKey: keys,
        queryFn: fetchEntities,
        staleTime: staleTime,
    });
}

export default useEntities;