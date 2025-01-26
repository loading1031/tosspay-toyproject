## FSD 리팩토링
> FSD 구조를 연습하기위해 토스페이 토이프로젝트를 FSD로 리팩토링했다.
1. 관심사 분리 : 결제 and 쿠폰
2. 파일 경로 : 
    - 결제/할인은 행위이므로 features로 이동 
    - 금액은 entities가 좋으나 하드 코딩이므로 진행 x
### 후기 :   
연습으로 FSD로 리팩토링했으나 실제 서비스에서   
결제 위젯은 **페이지 단위**로 라우팅되는 경우가 많으므로   
이렇게 `features`까지 쓰는 것은 비효율적임. 

`pages/checkout/ui`, `pages/checkout/model`, `pages/checkout/lib` 
정도로 리팩토링하는게 FSD에서 사용할만 할거 같음

### 현재 구조
```
src/
  main.tsx             // app 폴더 대체 (vite는 main이 루트에 있어야 함)
  features/
    coupon/             // 쿠폰 관련 기능
      model/
        useCoupon.ts    // 쿠폰 상태 관리 및 로직
    payment/            // 결제 관련 기능
      model/
        usePayment.ts   // 결제 로직 및 상태 관리
      ui/
        PaymentWidget.tsx // 결제 위젯 컴포넌트
      lib/
        tossClient.ts   // Toss SDK 초기화 및 유틸리티 함수
  pages/
    checkout/           // Checkout 페이지
      ui/
        Checkout.tsx    // Checkout 페이지 컴포넌트
  shared/
    constants/          // 공통 상수 관리
      paymentKeys.ts    // Toss 결제 관련 키 상수
```