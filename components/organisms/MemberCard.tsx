'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Member {
  name: string;
  height: string;
  weight: string;
  age: string;
  personality: string;
  hobbies: string[];
  imageUrl: string;
}

interface MemberCardProps {
  member: Member;
}

const cardVariants = {
  hover: {
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer group p-6"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative w-40 h-40 mb-4"
          variants={imageVariants}
          whileHover="hover"
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-white shadow-md"></div>
        </motion.div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight font-serif">
            {member.name}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}; 