import { query } from '@/server/db';

export const members = async (community) => {
  const members = await query(`
    SELECT u.*
    FROM memberships m
    JOIN users u on m.user_id = u.id
    WHERE m.community_id = ?
  `, [community.id]);

  return members;
};

export const posts = async (community) => {
  const posts = await query(`
    SELECT p.*, u.name
    FROM feeds f
    JOIN posts p on p.id = f.post_id
    JOIN users u on p.user_id = u.id
    WHERE f.source_id = ? and f.source_type = 'community';
  `, [community.id]);

  return posts;
};
