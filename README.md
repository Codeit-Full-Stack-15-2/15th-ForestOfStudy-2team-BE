# 팀 INT

### 팀 페이지

https://app.notion.com/p/e3c8809438758323bf53011c508f434e?v=1c08809438758257856408805b151014&source=copy_link

### 팀원 구성

곽소철 [깃허브](https://github.com/thcjfd)

윤욱진 [깃허브](https://github.com/Guts91-creator)

김재영 [깃허브](https://github.com/yangpahub)

황영환 [깃허브](개인 Github 링크)

김다찬 [깃허브](개인 Github 링크)

### 프로젝트 소개

**공부의 숲**은 개인의 공부 습관과 집중 시간을 기록하고, 다른 사람의 스터디를 둘러보며 함께 학습할 수 있는 **공부 관리 및 커뮤니티 서비스**입니다.

사용자는 자신만의 스터디를 생성하고 매일 반복할 습관을 관리할 수 있으며, 집중 타이머를 통해 공부 시간을 기록하고 포인트를 획득할 수 있습니다. 또한 다른 사용자의 스터디를 검색·조회하고 이모지로 응원할 수 있습니다.
<p>프로젝트 기간: 2026.09.01 ~ 2024.09.17</p>

### 기술 스택

| 구분                | 기술                            |
| ------------------- | ------------------------------- |
| **Language**        | JavaScript                      |
| **Backend**         | Node.js, Express.js, Prisma ORM |
| **Database**        | PostgreSQL, Supabase            |
| **Validation**      | Zod                             |
| **API**             | REST API                        |
| **Version Control** | Git, GitHub                     |
| **Code Quality**    | ESLint, Prettier                |
| **API / DB Test**   | Swagger, DBeaver                |
| **Communication**   | Discord, Notion                 |

### 팀원별 구현 기능 상세

### 곽소철

포인트 조회/수정/인증 API

### 윤욱진

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

#### **홈 페이지 UI 및 반응형 레이아웃**

- 데스크톱, 태블릿, 모바일 환경에 대응하는 반응형 홈 페이지 구현
- 재사용 가능한 `StudyCard` 컴포넌트 구현
- 스터디 제목, 닉네임, 포인트, 진행 일수, 소개, 배경 및 이모지 반응 표시
- 스터디 소개 한 줄 말줄임 및 이모지 영역 간격 개선
- 정렬 드롭다운 외부 클릭 시 메뉴가 닫히도록 UX 개선

#### **스터디 목록 조회**

- Fetch API를 이용한 스터디 목록 조회 API 연동
- `title`, `nickname`을 기준으로 한 검색 기능 구현
- 300ms 디바운스를 적용하여 검색 API 요청 최적화
- 최신순, 오래된순, 많은 포인트순, 작은 포인트순 정렬 구현
- 페이지네이션 기반 `더보기` 기능 구현
- 영문 검색어 대소문자를 구분하지 않는 검색 기능 구현

#### **최근 조회한 스터디**

- LocalStorage를 활용하여 최근 조회 스터디 ID 저장
- 최근 조회한 스터디를 최대 3개까지 최신순으로 관리
- 상세 조회 API와 연동하여 실제 스터디 정보 표시
- 새로고침 이후에도 최근 조회 기록 유지

#### **API 데이터 및 상태 처리**

- 스터디 목록 API와 상세 조회 API의 서로 다른 이모지 응답 구조를 UI에서 사용할 수 있는 형태로 변환
- API 요청 상태에 따른 Loading / Error / Empty UI 구현
- 이모지 반응 개수를 기준으로 상위 3개의 반응만 스터디 카드에 표시
- 프론트엔드와 백엔드 통합 테스트 및 API 응답 검증

#### **백엔드 스터디 목록 조회**

- Prisma를 활용한 검색, 정렬 및 페이지네이션 구현
- 스터디별 이모지 반응 데이터 집계 및 목록 조회 응답에 포함
- `contains`, `mode: 'insensitive'`를 활용한 영문 대소문자 무시 검색 구현

### 황영환

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **마이 페이지**
  - fetch(GET)를 사용하여 수강생 개인별 시간 정보 표시
  - 반응형 레이아웃 구현
- **공용 Button 컴포넌트**
  - 공용으로 사용할 Button 컴포넌트 구현

### 김재영

### 오늘의 습관 UI 구현

![오늘의 습관](이미지_경로/habit_main.png)
![오늘의 습관](이미지_경로/habit_main.png)
![오늘의 습관](이미지_경로/habit_main.png)

- **체크 및 목록 편집 모드 분리**
  - 체크 모드: 오늘 달성할 습관 완료/취소 토글 및 UI 반응 연동
  - 목록 편집 모드: 습관 추가/수정/삭제 모달 연동 및 인라인 편집 지원
- **한글 입력 UX 개선 (IME 이벤트 제어)**
  - 한글 조합 과정(`isComposing`) 감지를 통해 엔터 키 입력 시 발생하던 중복 이벤트 완벽 차단
- **데이터 이탈 방지 모달 및 알림**
  - `useBlocker` 및 `beforeunload` 이벤트를 활용해 저장되지 않은 변경사항(`isDirty`) 존재 시 이탈 안내 경고 출력
- **API 상태별 UI 대응 (Empty / Active)**
  - 등록된 습관이 없을 때 안내 문구를 노출하는 Empty UI 처리 및 데이터 로딩/에러 상태별 사용자 경험 최적화

---

### API 연동 및 클라이언트 데이터 상태 관리

- **Optimistic UI (낙관적 업데이트) 적용**
  - 습관 체크 시 UI 상태를 선 반영한 후 API 호출, 실패 시 이전 상태로 자동 롤백(Rollback)
- **임시 상태 기반 일괄 처리 (Batch Processing)**
  - 습관 생성(`isTemp`), 수정(`isUpdated`), 삭제(`isDeleted`) 상태를 클라이언트 메모리에서 관리
  - [완료] 버튼 클릭 시점에 묶어서 API를 일괄 호출하여 불필요한 네트워크 요청 최소화
- **Day.js & ISO 기준 TimeZone 동기화**
  - 로컬 날짜 포맷(`YYYY-MM-DD`) 단일화로 KST/UTC 시차에 따른 날짜 어긋남 방지
- **API 응답 데이터 정규화 (Normalization)**
  - 백엔드 응답 데이터 구조에 맞춰 당일 달성 여부를 불리언(`isComplete`) 상태 값으로 파싱해 컴포넌트에 주입

### 김다찬

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

- **관리자 페이지**
  - fetch(GET)를 사용하여 학생별 시간 정보 표시 및 수강생 접속 현황 정보 표시
  - 반응형 레이아웃 구현
- **마이 페이지**
  - fetch(PATCH, DELETE)를 사용하여 수강생의 개인정보 수정 및 탈퇴 기능 구현
- **공용 Modal 컴포넌트**
  - 공용으로 사용할 Modal 컴포넌트 구현

### 파일 구조

```
15th-ForestOfStudy-2team-BE/
├── env/
├── prisma/
│   ├── base.prisma
│   ├── study.prisma
│   ├── habit.prisma
│   └── migrations/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── db/
│   ├── errors/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── swagger/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── server.js
└── package.json
```

### 구현 홈페이지

https://forest-of-study-six.vercel.app/

### 프로젝트 회고록

https://app.notion.com/p/2-9fe8809438758287833c013845c2cb83?source=copy_link
