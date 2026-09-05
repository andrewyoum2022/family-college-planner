create extension if not exists "pgcrypto";

create table if not exists family_members (
  email text primary key,
  display_name text,
  role text default 'member',
  created_at timestamptz default now()
);

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  physics_rank integer unique not null,
  name text not null,
  city text,
  state text,
  school_type text,
  status text default 'Not decided',
  application_types text,
  admissions_deadline date,
  tuition_2026 numeric,
  room_board_2026 numeric,
  physics_notes text,
  philosophy_notes text,
  family_notes text,
  source_url text,
  verified_at date,
  updated_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default 'General',
  due_date date,
  status text default 'todo',
  owner text,
  notes text,
  updated_at timestamptz default now()
);

create table if not exists deadlines (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  category text default 'General',
  notes text,
  source_url text,
  updated_at timestamptz default now()
);

alter table family_members enable row level security;
alter table schools enable row level security;
alter table tasks enable row level security;
alter table deadlines enable row level security;

create or replace function is_family_member()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from family_members
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email',''))
  );
$$;

drop policy if exists "family can view membership" on family_members;
create policy "family can view membership" on family_members
for select to authenticated using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "family schools all" on schools;
create policy "family schools all" on schools for all to authenticated
using (is_family_member()) with check (is_family_member());

drop policy if exists "family tasks all" on tasks;
create policy "family tasks all" on tasks for all to authenticated
using (is_family_member()) with check (is_family_member());

drop policy if exists "family deadlines all" on deadlines;
create policy "family deadlines all" on deadlines for all to authenticated
using (is_family_member()) with check (is_family_member());

insert into schools (physics_rank,name,city,state,school_type,status)
values
(1,'California Institute of Technology','Pasadena','CA','Research','Not decided'),
(2,'Massachusetts Institute of Technology','Cambridge','MA','Research','Not decided'),
(3,'Harvard University','Cambridge','MA','Research','Not decided'),
(4,'Yale University','New Haven','CT','Research','Not decided'),
(5,'Princeton University','Princeton','NJ','Research','Not decided'),
(6,'Stanford University','Stanford','CA','Research','Not decided'),
(7,'University of Chicago','Chicago','IL','Research','Not decided'),
(8,'Harvey Mudd College','Claremont','CA','Research','Not decided'),
(9,'University of Pennsylvania','Philadelphia','PA','Research','Not decided'),
(10,'Rice University','Houston','TX','Research','Not decided'),
(11,'Cornell University','Ithaca','NY','Research','Not decided'),
(12,'Columbia University','New York','NY','Research','Not decided'),
(13,'University of California, Los Angeles','Los Angeles','CA','Research','Not decided'),
(14,'University of Texas at Austin','Austin','TX','Research','Not decided'),
(15,'Carnegie Mellon University','Pittsburgh','PA','Research','Not decided'),
(16,'Brown University','Providence','RI','Research','Not decided'),
(17,'University of California, Berkeley','Berkeley','CA','Research','Not decided'),
(18,'Dartmouth College','Hanover','NH','Research','Not decided'),
(19,'University of Michigan–Ann Arbor','Ann Arbor','MI','Research','Not decided'),
(20,'Georgia Institute of Technology','Atlanta','GA','Research','Not decided'),
(21,'Pomona College','Claremont','CA','Research','Not decided'),
(22,'Johns Hopkins University','Baltimore','MD','Research','Not decided'),
(23,'Duke University','Durham','NC','Research','Not decided'),
(24,'University of Notre Dame','Notre Dame','IN','Research','Not decided'),
(25,'Washington University in St. Louis','St. Louis','MO','Research','Not decided'),
(26,'University of Illinois Urbana-Champaign','Champaign','IL','Research','Not decided'),
(27,'University of Virginia','Charlottesville','VA','Research','Not decided'),
(28,'New Mexico Institute of Mining and Technology','Socorro','NM','Research','Not decided'),
(29,'Amherst College','Amherst','MA','Research','Not decided'),
(30,'University of California, Santa Barbara','Santa Barbara','CA','Research','Not decided'),
(31,'University of Washington','Seattle','WA','Research','Not decided'),
(32,'University of Florida','Gainesville','FL','Research','Not decided'),
(33,'Vanderbilt University','Nashville','TN','Research','Not decided'),
(34,'Bowdoin College','Brunswick','ME','Research','Not decided'),
(35,'Northwestern University','Evanston','IL','Research','Not decided'),
(36,'University of Rochester','Rochester','NY','Research','Not decided'),
(37,'United States Naval Academy','Annapolis','MD','Research','Not decided'),
(38,'New York University','New York','NY','Research','Not decided'),
(39,'Michigan State University','East Lansing','MI','Research','Not decided'),
(40,'Haverford College','Haverford','PA','Research','Not decided'),
(41,'University of Wisconsin–Madison','Madison','WI','Research','Not decided'),
(42,'Wesleyan University','Middletown','CT','Research','Not decided'),
(43,'University of California, San Diego','La Jolla','CA','Research','Not decided'),
(44,'Swarthmore College','Swarthmore','PA','Research','Not decided'),
(45,'Georgetown University','Washington','DC','Research','Not decided'),
(46,'Williams College','Williamstown','MA','Research','Not decided'),
(47,'Washington and Lee University','Lexington','VA','Research','Not decided'),
(48,'Emory University','Atlanta','GA','Research','Not decided'),
(49,'Boston University','Boston','MA','Research','Not decided'),
(50,'William & Mary','Williamsburg','VA','Research','Not decided')
on conflict (physics_rank) do update set
  name=excluded.name, city=excluded.city, state=excluded.state;

insert into deadlines (date,title,category,notes,source_url) values
('2026-07-31','Common App 2026–27 시즌 오픈','Application','Common App가 2026–27 지원 시즌을 시작. 프로필·활동·에세이 기본 정보 점검.','https://www.commonapp.org/'),
('2026-08-01','UC Fall 2027 지원서 작성 시작','UC','UC Fall 2027 application opens.','https://admission.universityofcalifornia.edu/'),
('2026-10-01','2027–28 FAFSA 준비/제출 시작 목표','Financial Aid','Class of 2027은 2027–28 FAFSA 사용. FSA ID와 세금/자산 자료를 미리 준비.','https://studentaid.gov/'),
('2026-10-01','CSS Profile 시작','Financial Aid','CSS Profile 사용 대학의 학교별 priority deadline 확인.','https://cssprofile.collegeboard.org/'),
('2026-10-31','College list 최종 점검 목표','Planning','Reach / Target / Likely 균형과 Physics/Philosophy 조합 재검토.','https://bigfuture.collegeboard.org/'),
('2026-11-01','많은 ED/EA 대학 마감 집중 구간','Application','실제 날짜는 학교별 공식 페이지를 우선 확인.','https://www.commonapp.org/'),
('2026-11-30','UC Fall 2027 제출 마감','UC','UC 지원서 최종 제출 마감.','https://admission.universityofcalifornia.edu/'),
('2027-01-01','RD 마감 집중 구간 시작','Application','많은 사립대 RD가 1월 초. 학교별 날짜 확인 필수.','https://www.commonapp.org/'),
('2027-03-02','California 재정보조 주요 마감 체크','Financial Aid','FAFSA/California Dream Act/Cal Grant 관련 UC 안내 기준 주요 날짜.','https://admission.universityofcalifornia.edu/'),
('2027-05-01','대학 결정/등록 시기','Decision','합격·재정보조 패키지를 비교하고 최종 등록 결정을 준비.','https://www.commonapp.org/')
on conflict do nothing;

insert into tasks (title,category,due_date,status,owner,notes) values
('Common App 기본 프로필·가족정보·학력 입력','Common App','2026-09-12','todo','Student','이름/주소/학교/가족정보 정확성 확인'),
('활동 리스트 10개 정리 및 설명 문구 다듬기','Common App','2026-09-20','todo','Student','Kendo, 봉사, 연구/수업 등 영향 중심'),
('Personal Statement 최종 주제와 버전 관리','Essay','2026-09-25','todo','Student','Common App essay'),
('Physics 지원 대학 50개를 Reach/Target/Likely로 분류','College List','2026-09-18','todo','Family','입학 가능성뿐 아니라 비용과 fit 포함'),
('Philosophy 복수전공/부전공 가능 여부 Top 후보 조사','Academic Fit','2026-09-25','todo','Family','각 대학 규정/학점 부담 확인'),
('부모/학생 FSA ID 준비','FAFSA','2026-09-20','todo','Parents','FAFSA 개시 전에 계정 문제 해결'),
('FAFSA용 세금·W-2·자산 자료 모으기','FAFSA','2026-09-28','todo','Parents','요구되는 해당 연도 자료 확인'),
('CSS Profile 필요 대학 표시','Financial Aid','2026-09-25','todo','Parents','각 대학 priority deadline 함께 기록'),
('추천서 요청 상태 확인','Recommendations','2026-09-15','todo','Student','교사/카운슬러 요청 및 학교 절차 확인'),
('학교별 Supplemental Essay 목록 작성','Essay','2026-09-22','todo','Student','중복 주제 그룹화'),
('ED/EA/REA 전략 가족 결정','Strategy','2026-09-30','todo','Family','binding 여부와 재정보조 영향 포함'),
('UC PIQ 초안 및 활동/수상 입력','UC','2026-10-15','todo','Student','4개 PIQ와 UC activity list'),
('공식 성적표/학교 리포트 제출 절차 TPHS에 확인','School','2026-09-18','todo','Student','Counselor/Naviance 절차 확인'),
('대학별 2026–27 학비·기숙사비 공식 출처 검증','Cost','2026-10-10','todo','Parents','앱의 학교별 verified date/source URL 갱신'),
('Net Price Calculator 상위 후보 실행','Cost','2026-10-20','todo','Parents','예상 실부담 비교')
on conflict do nothing;

alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table schools;
alter publication supabase_realtime add table deadlines;

-- IMPORTANT: 아래 3개의 이메일은 Supabase SQL Editor에서 실제 값으로 직접 추가하세요.
-- 개인정보를 GitHub 저장소에 하드코딩하지 않기 위해 소스에는 포함하지 않습니다.
-- insert into family_members(email, display_name, role) values
-- ('YOUR_EMAIL_1','Parent 1','admin'),
-- ('YOUR_EMAIL_2','Parent 2','member'),
-- ('YOUR_EMAIL_3','Student','member');
