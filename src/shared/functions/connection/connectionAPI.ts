import axios from "axios";
import { ERROR_ACCES_DANIED, ERROR_CONNECTION } from "../../constants/errorsStatus";
import { MethodsEnum } from "../../enums/methods.enum";

export default class ConnectionAPI {
    static async call<T>(url: string, method: string, body?: unknown) {
        switch(method) {
            case MethodsEnum.GET:
                return (await axios.get<T>(url)).data ;
            case MethodsEnum.POST:
                return (await axios.post<T>(url, body)).data ;
            case MethodsEnum.DELETE:
                return (await axios.delete<T>(url)).data ;
            case MethodsEnum.PATCH:
                return (await axios.patch<T>(url, body)).data ;
            case MethodsEnum.PUT:
                return (await axios.put<T>(url, body)).data ;
        }
    }

    static async connect(url: string, method: string, body?: unknown) {
    return ConnectionAPI.call(url, method, body).catch((error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                case 403:
                    throw new Error(ERROR_ACCES_DANIED);
                default:
                    throw new Error(ERROR_CONNECTION);
            }
        }
    });
   }
}

export const ConnectionAPIGet = async (url: string) => {
    return ConnectionAPI.connect(url, MethodsEnum.GET);
};

export const ConnectionAPIPost = async (url: string , body: unknown) => {
    return ConnectionAPI.connect(url, MethodsEnum.POST, body);
};

export const ConnectionAPIDelete = async (url: string) => {
    return ConnectionAPI.connect(url, MethodsEnum.DELETE);
};

export const ConnectionAPIPatch = async (url: string, body: unknown) => {
    return ConnectionAPI.connect(url, MethodsEnum.PATCH,  body);
};

export const ConnectionAPIPut = async (url: string, body: unknown) => {
    return ConnectionAPI.connect(url, MethodsEnum.PUT,  body);
};