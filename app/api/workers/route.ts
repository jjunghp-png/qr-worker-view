import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      slug,
      company,
      role,
      photo_url,
      site_entered_at,
      passed_test,
    } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: '이름과 slug는 필수입니다.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('workers')
      .insert([
        {
          name,
          slug,
          company,
          role,
          photo_url,
          site_entered_at: site_entered_at
            ? site_entered_at.replace('T', ' ')
            : null,
          passed_test,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message || 'DB 저장 실패' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: '등록 완료',
      worker: data,
    })
  } catch {
    return NextResponse.json(
      { error: '서버 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}