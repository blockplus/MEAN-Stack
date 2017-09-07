export const STRIPE_TOKEN_RECEIVED = 'STRIPE_TOKEN_RECEIVED';
export const STRIPE_CLOSED = 'STRIPE_CLOSED';
export const OPEN_STRIPE = 'OPEN_STRIPE';

export const stripeOpenPaymentDialog = () => ({ type: OPEN_STRIPE });
export const stripeTokenReceived = (data) => ({ type: STRIPE_TOKEN_RECEIVED, data });
