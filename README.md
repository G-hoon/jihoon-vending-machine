# 🥤 자판기 시뮬레이터

React + TypeScript로 구현한 자판기 시뮬레이터 프로젝트

## 프로젝트 개요

실제 자판기의 동작 과정을 시뮬레이션하는 웹 애플리케이션입니다. 사용자는 현금 또는 카드로 음료를 구매할 수 있으며, 다양한 예외 상황을 처리합니다.

## 다이어그램

- 플로우 차트는 [FLOWCHART.md](./FLOWCHART.md)
- 다이어그램 차트는 [DIAGRAMS.md](./DIAGRAMS.md)

### 전제조건

#### 결제 수단

- **현금**: 100원, 500원, 1,000원, 5,000원, 10,000원
- **카드**: 즉시 결제

#### 판매 음료

| 음료    | 가격    |
| ------- | ------- |
| 콜라 🥤 | 1,100원 |
| 물 💧   | 600원   |
| 커피 ☕ | 700원   |

---

## 주요 기능

### ✅ 구현된 기능

1. **결제 수단 선택**

   - Tab 방식 토글로 현금/카드 선택
   - 시각적으로 명확한 결제 수단 표시

2. **현금 결제**

   - 다양한 금액권 투입 가능
   - 잔액 유지 (연속 구매 가능)
   - 거스름돈 계산 및 표시

3. **카드 결제**

   - 음료 선택 시 확인 모달 표시
   - 즉시 결제 처리
   - 결제 취소 가능

4. **재고 관리**

   - 실시간 재고 차감
   - 품절 상품 비활성화 및 시각적 표시

5. **예외 처리**

   - 잔액 부족 안내
   - 재고 부족 안내
   - 존재하지 않는 음료 처리

6. **사용자 피드백**
   - 실시간 메시지 표시
   - 음료 배출 애니메이션
   - 출력구 상태 표시

---

## 기술 스택

### Core

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4

### Styling

- **Tailwind CSS** 4.1.17

### State Management

- **React Hooks** (useState)

---

## 프로젝트 구조

```
src/
├── components/              # UI 컴포넌트
│   ├── Display/            # 잔액 및 메시지 표시
│   ├── BeverageSelector/   # 음료 선택 영역
│   ├── BeverageCard/       # 개별 음료 카드
│   ├── PaymentPanel/       # 결제 패널
│   ├── CashButton/         # 현금 투입 버튼
│   ├── OutputTray/         # 출력구
│   ├── CardPaymentModal/   # 카드 결제 모달
│   └── index.ts            # Barrel export
├── hooks/                   # Custom Hooks
│   ├── usePayment.ts       # 결제 관리
│   ├── useBeverageManagement.ts  # 음료 재고 관리
│   ├── useOutputTray.ts    # 출력구 상태 관리
│   ├── useCardPayment.ts   # 카드 결제 모달 관리
│   └── index.ts
├── types/                   # TypeScript 타입 정의
│   └── index.ts
├── constants/               # 상수 정의
│   └── index.ts
├── App.tsx                  # 메인 애플리케이션
└── index.css               # 전역 스타일
```

---

## 설계 및 구현

### 🏗️ 아키텍처 설계

#### 1. 관심사의 분리 (Separation of Concerns)

프로젝트는 4개의 독립적인 Custom Hook으로 관심사를 분리했습니다:

```typescript
// 1. 결제 관리 (usePayment)
const payment = usePayment();
// - 잔액 관리
// - 결제 수단 선택
// - 메시지 표시

// 2. 음료 관리 (useBeverageManagement)
const beverageManagement = useBeverageManagement();
// - 재고 관리
// - 구매 가능 여부 검증
// - 재고 차감

// 3. 출력구 관리 (useOutputTray)
const outputTray = useOutputTray();
// - 음료 배출 상태
// - 출력구 초기화

// 4. 카드 결제 모달 (useCardPayment)
const cardPayment = useCardPayment();
// - 모달 상태 관리
// - 선택 음료 관리
```

#### 2. 컴포넌트 계층 구조

```
App
├── Display (잔액, 메시지)
├── BeverageSelector
│   └── BeverageCard × 3 (콜라, 물, 커피)
├── PaymentPanel
│   ├── 결제 수단 토글
│   └── CashButton × 5 (현금 투입)
└── OutputTray (음료 배출)

Modal Layer
└── CardPaymentModal (카드 결제 확인)
```

### 🔄 주요 플로우

#### 현금 결제 플로우

```
1. 결제 수단 선택: "현금" 탭 클릭
2. 현금 투입: 금액 버튼 클릭
3. 잔액 확인: Display 컴포넌트에 표시
4. 음료 선택: BeverageCard 클릭
5. 유효성 검증: 잔액 확인, 재고 확인
6. 구매 처리: 재고 차감, 잔액 차감
7. 음료 배출: OutputTray에 표시
8. 잔액 유지: 추가 구매 가능
```

#### 카드 결제 플로우

```
1. 결제 수단 선택: "카드" 탭 클릭
2. 안내 메시지 표시: "카드로 결제할 음료를 선택해주세요"
3. 음료 선택: BeverageCard 클릭
4. 유효성 검증: 재고 확인
5. 모달 표시: 음료 정보 + 가격 확인
6. 결제 확인: "결제하기" 버튼 클릭
7. 구매 처리: 재고 차감
8. 음료 배출: OutputTray에 표시
```

### 🛡️ 예외 상황 처리

| 상황               | 처리 방법                                            |
| ------------------ | ---------------------------------------------------- |
| 잔액 부족          | "잔액이 부족합니다. X원이 더 필요합니다" 메시지 표시 |
| 재고 없음          | 카드 비활성화 + "품절" 배지 표시                     |
| 존재하지 않는 음료 | "존재하지 않는 음료입니다" 메시지 표시               |
| 반환할 금액 없음   | "반환할 금액이 없습니다" 메시지 표시                 |
| 카드 결제 취소     | 모달 닫기 + "카드 결제가 취소되었습니다" 메시지      |

### 🎨 UX 개선 사항

#### 1. Tab 방식 결제 수단 선택

- **문제**: 카드 모드 취소 불가, 현재 결제 수단 불명확
- **해결**: iOS/Android 스타일 Tab 토글 구현
- **효과**: 언제든 결제 수단 전환 가능, 시각적 명확성

#### 2. 조건부 UI 표시

- 현금 모드: 현금 투입 버튼 표시
- 카드 모드: 안내 메시지 표시
- 불필요한 UI 숨김으로 집중도 향상

#### 3. 실시간 피드백

- 모든 액션에 대한 즉각적인 메시지
- 애니메이션을 통한 시각적 피드백
- 잔액 및 재고 실시간 업데이트

### 💡 기술적 고민과 해결

#### 1. 상태 관리 전략

**초기 시도: Zustand**

```typescript
// ❌ 문제: 무한 루프 발생
const { balance, message } = useVendingMachineStore((state) => ({
  balance: state.balance,
  message: state.message,
}));
```

**최종 결정: useState + Custom Hooks**

- 이유: 프로젝트 규모에 적합, prop drilling 없음
- 장점: 코드 단순화, 디버깅 용이
- 원칙: YAGNI (You Aren't Gonna Need It)

#### 2. Hook 설계 철학

**Option 1 거부: Super Hook (useVendingMachine)**

```typescript
// ❌ 모든 로직을 하나의 Hook에
const vm = useVendingMachine();
```

- 문제: 단일 책임 원칙 위배, 테스트 어려움

**Option 2 채택: 관심사별 분리**

```typescript
// ✅ 각 Hook이 명확한 책임
const payment = usePayment();
const beverageManagement = useBeverageManagement();
const outputTray = useOutputTray();
const cardPayment = useCardPayment();
```

- 장점: 재사용성, 테스트 용이성, 확장성

#### 3. 타입 안정성

```typescript
// 엄격한 타입 정의
export type BeverageId = "cola" | "water" | "coffee";
export type CashUnit = 100 | 500 | 1000 | 5000 | 10000;
export type PaymentMethod = "cash" | "card";

// 타입 가드를 통한 안전성
interface Beverage {
  id: BeverageId;
  name: string;
  price: number;
  stock: number;
  emoji: string;
}
```

---

## 실행 방법

### 사전 요구사항

- **Node.js**: 20.x 이상
- **npm**: 10.x 이상

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 열기
# http://localhost:5173 접속
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 사용 가이드

### 현금으로 구매하기

1. **결제 수단 선택**: "💵 현금" 탭 선택 (기본값)
2. **현금 투입**: 원하는 금액 버튼 클릭 (여러 번 가능)
3. **음료 선택**: 원하는 음료 클릭
4. **구매 완료**: 출력구에서 음료 확인
5. **추가 구매**: 잔액이 남아있으면 계속 구매 가능

### 카드로 구매하기

1. **결제 수단 선택**: "💳 카드" 탭 클릭
2. **음료 선택**: 원하는 음료 클릭
3. **결제 확인**: 모달창에서 상품 정보 확인
4. **결제하기**: "결제하기" 버튼 클릭
5. **구매 완료**: 출력구에서 음료 확인

### 취소/반환

- **현금 반환**: "↩️ 취소 / 반환" 버튼 클릭
- **카드 결제 취소**: 모달에서 "취소" 버튼 클릭

---

## AI 활용

### Claude AI 활용 내역

프로젝트의 일부분에서 Claude AI를 보조 도구로 활용했습니다.

#### 활용 범위

**1. Tailwind CSS 스타일링**

- 컴포넌트 레이아웃 및 반응형 디자인 구현 시 참고
- 애니메이션 효과 (모달 scale-in, 출력구 bounce 등)

**2. TypeScript 타입 정의 보완**

- 복잡한 타입 정의 시 문법 확인
- 제네릭 타입 사용법 참고

**3. README 문서 작성 지원**

- 마크다운 구조 및 형식 참고
- 기술 문서 작성 베스트 프랙티스 확인
- 플로우 차트 및 다이어그램 작성

#### 자체 구현 부분

- ✅ 전체 아키텍처 설계 및 Hook 구조 설계
- ✅ 비즈니스 로직 구현 (결제, 재고 관리, 구매 플로우)
- ✅ UX 개선 방향 설정 (Tab 토글 방식 등)
- ✅ 예외 처리 및 엣지 케이스 처리

---

## 향후 개선 방향

### 기능 추가

- [ ] 거스름돈 재고 관리
- [ ] 영수증 출력 기능

### 기술 개선

- [ ] 단위 테스트 추가 (Jest, React Testing Library)
- [ ] E2E 테스트 (Playwright)
- [ ] 접근성 개선 (ARIA, 키보드 네비게이션)
- [ ] 성능 최적화 (React.memo, useMemo)

### UX 개선

- [ ] 애니메이션 강화
- [ ] 반응형 개선

---

## 라이센스

MIT License

---

## 개발자

- **개발 기간**: 2024년 12월
- **주요 기술**: React, TypeScript, Tailwind CSS, Custom Hooks

---
