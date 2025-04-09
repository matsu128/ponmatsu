'use client';

import { motion } from 'framer-motion';
import { MemberCard } from '@/components/organisms/MemberCard';
import { HeaderNav } from '../organisms/HeaderNav';

const members = [
  {
    name: 'こうすけ',
    height: '175cm',
    weight: '65kg',
    age: '28歳',
    personality: '明るく社交的。新しいことに挑戦するのが好き。',
    hobbies: ['旅行', 'カメラ', '料理'],
    imageUrl: '/田野の顔アフター.jpg',
  },
  {
    name: '田野',
    height: '170cm',
    weight: '60kg',
    age: '26歳',
    personality: '冷静で分析力がある。計画を立てるのが得意。',
    hobbies: ['読書', '映画鑑賞', 'ジョギング'],
    imageUrl: '/田野の顔ビフォー.jpg',
  },
  {
    name: 'きーくん',
    height: '168cm',
    weight: '58kg',
    age: '25歳',
    personality: 'クリエイティブで細かい。完璧主義者。',
    hobbies: ['イラスト', '音楽', 'カフェ巡り'],
    imageUrl: '/佐藤の顔.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const AboutTemplate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav 
        title="ぽんまつサイト" 
        _navItems={[
          { label: 'ホーム', href: '/' },
          { label: '自己紹介', href: '/about' },
        ]}
      />
      
      <main className="relative">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.2,
                }}
              >
                <MemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}; 