import { isLoggedInVar, logUserIn } from '../apollo';
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import { BaseBox } from '../components/shared';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import ButtonBox from '../components/auth/BottonBox';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';
import FormError from '../components/auth/FormError';
import { gql, useMutation } from '@apollo/client';

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
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;
const Notification = styled.div`
  color: red;
`;

function Login() {
  const location = useLocation();
  console.log(location);
  const {
    register,
    watch,
    handleSubmit,
    formState,
    errors,
    getValues,
    setError,
    clearErrors, // 에러메세지 사라지게하는 함수
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  }); //먼저 객체를 생성  후 register라는 함수를 불러옴
  // useEffect(() => {
  //   if (location?.state?.message === undefined || null) {
  //     return null;
  //   }
  //   return alert(location?.state?.message);
  // }, []);
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError('result', { message: error });
    }
    if (token) {
      logUserIn(token);
    }
    console.log(data);
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();

    login({
      variables: { username, password },
    });
  };
  const onSubmitInValid = (data) => {
    console.log(data);
  };
  console.log(formState.isValid);
  const clearLoginError = () => {
    clearErrors('result');
  };
  return (
    <AuthLayout>
      <PageTitle title={'로그인 페이지'} />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: '아이디를 입력해주세요',
              minLength: {
                value: 5,
                message: '사용자 닉네임의 길이가 5보다작습니다',
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="사용자 닉네임"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: '비밀번호를 입력해주세요',
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            hasError={Boolean(errors?.password?.message)}
            placeholder="비밀번호"
          />
          <FormError message={errors?.username?.message} />

          <Button
            type="submit"
            value={loading ? '로딩중' : '로그인'}
            disabled={!formState.isValid || loading}
            // disabled={!formState.isValid}
          />
          <FormError message={errors?.result?.message} />
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
