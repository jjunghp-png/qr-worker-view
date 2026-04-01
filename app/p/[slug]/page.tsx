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
        padding: '40px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
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
            gap: 14,
            padding: '24px 20px',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 30,
              fontWeight: 700,
              color: passed ? '#16a34a' : '#dc2626',
            }}
          >
            {passed ? '✓' : '!'}
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.5px',
            }}
          >
            {passed ? '출입 가능' : '출입 불가'}
          </div>
        </div>

        {/* 사진 */}
        <div
          style={{
            width: '100%',
            height: 420,
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
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#6b7280',
                fontSize: 18,
              }}
            >
              사진 없음
            </div>
          )}
        </div>

        {/* 하단 정보 */}
        <div
          style={{
            padding: '28px 28px 32px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#111827',
            }}
          >
            {data.name}
          </h1>

          <p
            style={{
              margin: '12px 0 0',
              fontSize: 22,
              color: '#6b7280',
              fontWeight: 500,
            }}
          >
            {data.role || '-'}
          </p>

          <div
            style={{
              marginTop: 28,
              paddingTop: 24,
              borderTop: '1px solid #e5e7eb',
              textAlign: 'left',
            }}
          >
            {/* 회사 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: '#eff6ff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                }}
              >
                🏢
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: '#1f2937',
                  fontWeight: 500,
                }}
              >
                {data.company || '-'}
              </div>
            </div>

            {/* 출입 시간 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: '#eff6ff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                }}
              >
                🕒
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: '#1f2937',
                  fontWeight: 500,
                }}
              >
                현장 출입: {formatDateTime(data.site_entered_at)}
              </div>
            </div>

            {/* 시험 결과 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: passed ? '#ecfdf3' : '#fef3f2',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 24,
                }}
              >
                {passed ? '✅' : '❌'}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: '#1f2937',
                  fontWeight: 500,
                }}
              >
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