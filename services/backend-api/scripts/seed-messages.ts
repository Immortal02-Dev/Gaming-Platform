import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function seed() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('🌱 Seeding messages...');

  try {
    // Get some users to be receivers
    const [users]: any = await db.execute('SELECT id FROM users WHERE role = "user" LIMIT 5');
    if (users.length === 0) {
      console.log('No users found to receive messages. Please seed users first.');
      process.exit(1);
    }

    // Get an admin to be sender
    const [admins]: any = await db.execute('SELECT id FROM users WHERE role IN ("admin", "super_admin") LIMIT 1');
    const adminId = admins.length > 0 ? admins[0].id : 1;

    const messages = [
      {
        sender_id: adminId,
        receiver_id: users[0].id,
        subject: '환영합니다!',
        content: '가입을 축하드립니다. 즐거운 게임 되세요!',
      },
      {
        sender_id: adminId,
        receiver_id: users[1]?.id || users[0].id,
        subject: '입금 확인 완료',
        content: '요청하신 입금이 정상적으로 처리되었습니다.',
      },
      {
        sender_id: adminId,
        receiver_id: users[2]?.id || users[0].id,
        subject: '이벤트 당첨 안내',
        content: '주말 보너스 이벤트에 당첨되셨습니다. 보너스를 확인해주세요.',
      },
      {
        sender_id: adminId,
        receiver_id: users[3]?.id || users[0].id,
        subject: '시스템 점검 안내',
        content: '내일 새벽 2시부터 4시까지 시스템 점검이 있을 예정입니다.',
      },
      {
        sender_id: adminId,
        receiver_id: users[4]?.id || users[0].id,
        subject: '문의하신 내용에 대한 답변입니다.',
        content: '요청하신 계좌 정보 변경이 완료되었습니다.',
      },
    ];

    for (const msg of messages) {
      await db.execute(
        'INSERT INTO messages (sender_id, receiver_id, subject, content) VALUES (?, ?, ?, ?)',
        [msg.sender_id, msg.receiver_id, msg.subject, msg.content]
      );
    }

    console.log(`✅ Seeded ${messages.length} messages.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await db.end();
  }
}

seed();
