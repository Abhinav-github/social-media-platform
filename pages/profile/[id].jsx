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

const ProfilePage = () => {
  const [text, setText] = useState('');
  const { query } = useRouter();
  const { data, loading } = useQuery(USER_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
    },
    pollInterval: 500,
  })

  const user = data?.user;
  const [addPost] = useMutation(ADD_POST);
  const [addFeed] = useMutation(ADD_FEED);

  useEffect(async () => {
    if (user?.id && text) {
      if (user.id == 3) {
        await addPost({ variables: { text: text, user_id: user.id } })
        addFeed({
          variables: { source_id: user.id, source_type: "user" },
        })
        setText('');
      }
      else {
        alert("You can't submit here! Wrong user.");
      }
    }
  }, [text, data]);

  if (!user || loading) {
    return null;
  }
  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}'s posts</h1>
          <ul className="grid gap-4 mt-1" style={scroll}>
            {user.posts.map(({ id, text }) => (
              <li>
                <Post>{user.name}: {text}</Post>
              </li>
            ))}
          </ul>
          <div style={absolute}>
            <Submission text={text} setText={setText}/>
          </div>
        </Card>
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs">
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            <img src={user.profile_photo} />
          </div>
          <h2 className="text-md font-bold">{user.name}</h2>
          <span className="text-sm text-gray-400"><strong>{user.communities.length}</strong> communities</span>
          <p className="text-center text-sm">{user.bio}</p>
          <ul className="grid gap-4 mt-2">
            {user.communities.map(({ id, name, icon }) => (
              <li>
                <CommunityCardButton href={`/community/${id}`} icon={icon}>
                  {name}
                </CommunityCardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default ProfilePage;
