import { isLoggedInVar } from '../apollo';
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import { BaseBox } from '../components/shared';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import ButtonBox from '../components/auth/BottonBox';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';

const Form = styled.form``;
const TobBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  return (
    <AuthLayout>
      <PageTitle title={'로그인 페이지'} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form>
          <Input type="text" placeholder="사용자 닉네임" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value="로그인" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />{' '}
          <span>페이스북으로 로그인하기</span>
        </FacebookLogin>
      </FormBox>
      <ButtonBox
        cta={'계정이 없나용?'}
        linkText="회원가입"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
