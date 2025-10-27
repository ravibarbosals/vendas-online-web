import type { InputProps as InputPropsAntd } from 'antd';
import { Input as InputAntd } from 'antd';

import { InputTestIdEnum } from './enum/inputTestIdEnum';
import { BoxInput, TitleInput } from './input.styled';

export interface InputProps extends InputPropsAntd {
  title?: string;
  margin?: string;
}

const Input = ({ title, margin, ...props }: InputProps) => {
  return (
    <BoxInput data-testid={InputTestIdEnum.BOX_INPUT} style={{ margin }}>
      {title && <TitleInput data-testid={InputTestIdEnum.INPUT_TITLE}>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;
