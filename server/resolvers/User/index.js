import { query } from '@/server/db';

export const communities = async (user) => {
  const communities = await query(`
    SELECT c.*
    FROM memberships m
    JOIN communities c on m.community_id = c.id
    WHERE m.user_id = ?
  `, [user.id]);

  return communities;
};

export const posts = async (user) => {
  const posts = await query(`
    SELECT p.*
    FROM feeds f
    JOIN posts p on p.id = f.post_id
    WHERE p.user_id = ? and f.source_type = 'user'
  `, [user.id]);

  return posts;
};
