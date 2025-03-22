import React, { useState } from 'react';
import { Modal } from '../molecules/Modal';
import { FaLine } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
  onSnsLogin: (provider: 'line' | 'x') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSnsLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <Modal
      isOpen={isOpen}
      title="ログイン"
      onClose={onClose}
    >
      <div className="space-y-8 p-2">
        {/* メールアドレス・パスワードログイン */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm transition-colors duration-200 ease-in-out focus:bg-white focus:border-gray-300 focus:ring-0"
              required
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm transition-colors duration-200 ease-in-out focus:bg-white focus:border-gray-300 focus:ring-0"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:translate-y-[-1px] hover:shadow-lg"
          >
            ログイン
          </button>
        </form>

        {/* 区切り線 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400">または</span>
          </div>
        </div>

        {/* SNSログイン */}
        <div className="space-y-3">
          <button
            onClick={() => onSnsLogin('line')}
            className="w-full bg-[#06C755] text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-[#05b54c] transition-all duration-200 ease-in-out transform hover:translate-y-[-1px] hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <FaLine className="text-xl" />
            <span>LINEでログイン</span>
          </button>
          <button
            onClick={() => onSnsLogin('x')}
            className="w-full bg-black text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-gray-900 transition-all duration-200 ease-in-out transform hover:translate-y-[-1px] hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <FaXTwitter className="text-xl" />
            <span>Xでログイン</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}; 