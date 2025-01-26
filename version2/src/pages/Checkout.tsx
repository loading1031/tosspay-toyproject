// Checkout.tsx

import { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid"

// 모듈 임포트 연동방식
import { 
  loadTossPayments, 
  ANONYMOUS,
  TossPaymentsSDK,
  WidgetPaymentMethodWidget,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk"

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj"

export default function App() {
  const paymentWidgetRef = useRef<TossPaymentsSDK | null>(null) // TossPaymentsWidgets로 변경
  const paymentMethodWidgetRef = useRef<WidgetPaymentMethodWidget | null>(null); // Promise 해제 후 저장
  const widgetRef = useRef<TossPaymentsWidgets | null>(null);
  const [price, setPrice] = useState(45_000) // 큰 숫자에는 '_'로 가독성을 높임

  const updateWidgets = async (widgets: TossPaymentsWidgets, price: number) => {
    try {
      console.log("Setting amount with price:", price);
      await widgets.setAmount({
        currency: "KRW",
        value: price,
      });
      console.log("Successfully set amount");
  
      console.log("Rendering payment methods");
      const newPaymentMethodWidget = await widgets.renderPaymentMethods({
        selector: "#payment-method",
      });
      console.log("Successfully rendered payment methods");
  
      return newPaymentMethodWidget;
    } catch (error) {
      console.error("Error in updateWidgets:", error);
      throw error; // 에러를 다시 던져 상위에서 처리
    }
  };
  
  
  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트 상태인지 확인하는 플래그
  
    (async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = await tossPayments.widgets({ customerKey: ANONYMOUS });
  
        if (isMounted) { // 마운트 상태일 때만 실행
          paymentMethodWidgetRef.current = await updateWidgets(widgets, price);
          paymentWidgetRef.current = tossPayments;
          widgetRef.current = widgets;
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    })();
  
    return () => {
      isMounted = false; // 컴포넌트가 언마운트되면 플래그 해제
    };
  }, []);
  

  useEffect(() => {
    (async () => {
      const widgets = widgetRef.current;
      if ( widgets == null) {
        return
      } 

      const paymentMethodWidget = paymentMethodWidgetRef.current;
      if ( paymentMethodWidget != null) {
        try {
          await paymentMethodWidget.destroy();
          paymentMethodWidgetRef.current = null;
        } catch (error) {
          console.error("Failed to destroy the payment widget:", error);
        }
      }

      // 새 위젯 참조 저장
      paymentMethodWidgetRef.current = await updateWidgets(widgets, price);
    })()
  }, [price])

  return (
    <div className="App">
      <h1>주문서</h1>
      <div id="payment-method" />
      <div>
        <input
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000)            
          }}
        />
        <label>5,000원 할인 쿠폰 적용</label>
      </div>
      <button
          onClick={async () => {
            const widgets = widgetRef.current;

            try {
              await widgets?.requestPayment({
                orderId: nanoid(),
                orderName: "토스 티셔츠 외 2건",
                customerName: "김토스",
                customerEmail: "customer123@gmail.com",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
            })
            } catch (err) {
                console.log(err)
            }
        }}
      >
        결제하기
      </button>
    </div>
  )
}
