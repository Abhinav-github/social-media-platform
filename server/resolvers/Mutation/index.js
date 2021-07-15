import { query } from '@/server/db';

export const addPost = async(parent, { text, user_id }) => {
    var count = await query(`SELECT COUNT(*) as namesCount FROM posts;`);
    const result = await query(`INSERT INTO posts VALUES (?,?,?,?,?)`, [count[0].namesCount+1, text, user_id]);
    var updated = await query (`SELECT * FROM posts ORDER BY id DESC LIMIT 1 `);
    return updated[0];
  };


export const addFeed = async(parent, { source_id, source_type }) => {
    var latest = await query(`SELECT * FROM posts ORDER BY id DESC LIMIT 1`);
    const result = await query(`INSERT INTO feeds VALUES (?,?,?)`, [source_id, source_type, latest[0].id]);
    var updated = await query (`SELECT * FROM feeds ORDER BY post_id DESC LIMIT 1 `);
    return updated[0];
  };
