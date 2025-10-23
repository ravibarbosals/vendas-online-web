import { useState } from "react";
import { AuthType } from "../../modules/login/types/AuthType";
import { ERROR_INVALID_PASSWORD } from "../constants/errorsStatus";
import { URL_AUTH } from "../constants/urls";
import { setAuthorizationToken } from "../functions/connection/auth";
import ConnectionAPI, { connectionAPIPost, MethodType } from "../functions/connection/connectionAPI";
import { NavigateFunction } from "react-router-dom";
import { FirstScreenRoutesEnum } from "../../modules/firstScreen/routes";
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer";

export const useRequests = () => {
    const [loading, setLoading] = useState(false);
    const { setNotification, setUser } = useGlobalReducer();


    const request = async <T>(
        url: string, 
        methods: MethodType, 
        saveGlobal?: (object: T) => void,
        body?: unknown,
    ): Promise<T | undefined> => {
        setLoading(true);

        const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, methods, body)            
            .then((result) => {
                if(saveGlobal) {
                saveGlobal(result);
                }
                return result;
            })
            .catch((error: Error) => {
              setNotification(error.message, 'error');
              return undefined;
            });

        setLoading(false);

        return returnObject;
    };


    const authRequest = async (navigate:NavigateFunction, body: unknown): Promise<void>  => {
      setLoading(true);

        await connectionAPIPost<AuthType>(URL_AUTH,body)
        .then((result) => {
            setUser(result.user);
            setAuthorizationToken(result.accessToken);
            navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
            return result;
        })
        .catch(() => {
            setNotification(ERROR_INVALID_PASSWORD, 'error');
            return undefined;
        });

        setLoading(false);
    };

    return {
        loading,
        authRequest,
        request,
    };
};