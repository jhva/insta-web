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
import { BaseBox, FatLink } from '../components/shared';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import ButtonBox from '../components/auth/BottonBox';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../components/PageTitle';

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

function SignUp() {
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
        <form>
          <Input type="text" placeholder="이름" />
          <Input type="text" placeholder="이메일" />
          <Input type="text" placeholder="닉네임" />
          <Input type="text" placeholder="비밀번호" />

          <Button type="submit" value="회원가입 하기" />
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
