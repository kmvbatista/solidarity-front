import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  sendForgotPwdToken,
  validateForgotPwdToken,
} from '../../services/tokenService';
import { resetPassword } from '../../services/userService';
import { Column, Row } from '../../globalComponents';

import swal from 'sweetalert';
import {
  Welcome,
  InitialForm,
  LoginInput,
  RegisterButton,
  Title,
  Container,
  TextLink,
} from '../FirstSignup/styles';
import LoaderContainer from '../../components/LoaderContainer';
import PhoneInput from '../../components/PhoneInput';
import { isEmailValid } from '../../services/emailValidator';

export default function Login() {
  const params = useParams();
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(params.token != undefined);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (params.token) {
      validateToken();
    }
  });

  async function validateToken() {
    await validateForgotPwdToken(params.token);
    setIsChangingPassword(true);
  }

  async function sendToken() {
    if (!isFormValid()) {
      return;
    }
    try {
      setIsLoading(true);
      await sendForgotPwdToken(login);
      setIsLoading(false);
      swal(
        'Código enviado com sucesso',
        'Verifique o seu email por favor',
        'success',
      );
    } catch (error) {
      setIsLoading(false);
      swal(
        `${
          error.response
            ? error.response.data.error
            : 'Houve um erro na sua requisição!'
        }`,
        'Tente novamente.',
        'error',
      );
    }
  }

  async function sendNewPassword() {
    if (!isFormValid()) {
      return;
    }
    try {
      setIsLoading(true);
      const dataToSend = { password, confirmPassword, token: params.token };
      await resetPassword(dataToSend);
      swal({
        title: 'Senha alterada com sucesso. \nFaça login por favor',
        icon: 'success',
      }).then((x) => history.replace('/login'));
    } catch (error) {
      setIsLoading(false);
      swal(
        `${
          error.response
            ? error.response.data.error
            : 'Houve um erro na sua requisição!'
        }`,
        'Tente novamente.',
        'error',
      );
    }
  }
  function toggleLoginWithPhone() {
    setlogin('');
    setLoginWithPhone(!loginWithPhone);
  }

  function handleButtonClick() {
    if (isChangingPassword) {
      return sendNewPassword();
    }
    return sendToken();
  }

  function isFormValid() {
    if (loginWithPhone) {
      if (login.length < 6) {
        swal('Por favor, insira um telefone válido', '', 'error');
        return false;
      }
    } else if (!isEmailValid(login)) {
      swal('Por favor, insira um email válido', '', 'error');
      return false;
    }
    if (isChangingPassword) {
      if (password.length < 8) {
        swal('A senha deve ter no mínimo 8 caracteres', '', 'error');
        return false;
      }
      if (password !== confirmPassword) {
        swal('A confirmação de senha está incorreta', '', 'error');
        return false;
      }
    }
    return true;
  }

  return (
    <Container style={{ padding: 0 }}>
      <Welcome
        style={{
          backgroundColor: 'var(--color-pink)',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <img
          style={{ width: '10em', height: '10em', marginBottom: '2em' }}
          src='./ficaemcasa.svg'
          alt='Fica em Casa'
        />
        <div style={{ fontSize: '5em' }}>
          <strong>Fica</strong> em <strong>casa</strong>
        </div>
      </Welcome>
      <InitialForm>
        <Title>
          <strong style={{ fontSize: '1.5em' }}>Esqueci minha senha</strong>
        </Title>
        {!isChangingPassword &&
          (!loginWithPhone ? (
            <Column>
              <LoginInput
                placeholder='seu email'
                name='login'
                id='login'
                required
                value={login}
                onChange={(e) => setlogin(e.target.value)}
              ></LoginInput>
              <Row style={{ width: '100%', justifyContent: 'space-around' }}>
                <TextLink onClick={toggleLoginWithPhone}>
                  faço login com telefone
                </TextLink>
              </Row>
            </Column>
          ) : (
            <Column>
              <PhoneInput phone={login} setPhone={setlogin}></PhoneInput>
              <TextLink onClick={toggleLoginWithPhone}>
                faço login com email
              </TextLink>
            </Column>
          ))}
        {isChangingPassword && (
          <>
            <LoginInput
              placeholder='nova senha'
              name='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></LoginInput>
            <LoginInput
              placeholder='confirmação de nova senha'
              name='password'
              type='password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></LoginInput>
          </>
        )}
        <LoaderContainer color={'var(--color-pink)'} isLoading={isLoading}>
          <RegisterButton onClick={handleButtonClick}>
            {isChangingPassword ? 'Confirmar' : 'Enviar código'}
          </RegisterButton>
        </LoaderContainer>
      </InitialForm>
    </Container>
  );
}
