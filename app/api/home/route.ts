/**
 * ホームページのデータを取得するAPIルート
 * - ニュース記事（最新10件）
 * - ランキング（上位10件）
 * を返却する
 */

import { NextResponse } from 'next/server';
import { dummyData } from '@/dummy/data';

export async function GET() {
  try {
    return NextResponse.json(dummyData);
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
      success: true,
      data
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 