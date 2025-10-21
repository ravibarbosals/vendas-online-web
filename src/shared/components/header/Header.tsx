import { logout } from "../../functions/connection/auth";
import { HeaderContainer, LogoExist } from "./header.style";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd'
import React, { useState } from 'react';


const Header = () => {
    const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };


    return (
        <>
        <Modal
            title="Atenção"
            open={open}
            onOk={logout}
            onCancel={hideModal}
            okText="Sim"
            cancelText="Cancelar"
        >
            <p>Tem certeza que deseja sair?</p>
            </Modal>
        <HeaderContainer>
            <LogoExist onClick={showModal}/>
        </HeaderContainer>
        </>
    );
};

export default Header;