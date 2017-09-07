export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';
export const LOADING_POPUP = 'LOADING_POPUP';
export const STRIPE_POPUP = 'STRIPE_POPUP';
export const showPopup = (popupType) => ({ type: SHOW_POPUP, data: { popupType } });
export const hidePopup = () => ({ type: HIDE_POPUP });
export const loadingPopup = () => ({ type: LOADING_POPUP });
export const stripePopup = () => ({ type: STRIPE_POPUP });
