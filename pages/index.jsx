import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react';

import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import Post from '@/components/Post';
import Submission from '@/components/Submission'


const USER_QUERY = gql`
  query ($id: Int!) {
    user(id: $id) {
      id
      name
      profile_photo
      bio
      communities {
        id
        name
        icon
        posts {
          id
          text
          name
        }
      }
      posts {
        id
        text
      }
    }
  }
`;

const ADD_POST = gql`
  mutation AddPost($text: String! $user_id: Int!) {
    addPost(text: $text user_id: $user_id) {
      id
      text
      user_id
    }
  }
`;

const ADD_FEED = gql`
  mutation AddFeed($source_id: Int! $source_type: String!) {
    addFeed(source_id: $source_id source_type: $source_type) {
      source_id
      source_type
      post_id
    }
  }
`;
const absolute = {
  position: "relative",
  bottom: "0px",
  color: "SlateBlue"
};

const scroll = {
  maxHeight:"250px",
  overflow:"hidden",
  overflowY: "scroll",
};

const Home = () => {
  const [text, setText] = useState('')
  const { data, loading } = useQuery(USER_QUERY, {
    variables: {
      id: Number(3),
    },
    pollInterval: 500,
  })
  const user = data?.user;
  const [addPost] = useMutation(ADD_POST);
  const [addFeed] = useMutation(ADD_FEED);

  useEffect(async () => {
     if (user?.id && text) {
       await addPost({ variables: { text: text, user_id: 3 } })
       addFeed({
         variables: { source_id: user.id, source_type: "user" },
       })
       setText('');
     }
   }, [text, data]);

  if (!user || loading) {
    return null;
  }

  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
          <ul className="grid gap-4 mt-1" style={scroll}>
            {user.posts.map(({ id, text }) => (
              <li>
                <Post>{user.name}: {text}</Post>
              </li>
            ))}
            {user.communities.map(community => (
              community.posts.map(({ id, text, name }) => (
                <li>
                  <Post>{name}: {text}</Post>
                </li>
              ))
            ))}
          </ul>
          <div style={absolute}>
            <Submission text={text} setText={setText}/>
          </div>
        </Card>
        <Card className="ml-4 max-w-xs flex-none">
          <h2 className="text-md font-bold">Communities</h2>
          <ul className="grid gap-4 mt-2">
            <li>
              <CommunityCardButton icon="🤠" href="/community/1">
                Dallas Fort Worth Investors
              </CommunityCardButton>
            </li>
            <li>
              <CommunityCardButton icon="🔨" href="/community/2">
                BRRRR Investors
              </CommunityCardButton>
            </li>
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default Home;
