import { useState } from "react";
import ConnectionAPI, { connectionAPIPost, MethodType } from "../functions/connection/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";
import { URL_AUTH } from "../constants/urls";
import { ERROR_INVALID_PASSWORD } from "../constants/errorsStatus";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../modules/product/routes";
import { setAuthorizationToken } from "../functions/connection/auth";
import { AuthType } from "../../modules/login/types/AuthType";

export const userRequest = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setNotification, setUser } = useGlobalContext();


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


    const authRequest = async (body: unknown): Promise<void>  => {
      setLoading(true);

        await connectionAPIPost<AuthType>(URL_AUTH,body)
        .then((result) => {
            setUser(result.user);
            setAuthorizationToken(result.accessToken);
            navigate(ProductRoutesEnum.PRODUCT)
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