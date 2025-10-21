import { logout } from "../../functions/connection/auth";
import { HeaderContainer, LogoExist } from "./header.style";
import { Modal } from 'antd'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
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
            onOk={() => logout(navigate)}
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