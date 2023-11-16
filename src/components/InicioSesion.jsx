import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, message } from 'antd';
import Iniciosesion from '../images/user-interface.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const InicioSesion = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) =>{
        try{
            await signInWithEmailAndPassword(auth, values.email, values.password);
            navigate('/');
        }catch(error){
            console.log('code',error.code); 
            console.log('message', error.message);
            let mensaje;
            switch(error.code){
                case 'auth/network-request-failed':
                    mensaje = 'Hubo un fallo en la conexión';
                break;
                case 'auth/invalid-login-credentials':
                    mensaje = 'El correo y/o la contraseña son incorrectos';
                break;
                default:
                    mensaje = 'Hubo un error al intentar iniciar sesión';
                break;
            }
            message.open({ type: 'error', content: mensaje });
        }
    }

    return (
        <Contenedor>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>
            <ContenedorFormulario>
                <Form form={form} name='inicio-sesion' size='large' className='login-form' onFinish={handleSubmit} >
                    <Form.Item>
                        <Centrar>
                            <img src={Iniciosesion} width="40%" alt="" styled="justify-content: center"/>
                        </Centrar>
                    </Form.Item>
                    <Form.Item name='email' rules={[
                        { required: true, message: 'Ingrese su correo electrónico' },
                        { type: 'email', message: 'Ingrese un correo válido'}
                    ]}>
                        <Input prefix={<FontAwesomeIcon icon={faAt} />} placeholder="Correo electrónico" style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'Ingrese su contraseña'}]}>
                        <Input prefix={<FontAwesomeIcon icon={faLock} />} placeholder='Contraseña' type='password' style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}>
                            Iniciar Sesión
                        </Button>
                        O <Button type='link' href="/crear-cuenta">Registrarse ahora</Button>
                    </Form.Item>
                </Form>
            </ContenedorFormulario>
        </Contenedor>
    );
}

const Contenedor = styled.div`
    display: flex;
    width: 100%;
    min-height: calc(100vh - 55px);
    justify-content: center;
    align-items: center;
`;

const ContenedorFormulario = styled.div`
    width: 20rem;
    border: 1px solid;
    border-radius: 16px;
    padding: 1.5rem;
    background-color: #fff;
`;
 
const Centrar = styled.div`
    display: flex;
    justify-content: center;
`;

export default InicioSesion;