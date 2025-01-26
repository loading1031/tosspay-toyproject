// Checkout 페이지 컴포넌트

import { useCoupon } from "../../../features/coupon/model/useCoupon"
import { usePayment } from "../../../features/payment/model/usePayment"
import { PaymentWidget } from "../../../features/payment/ui/PaymentWidget"

export default function Checkout() {
  const basePrice = 45_000
  const { isCouponApplied, toggleCoupon, getDiscount } = useCoupon()
  const price = getDiscount(basePrice)
  const { handlePayment, setPaymentWidgetRef } = usePayment()
  

  return (
    <div className="Checkout">
      <h1>주문서</h1>
      <PaymentWidget price={price} setPaymentWidgetRef={setPaymentWidgetRef} />
      <div>
        <input
          type="checkbox"
          checked={isCouponApplied}
          onChange={toggleCoupon}
        />
        <label>5,000원 할인 쿠폰 적용</label>
      </div>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  )
}
