import { useEffect, useRef } from "react"
import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk"
import { initPaymentWidget } from "../lib/tossClient"

interface PaymentWidgetProps {
    price: number
    setPaymentWidgetRef: (ref: PaymentWidgetInstance | null) => void
  }

export function PaymentWidget({ price, setPaymentWidgetRef }: PaymentWidgetProps) {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)

  useEffect(() => {
    (async () => {
      const paymentWidget = await initPaymentWidget()
      paymentWidget.renderPaymentMethods("#payment-widget", price)
      paymentWidgetRef.current = paymentWidget
      setPaymentWidgetRef(paymentWidget) // 부모에 전달
    })()
  }, [price, setPaymentWidgetRef])

  return <div id="payment-widget" />
}