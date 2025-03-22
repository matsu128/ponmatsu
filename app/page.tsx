/**
 * ホームページのメインコンポーネント
 * TODO: APIとの連携実装
 * - ニュース記事とランキングを表示
 * - バックエンドAPIからデータを取得する
 * - 取得したデータをFanSiteTemplateに渡す
 */

'use client';

import React from 'react';
import { FanSiteTemplate } from '@/components/templates/FanSiteTemplate';
import { dummyData } from '@/dummy/data';

export default function Home() {
  return (
    <FanSiteTemplate
      title="ぽんまつサイト"
      navItems={[]}
      newsItems={dummyData.news}
      rankingItems={dummyData.rankings}
      isLoggedIn={false}
    />
  );
} 