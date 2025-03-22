/**
 * レシピ一覧を取得するAPIルート
 * - レシピのタイトル、詳細、サムネイル画像を返却
 * - Prismaを使用してデータベースからレシピ情報を取得
 */

import { NextResponse } from 'next/server';
import { dummyData } from '@/dummy/data';

export async function GET() {
  try {
    return NextResponse.json({ recipes: dummyData.recipes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({ 
      recipe: {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 