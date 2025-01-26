import { useState } from "react"

export function useCoupon() {
  const [isCouponApplied, setIsCouponApplied] = useState(false)

  const toggleCoupon = () => {
    setIsCouponApplied((prev) => !prev)
  }

  const getDiscount = (basePrice: number) => {
    return isCouponApplied ? basePrice - 5_000 : basePrice
  }

  return { isCouponApplied, toggleCoupon, getDiscount }
}
