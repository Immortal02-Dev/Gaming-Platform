const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('backend', '.env.local') });

async function seed() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log("Seeding faqs table...");
        
        const faqs = [
            ['계정', '비밀번호를 잊어버렸어요.', '<p>비밀번호 찾기 기능을 이용하시거나 고객센터로 문의해주세요.</p>', 1, 1],
            ['계정', '계정을 탈퇴하고 싶어요.', '<p>고객센터를 통해 본인 확인 후 탈퇴 처리가 가능합니다.</p>', 2, 1],
            ['충전/환전', '충전은 어떻게 하나요?', '<p>내 정보 > 충전 메뉴에서 안내된 계좌로 입금 후 충전 신청을 해주세요.</p>', 3, 1],
            ['충전/환전', '환전 신청 시 얼마나 걸리나요?', '<p>보통 10분 내외로 처리되나, 은행 사정에 따라 지연될 수 있습니다.</p>', 4, 1],
            ['게임', '게임 결과가 이상해요.', '<p>게임 로그를 확인하신 후 상세 내용과 함께 고객센터로 문의해주세요.</p>', 5, 1],
            ['이벤트', '지인 추천 보너스는 어떻게 받나요?', '<p>추천 코드를 통해 가입한 지인이 일정 금액 이상 충전 시 자동으로 지급됩니다.</p>', 6, 1],
        ];

        for (const faq of faqs) {
            await db.execute(
                "INSERT INTO faqs (category, title, content, display_order, is_active) VALUES (?, ?, ?, ?, ?)",
                faq
            );
        }

        console.log("FAQ seeding completed successfully!");
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        await db.end();
    }
}

seed();
