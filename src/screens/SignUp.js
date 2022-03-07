import { isLoggedInVar } from '../apollo';
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import { BaseBox, FatLink } from '../components/shared';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import ButtonBox from '../components/auth/BottonBox';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: '회원가입 완료되었습니다 로그인 부탁드릴게요',
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: 'onChange',
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title={'회원가입 페이지'} />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>
            회원가입해서 너의 친구들로부터 영상 또는 사진을 봤으면 좋겠어.
          </SubTitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: '성을 입력해주세요' })}
            type="text"
            placeholder="성"
            name="firstName"
          />
          <Input
            ref={register}
            type="text"
            placeholder="이름"
            name="lastName"
          />
          <Input
            ref={register({ required: '이메일을 입력해주세요' })}
            name="email"
            type="text"
            placeholder="이메일"
          />
          <Input
            ref={register({ required: '닉네임을 입력해주세요' })}
            name="username"
            type="text"
            placeholder="닉네임"
          />
          <Input
            ref={register({ required: '비밀번호를 입력해주세요' })}
            name="password"
            type="password"
            placeholder="비밀번호"
          />

          <Button
            value={loading ? '회원가입중' : '회원가입 완료'}
            disabled={!formState.isValid || loading}
            type="submit"
            value="회원가입 하기"
          />
        </form>
      </FormBox>
      <ButtonBox
        cta={'로그인 하실껀가여?'}
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SignUp;
