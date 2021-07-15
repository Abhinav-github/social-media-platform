import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react';

import Card from '@/components/Card';
import CardButton from '@/components/CardButton';
import Page from '@/components/Page';
import Post from '@/components/Post';
import Submission from '@/components/Submission'

const COMMUNITY_QUERY = gql`
  query ($id: Int!) {
    community(id: $id) {
      id
      name
      description
      icon
      members {
        id
        name
        profile_photo
      }
      posts {
        id
        text
        name
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
  color: "Teal"
};

const scroll = {
  maxHeight:"250px",
  overflow:"hidden",
  overflowY: "scroll"
};
const CommunityPage = () => {
  const [text, setText] = useState('')
  const { query } = useRouter();
  const { data, loading } = useQuery(COMMUNITY_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
    },
    pollInterval: 500,
  })

  const community = data?.community;
  const [addPost] = useMutation(ADD_POST);
  const [addFeed] = useMutation(ADD_FEED);

  useEffect(async () => {
     if (community?.id && text) {
       if (community.id == 2) {
         await addPost({ variables: { text: text, user_id: 3 } })
         addFeed({
           variables: { source_id: community.id, source_type: "community" },
         })
         setText('');
       }
       else{
         alert("You can't post here! Join this community.");
       }
     }
   }, [text, data]);

  if (!community || loading) {
    return null;
  }
  return (
    <Page>
      <div className="flex">
        <Card className="flex-1">
          <h1 className="text-2xl font-bold">Welcome to {community.name}</h1>
          <ul className="grid gap-4 mt-1" style={scroll}>
            {community.posts.map(({ id, text, name }) => (
              <li>
                <Post>{name}: {text}</Post>
              </li>
            ))}
          </ul>
          <div style={absolute}>
            <Submission text={text} setText={setText}/>
          </div>
        </Card>
        <Card className="ml-4 py-10 max-w-xs flex-none grid justify-items-center gap-2 max-w-xs">
          <div className="text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center">
            {community.icon}
          </div>
          <h2 className="text-md font-bold">{community.name}</h2>
          <span className="text-sm text-gray-400"><strong>{community.members.length}</strong> members</span>
          <p className="text-center text-sm">{community.description}</p>
          <ul className="grid gap-4 mt-2">
            {community.members.map(({ id, name, profile_photo }) => (
              <li>
                <CardButton href={`/profile/${id}`} className="flex items-center">
                  <img className="h-6 w-6" src={profile_photo} />
                  <span className="ml-2 text-md">{name}</span>
                </CardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default CommunityPage;
