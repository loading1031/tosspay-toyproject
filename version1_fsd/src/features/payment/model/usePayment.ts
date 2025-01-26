// 결제 요청 로직 전담: handlePayment로 결제 요청을 처리합니다.

import { useRef } from "react"
import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk"
import { nanoid } from "nanoid"

export function usePayment() {

    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)

    // `paymentWidgetRef.current`를 업데이트하는 함수
    const setPaymentWidgetRef = (ref: PaymentWidgetInstance | null) => {
        paymentWidgetRef.current = ref
    }

    const handlePayment = async () => {
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
            console.error(err)
        }
    }

    return { handlePayment, setPaymentWidgetRef }
}
