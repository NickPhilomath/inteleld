import { useQuery } from "@tanstack/react-query";
import { Driver } from "..";
import apiClient from "../services/api-client";
import { getHeaders } from "./useData";
import { AxiosError } from "axios";


const useDrivers = (id: number | undefined) => {
    const fetchDrivers = () =>
        apiClient.get<Driver>("/drivers/" + id, {headers: getHeaders()}).then((res) => { console.log("data**driver", res.data); return res.data});

    return useQuery<Driver, AxiosError>({
        queryKey: ["drivers", id],
        queryFn: fetchDrivers,
        staleTime: 3 * 60 * 1000, //3m
    });
}

export default useDrivers;