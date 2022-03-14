import { gql, useQuery } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar, logOutUserIn } from '../apollo';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

const PhotoContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  background: white;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;
const Username = styled(FatText)`
  margin-left: 15px;
`;
const PhotoFile = styled.img`
  min-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <div>
      {/* <h1>어서와라 시벌~</h1>
      <button onClick={() => logOutUserIn()}>Log out now!</button> */}
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>

          <PhotoFile src={photo.file} alt={'dlalwl'} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size={'2x'} icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={'2x'} icon={faComment} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size={'2x'} icon={faPaperPlane} />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? '1 like' : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
}
export default Home;
