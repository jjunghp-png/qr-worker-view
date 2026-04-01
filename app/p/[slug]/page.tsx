import { supabase } from '@/lib/supabase'

function formatDateTime(value: string | null) {
  if (!value) return '-'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

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

  const passed = !!data.passed_test

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 12px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          background: '#ffffff',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        }}
      >
        {/* 상단 상태바 */}
        <div
          style={{
            background: passed
              ? 'linear-gradient(90deg, #18794e 0%, #6cc16f 100%)'
              : 'linear-gradient(90deg, #b42318 0%, #f97066 100%)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            padding: '18px',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: passed ? '#16a34a' : '#dc2626',
            }}
          >
            {passed ? '✓' : '!'}
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {passed ? '출입 가능' : '출입 불가'}
          </div>
        </div>

        {/* 사진 */}
        <div
          style={{
            width: '100%',
            height: 300,
            background: '#e5e7eb',
          }}
        >
          {data.photo_url ? (
            <img
              src={data.photo_url}
              alt={`${data.name} 사진`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: '#6b7280',
              }}
            >
              사진 없음
            </div>
          )}
        </div>

        {/* 정보 영역 */}
        <div
          style={{
            padding: '22px',
            textAlign: 'center',
          }}
        >
          {/* 이름 */}
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: '#111827',
            }}
          >
            {data.name}
          </h1>

          {/* 역할 */}
          <p
            style={{
              marginTop: 8,
              fontSize: 18,
              color: '#6b7280',
            }}
          >
            {data.role || '-'}
          </p>

          {/* 구분선 */}
          <div
            style={{
              marginTop: 20,
              borderTop: '1px solid #e5e7eb',
              paddingTop: 18,
              textAlign: 'left',
            }}
          >
            {/* 회사 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 20 }}>🏢</div>
              <div style={{ fontSize: 16, color: '#111827' }}>
                회사: {data.company || '-'}
              </div>
            </div>

            {/* 출입시간 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 20 }}>🕒</div>
              <div style={{ fontSize: 16, color: '#111827' }}>
                현장 출입: {formatDateTime(data.site_entered_at)}
              </div>
            </div>

            {/* 시험결과 */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 20 }}>
                {passed ? '✅' : '❌'}
              </div>
              <div style={{ fontSize: 16 }}>
                시험 결과:{' '}
                <span
                  style={{
                    color: passed ? '#16a34a' : '#dc2626',
                    fontWeight: 700,
                  }}
                >
                  {passed ? '합격' : '불합격'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}