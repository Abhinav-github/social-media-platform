import { get } from '@/server/db';

export const user = async (parent, { id }) => {
  const user = await get(`
    SELECT *
    FROM users
    WHERE id = ?
  `, [id]);

  return user;
};

export const community = async (parent, { id }) => {
  const community = await get(`
    SELECT *
    FROM communities
    WHERE id = ?
  `, [id]);
  return community;
};


export const feed = async (parent, { source_id, source_type }) => {
  const feed = await get(`
    SELECT *
    FROM feeds
    WHERE source_id = ? AND source_type = ?
  `, [source_id, source_type]);

  return feed;
};
