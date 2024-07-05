import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export interface IResponse<T> {
    status: string
    message: string
    statusCode: number
    reasonStatusCode: number
    data: T
}

const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown> | FormData>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<IResponse<Response>>((resolve, reject) => {
            // return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<IResponse<Response>>) => {
                    resolve(response.data)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    },
}

export default ApiService
