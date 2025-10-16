import { Spin } from "antd";
import { useEffect } from "react";
import { getAuthorizationToken, unsetAuthorizationToken } from "../../../shared/functions/connection/auth";
import { useNavigate } from "react-router-dom";
import { ProductRoutesEnum } from "../../product/routes";
import { LoginRoutesEnum } from "../../login/routes";
import { connectionAPIGet } from "../../../shared/functions/connection/connectionAPI";
import { URL_USER } from "../../../shared/constants/urls";

const FirstScreen = () => {
const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async() => {
            const token = getAuthorizationToken();
        if (token) {
            await connectionAPIGet(URL_USER).then(() => {
            navigate(ProductRoutesEnum.PRODUCT);
            }).catch(() => {
                unsetAuthorizationToken();
                navigate(LoginRoutesEnum.LOGIN);
            });
        } else {
            navigate(LoginRoutesEnum.LOGIN);
        }

        };
        
        verifyToken();  
    }, []);

    return <Spin />;
};

export default FirstScreen;