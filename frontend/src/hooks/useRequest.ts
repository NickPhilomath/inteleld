import { AxiosError, AxiosRequestConfig, CanceledError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

const useRequest = <T>(endpoint: string, redirectOn401: boolean = false, requestConfig?: AxiosRequestConfig) => {
  const [resData, setResData] = useState<T>();
  const [errorMsg, setErrorMsg] = useState("");
  const [resErros, setResErrors] = useState<any>({})
  const [isLoading, setLoading] = useState(false);
  //
  const navigate = useNavigate();

  const post = (data: any, callback: Function = ()=>{}) => {
    // clean before fetching
    setLoading(true);
    setErrorMsg("");
    setResErrors({});
    apiClient
      .post<T>(endpoint, data, { ...requestConfig })
      .then((res) => {
        setResData(res.data);
        setLoading(false);
        callback(res.data);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setErrorMsg(err.message);
        setLoading(false);

        if(err.response?.data)
        setResErrors(err.response?.data)

        if (redirectOn401 && err.response?.status === 401) navigate('/login')
        if (err.response?.status === 400 && err.response.data) {
          setResErrors(err.response.data);
          console.log('reserr', err.response.data)
        }
      });
  }

  const put = (data: any, callback: Function = ()=>{}) => {
    // clean before fetching
    setLoading(true);
    setErrorMsg("");
    setResErrors({});
    apiClient
      .put<T>(endpoint, data, { ...requestConfig })
      .then((res) => {
        setResData(res.data);
        setLoading(false);
        callback(res.data);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setErrorMsg(err.message);
        setLoading(false);

        if(err.response?.data)
        setResErrors(err.response?.data)

        if (redirectOn401 && err.response?.status === 401) navigate('/login')
        if (err.response?.status === 400 && err.response.data) {
          setResErrors(err.response.data);
          console.log('reserr', err.response.data)
        }
      });
  }

  return { post, put, resData, errorMsg, resErros, isLoading };
};

export default useRequest;