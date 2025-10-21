import { Input as InputAntd } from 'antd';
import type { InputProps as InputPropsAntd } from 'antd';

import { BoxInput, TitleInput } from './input.styled';


export interface InputProps extends InputPropsAntd {
    title?: string;
    margin?: string;
}

const Input = ({ title, margin, ...props }: InputProps) => {
    return (
    <BoxInput style={{ margin }}>
        {title && <TitleInput>{title}</TitleInput>}
        <InputAntd {...props} />
    </BoxInput>
    );
};

export default Input;