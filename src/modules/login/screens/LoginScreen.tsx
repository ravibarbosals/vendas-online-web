import { useState } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/input/Input';
import SVGLogo from '../../../shared/components/icons/SVGLogo'; 
import { 
    BackgroundImage, 
    ContainerLogin, 
    ContainerLoginScreen, 
    LimitedContainer, 
    TitleLogin, 
} from "../styles/loginScreen.styles";
import { userRequest } from '../../../shared/hooks/useRequest';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authRequest, loading } = userRequest();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        authRequest({
                email: email,
                password: password,
        });
    };


    return (
    <ContainerLoginScreen>
        <ContainerLogin>
            <LimitedContainer>
                <SVGLogo  />
                <TitleLogin level={2} type='secondary'>
                    LOGIN 
                </TitleLogin>
                <Input title="USUÁRIO" margin="32px 0px 0px" onChange={handleEmail} value={email} />
                <Input
                type="password" 
                title="SENHA" 
                margin="32px 0px 0px" 
                onChange={handlePassword} 
                value={password}
                />
                <Button loading={loading} type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}>
                    ENTRAR
                </Button>
            </LimitedContainer>
        </ContainerLogin>
        <BackgroundImage src="./background.png"/>
    </ContainerLoginScreen>
    );
};

export default LoginScreen;