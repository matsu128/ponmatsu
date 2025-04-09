'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { ProductModal } from '@/components/organisms/ProductModal';
import { HeaderNav } from '@/components/organisms/HeaderNav';

// カテゴリーの定義
const categories = ['すべて', '肉', '麺類', '魚介'] as const;

// モックデータ
const mockProducts: Product[] = [
  {
    id: '1',
    title: '特選 和牛すき焼きセット',
    imageUrls: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      'https://images.unsplash.com/photo-1633237308525-cd587cf71926',
      'https://images.unsplash.com/photo-1602847213180-50e43a80bfdb'
    ],
    description: '最高級の和牛を使用したすき焼きセット。まろやかな味わいと絶妙な霜降りが特徴です。',
    couponCode: 'WAGYU2024',
    affiliateLink: 'https://example.com/product-1',
    clickCount: 150,
    rank: 1,
    category: '肉',
    tiktokTitle: '【話題】高級すき焼きの食べ方！',
    tiktokComment: '和牛の旨味を最大限に引き出す、プロ直伝の食べ方を紹介します！',
    tiktokThumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
  },
  // ... 他の商品データ
];

export default function RecipePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'new' | 'clicks'>('new');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showGradient, setShowGradient] = useState(false);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  
  // アニメーション用の状態
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // フィルタリングとソートのロジック
  const filteredProducts = useCallback(() => {
    let filtered = [...mockProducts];

    if (selectedCategory !== 'すべて') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => 
      sortOrder === 'new' ? a.rank - b.rank : b.clickCount - a.clickCount
    );
  }, [selectedCategory, searchQuery, sortOrder]);

  // 初期データのロード
  useEffect(() => {
    setVisibleProducts(mockProducts);
    setIsLoading(false);
    
    // アニメーションのタイミング制御
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // アニメーション完了後の処理
  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 3500); // 画像拡大アニメーションの時間を3.5秒に設定
      
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  // 検索やカテゴリー変更時にvisibleProductsをリセット
  useEffect(() => {
    setVisibleProducts(filteredProducts());
  }, [filteredProducts]);

  // カテゴリーコンテナのスクロールチェック
  useEffect(() => {
    const checkScroll = () => {
      if (categoryContainerRef.current) {
        const { scrollWidth, clientWidth } = categoryContainerRef.current;
        setShowGradient(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // 商品カードコンポーネント
  const ProductCard = useCallback(({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: Math.min(index, 2) * 0.1 }}
      onClick={() => setSelectedProduct(product)}
      className="cursor-pointer"
    >
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-24 h-24 relative">
            <Image
              src={product.imageUrls[0]}
              alt={product.title}
              width={96}
              height={96}
              className="rounded-lg object-cover"
              loading={index < 5 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshIRshHRsdIR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <div className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-tl-lg rounded-br-lg">
              #{index + 1}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 break-words whitespace-pre-line leading-tight">
              {product.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {product.category}
              </span>
              {product.couponCode && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  🎫 クーポンあり
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeaderNav
        title="ぽんまつサイト"
        _navItems={[
          { label: 'ホーム', href: '/' },
          { label: 'レシピ', href: '/recipe' }
        ]}
      />
      
      {/* アニメーションオーバーレイ */}
      <AnimatePresence>
        {showContent && !animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <motion.div
              initial={{ scale: 0.05, opacity: 0 }}
              animate={{ scale: 10, opacity: 1 }}
              transition={{ 
                duration: 3,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.5 },
                scale: {
                  type: "spring",
                  damping: 20,
                  stiffness: 5,
                  mass: 1
                }
              }}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/田野の顔アフター.jpg"
                  alt="田野の顔アフター"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence>
          {animationComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  🔥 厳選グルメランキング 🔥
                </h1>

                {/* 検索フィールド */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="商品を検索..."
                    className="pl-10 h-12 bg-white"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg mb-8 backdrop-blur-lg backdrop-filter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-4">
                  {/* カテゴリー */}
                  <div className="relative">
                    <div 
                      ref={categoryContainerRef}
                      className="overflow-x-auto scrollbar-hide -mx-6 px-6"
                    >
                      <div className="flex gap-2 pb-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                              'flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap',
                              selectedCategory === category
                                ? 'bg-yellow-500 text-white shadow-sm hover:bg-yellow-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            )}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    {showGradient && (
                      <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
                    )}
                  </div>

                  {/* ソート */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSortOrder('new')}
                      className={cn(
                        'text-xs text-gray-500 hover:text-yellow-500 transition-colors duration-200',
                        sortOrder === 'new' && 'text-yellow-500 font-medium'
                      )}
                    >
                      新着順
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => setSortOrder('clicks')}
                      className={cn(
                        'text-xs text-gray-500 hover:text-yellow-500 transition-colors duration-200',
                        sortOrder === 'clicks' && 'text-yellow-500 font-medium'
                      )}
                    >
                      サイト内クリック数
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* 商品リスト */}
              <div className="space-y-4">
                {isLoading ? (
                  // ローディングスケルトン
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  visibleProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 商品詳細モーダル */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* アニメーション完了後の背景画像 */}
      {animationComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-0 overflow-hidden"
          style={{ pointerEvents: 'none' }}
        >
          <Image
            src="/田野の顔ビフォー.jpg"
            alt="背景画像"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}
    </div>
  );
} 