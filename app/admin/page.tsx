'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false)
  const [checked, setChecked] = useState(false)

  const [form, setForm] = useState({
    name: '',
    slug: '',
    company: '',
    role: '',
    photo_url: '',
    site_entered_at: '',
    passed_test: true,
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pw = params.get('pw')

    if (pw === '1236') {
      setAuthorized(true)
    } else {
      setAuthorized(false)
    }

    setChecked(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(result.error || '등록 실패')
        setLoading(false)
        return
      }

      setMessage('등록 완료')
      setForm({
        name: '',
        slug: '',
        company: '',
        role: '',
        photo_url: '',
        site_entered_at: '',
        passed_test: true,
      })
    } catch {
      setMessage('오류가 발생했습니다.')
    }

    setLoading(false)
  }

  if (!checked) {
    return null
  }

  if (!authorized) {
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
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: '#111827',
            }}
          >
            접근 권한 없음
          </h1>

          <p
            style={{
              marginTop: 12,
              color: '#6b7280',
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            관리자 페이지에 접속하려면 올바른 비밀번호가 필요합니다.
          </p>

          <p
            style={{
              marginTop: 16,
              color: '#111827',
              fontSize: 14,
            }}
          >
            접속 예시: <br />
            <strong>/admin?pw=1111</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: '40px 16px',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
          관리자 페이지
        </h1>
        <p style={{ marginTop: 8, color: '#6b7280' }}>
          새 인원 정보를 등록합니다.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="이름"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Input
            label="slug"
            value={form.slug}
            onChange={(v) => setForm({ ...form, slug: v })}
          />

          <Input
            label="회사"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
          />

          <Input
            label="역할"
            value={form.role}
            onChange={(v) => setForm({ ...form, role: v })}
          />

          <Input
            label="사진 URL"
            value={form.photo_url}
            onChange={(v) => setForm({ ...form, photo_url: v })}
          />

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              현장 출입 시간
            </label>
            <input
              type="datetime-local"
              value={form.site_entered_at}
              onChange={(e) =>
                setForm({ ...form, site_entered_at: e.target.value })
              }
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 10,
                fontSize: 15,
                boxSizing: 'border-box',
                background: '#fff',
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              시험 결과
            </label>
            <select
              value={form.passed_test ? 'true' : 'false'}
              onChange={(e) =>
                setForm({ ...form, passed_test: e.target.value === 'true' })
              }
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 10,
                fontSize: 15,
                background: '#fff',
              }}
            >
              <option value="true">합격</option>
              <option value="false">불합격</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 16px',
              border: 'none',
              borderRadius: 12,
              background: loading ? '#9ca3af' : '#111827',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 16,
              color: message.includes('완료') ? '#16a34a' : '#dc2626',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 14px',
          border: '1px solid #d1d5db',
          borderRadius: 10,
          fontSize: 15,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}