# Family College Planner

Torrey Pines High School Senior (Class of 2027)의 대학 지원을 가족이 함께 관리하기 위한 비공개 웹앱입니다.

## 핵심 기능
- Google OAuth 로그인
- Supabase Row Level Security로 가족 이메일 allowlist만 접근
- 가족이 수정하면 Supabase Realtime으로 즉시 반영
- Physics 후보 대학 Top 50
- 학교별 위치 / 지원 방식 / 마감일 / Physics 메모 / Philosophy 병행 메모
- 2026–27 학비 및 room & board 입력 + 검증일 + 공식 출처 URL
- 가족 공동 할 일
- 입시 타임라인
- EA / ED / REA / RD / FAFSA / CSS Profile / UC 설명 페이지

## 보안 설계
가족 이메일은 GitHub 코드에 하드코딩하지 않습니다.
`family_members` DB 테이블과 RLS가 실제 접근 권한을 통제합니다.

## 설치
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase 설정
1. Supabase 새 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 전체 실행
3. Authentication > Providers > Google 활성화
4. Google Cloud OAuth Client ID/Secret 연결
5. Authentication > URL Configuration에 배포 URL과 `/auth/callback` 추가
6. `family_members`에 가족 이메일 3개 추가
7. Project Settings > API에서 URL/Anon Key를 `.env.local` 및 Vercel 환경변수에 입력

## 배포 추천
GitHub Public repository + Vercel.
코드는 GitHub에 저장하고, 실제 가족 데이터와 로그인 허용 목록은 Supabase에 저장합니다.
Public 저장소에는 비밀키와 가족 이메일을 커밋하지 않습니다.

## 학교 순위 기준
초기 50개 후보는 Niche의 Physics 학부 랭킹을 기반으로 구성했습니다.
입시 결정을 순위 하나만으로 하지 말고 Physics 연구환경, Philosophy 병행 가능성, 비용, 위치, 학부 경험을 함께 비교하세요.

## 비용/마감일 데이터
매년 바뀌므로 앱에서 `verified_at`와 `source_url`을 함께 저장합니다.
초기 스키마는 2026–27 값을 넣을 수 있도록 준비되어 있으며, 공식 대학 페이지 기준으로 검증 후 입력하는 것을 전제로 합니다.

<!-- deployment trigger: environment variables configured -->
