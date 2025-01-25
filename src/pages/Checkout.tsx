// Checkout.tsx

import { useEffect, useRef } from "react"
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk"
// import { ANONYMOUS } from "@tosspayments/payment-widget-sdk"
import { nanoid } from "nanoid"
import "../App.css"

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm" // 공개된 테스트 키
const customerKey = "YbX2HuSlsC9uVJW6NMRMj"

export default function App() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const price = 50_000

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey)

      paymentWidget.renderPaymentMethods("#payment-widget", price)

      paymentWidgetRef.current = paymentWidget
    })()
  }, [])

  return (
    <div className="App">
      <h1>주문서</h1>
      <div id="payment-widget" />
      <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current

            try {
              await paymentWidget?.requestPayment({
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
