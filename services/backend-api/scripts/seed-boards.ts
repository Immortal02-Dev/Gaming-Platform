import mysql from 'mysql2/promise';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load .env.local first, then fallback to .env
const envLocalPath = path.join(__dirname, '../.env.local');
const envPath = path.join(__dirname, '../.env');

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config({ path: envPath });
}

async function seed() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bc_game_auth'
  });

  console.log('Seeding boards...');

  // Get an admin user to be the author
  const [admins] = await conn.query('SELECT id FROM users WHERE role = "admin" OR role = "super_admin" LIMIT 1');
  const adminId = (admins as any[]).length > 0 ? (admins as any[])[0].id : 1;

  // Get some regular users for QnA
  const [users] = await conn.query('SELECT id FROM users WHERE role = "user" LIMIT 5');
  const userIds = (users as any[]).map(u => u.id);

  const posts = [
    {
      board_type: 'notice',
      user_id: adminId,
      subject: '[공지] 시스템 정기 점검 안내 (5/10)',
      content: '<p>안녕하세요. BC.Game입니다.</p><p>안정적인 서비스 제공을 위해 시스템 정기 점검이 예정되어 있습니다.</p><p>일시: 2026년 5월 10일 02:00 ~ 06:00</p>',
      is_pinned: 'Y',
      display_order: 1
    },
    {
      board_type: 'notice',
      user_id: adminId,
      subject: '[안내] 입출금 지연 현상 정상화 완료',
      content: '<p>임시 서버 점검으로 인한 입출금 지연 현상이 모두 해결되었습니다.</p>',
      is_pinned: 'N',
      display_order: 2
    },
    {
      board_type: 'event',
      user_id: adminId,
      subject: '✨ 신규 가입 웰컴 보너스 이벤트 ✨',
      content: '<p>신규 가입하신 모든 분들께 100% 입금 보너스를 드립니다!</p>',
      is_pinned: 'Y',
      display_order: 1
    },
    {
      board_type: 'free',
      user_id: userIds[0] || adminId,
      subject: '오늘 축구 배당 좋네요 ㅋㅋ',
      content: '<p>이번 주말 경기 다들 어떻게 보시나요?</p>',
      is_pinned: 'N',
      display_order: 0
    },
    {
      board_type: 'qna',
      user_id: userIds[1] || adminId,
      subject: '입금 확인 부탁드립니다.',
      content: '<p>10분 전에 입금했는데 아직 반영이 안 됐어요.</p>',
      is_pinned: 'N',
      display_order: 0,
      request_type: '입금'
    },
    {
      board_type: 'reply',
      user_id: adminId,
      subject: '입금 확인 지연 안내',
      content: '<p>현재 입금량이 많아 처리가 지연되고 있습니다. 조금만 기다려 주시면 감사하겠습니다.</p>',
      is_pinned: 'N',
      display_order: 1,
      request_type: '일반'
    },
    {
      board_type: 'reply',
      user_id: adminId,
      subject: '계좌 문의 답변',
      content: '<p>요청하신 계좌 정보는 다음과 같습니다. [계좌정보]</p>',
      is_pinned: 'N',
      display_order: 2,
      request_type: '계좌'
    }
  ];

  for (const post of posts) {
    await conn.query(
      'INSERT INTO boards (board_type, user_id, subject, content, is_pinned, display_order, request_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [post.board_type, post.user_id, post.subject, post.content, post.is_pinned, post.display_order, (post as any).request_type || '']
    );
  }

  console.log(`Seeded ${posts.length} board posts`);
  await conn.end();
  process.exit();
}

seed().catch(console.error);
