import { createContext, useContext, useEffect, useState } from "react";
import { getAuthorizationToken, setAuthorizationToken } from "../functions/connection/auth";
type NotificationType = 'success' | 'info' | 'warning' |'error';


interface NotificationProps {
    message: string;
    type: NotificationType;
    description?: string;
}

interface GlobalData {
    accessToken?: string;
    notification?: NotificationProps;
}

interface GlobalContextProps {
    globalData: GlobalData;
    setGlobalData: (globalData: GlobalData) => void;
}
export const GlobalContext = createContext({} as GlobalContextProps);

interface GLobalProvideProps {
    children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GLobalProvideProps) => {
    const [globalData, setGlobalData] = useState<GlobalData>({});

    return (
    <GlobalContext.Provider value={{globalData, setGlobalData }}>
        {children}
        </GlobalContext.Provider>
        );
};

export const useGlobalContext = () => {
    const { globalData, setGlobalData } = useContext(GlobalContext);

    useEffect(() => {

        const token = getAuthorizationToken();
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const setAccessToken = (accessToken: string) => {
        setAuthorizationToken(accessToken);
        setGlobalData({
            ...globalData,
            accessToken,
        });
    };

    const setNotification = (message: string, type: NotificationType, description?: string) => {
        setGlobalData({
            ...globalData,
            notification: {
                message,
                type,
                description,
            },
        });
    };


    return {
        notification: globalData?.notification,
        accessToken: globalData?.accessToken, 
        setAccessToken,
        setNotification,
    };
};