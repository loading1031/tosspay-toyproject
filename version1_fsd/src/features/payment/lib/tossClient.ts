// Toss SDK 초기화 및 관련 함수 분리

import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk"
import { TOSS_PAYMENT_KEYS } from '../../../shared/constants/paymentKeys'

export async function initPaymentWidget() {
    const { clientKey, customerKey } = TOSS_PAYMENT_KEYS
    return await loadPaymentWidget(clientKey, customerKey)
}
