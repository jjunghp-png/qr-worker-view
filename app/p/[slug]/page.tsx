import { supabase } from '@/lib/supabase'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('workers')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return <div style={{ padding: 20 }}>정보 없음</div>
  }

  return (
    <div style={{ padding: 20, lineHeight: 1.8 }}>
      {data.photo_url && (
        <div style={{ marginBottom: 20 }}>
          <img
            src={data.photo_url}
            alt={`${data.name} 사진`}
            style={{
              width: 180,
              height: 220,
              objectFit: 'cover',
              borderRadius: 12,
              border: '1px solid #ddd',
            }}
          />
        </div>
      )}

      <h1>{data.name}</h1>
      <p>회사: {data.company}</p>
      <p>역할: {data.role}</p>
      <p>
        현장 출입:{' '}
        {data.site_entered_at
          ? new Date(data.site_entered_at).toLocaleString('ko-KR')
          : '-'}
      </p>
      <p>시험 결과: {data.passed_test ? '합격' : ''}</p>
    </div>
  )
}