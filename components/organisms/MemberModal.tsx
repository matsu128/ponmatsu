'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Text } from '../atoms/Text';
import { X } from 'lucide-react';

interface Member {
  name: string;
  height: string;
  weight: string;
  age: string;
  personality: string;
  hobbies: string[];
  imageUrl: string;
}

interface MemberModalProps {
  member: Member;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const tagVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col">
          <div className="relative aspect-[4/3]">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white tracking-tight font-serif">
                {member.name}
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-1">
                <Text variant="caption" className="text-gray-400 uppercase tracking-wider text-xs font-medium">
                  身長
                </Text>
                <Text variant="body" className="text-gray-900 font-medium">
                  {member.height}
                </Text>
              </div>
              <div className="space-y-1">
                <Text variant="caption" className="text-gray-400 uppercase tracking-wider text-xs font-medium">
                  体重
                </Text>
                <Text variant="body" className="text-gray-900 font-medium">
                  {member.weight}
                </Text>
              </div>
              <div className="space-y-1">
                <Text variant="caption" className="text-gray-400 uppercase tracking-wider text-xs font-medium">
                  年齢
                </Text>
                <Text variant="body" className="text-gray-900 font-medium">
                  {member.age}
                </Text>
              </div>
            </div>

            <div className="mb-6">
              <Text variant="caption" className="text-gray-400 uppercase tracking-wider text-xs font-medium mb-2">
                性格
              </Text>
              <Text variant="body" className="text-gray-700 leading-relaxed">
                {member.personality}
              </Text>
            </div>

            <div>
              <Text variant="caption" className="text-gray-400 uppercase tracking-wider text-xs font-medium mb-3">
                趣味
              </Text>
              <div className="flex flex-wrap gap-2">
                {member.hobbies.map((hobby) => (
                  <motion.span
                    key={hobby}
                    variants={tagVariants}
                    whileHover="hover"
                    className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {hobby}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 