import { useQuery } from "@tanstack/react-query";
import { Driver } from "..";
import apiClient from "../services/api-client";
import { getHeaders } from "./useData";
import { AxiosError } from "axios";

interface FetchResponse<T> {
    data: T[];
}

const useDrivers = () => {
    const fetchDrivers = () =>
        apiClient.get<FetchResponse<Driver>>("/drivers", {headers: getHeaders()}).then((res) => { console.log("data**", res.data.data); return res.data.data});

    return useQuery<Driver[], AxiosError>({
        queryKey: ["drivers"],
        queryFn: fetchDrivers,
        staleTime: 3 * 60 * 1000, //3m
    });
}

export default useDrivers;