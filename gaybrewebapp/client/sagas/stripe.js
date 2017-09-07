import { fork, put, call, take } from 'redux-saga/effects';
import { USER_REGISTRED_SUCCESS } from '../actions/user';
import { STRIPE_POPUP, HIDE_POPUP } from '../actions/popup';
import { OPEN_STRIPE, STRIPE_TOKEN_RECEIVED, stripeTokenReceived } from '../actions/stripe';
import { updateStripeToken } from '../api/stripe';
import { day } from '../helpers/times';
import store from '../store';

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getStripe = () => {
  let Stripe;
  return () => {
    if (Stripe) {
      return Stripe; //eslint-disable-next-line
    } else {
      return StripeCheckout.configure({
        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
        image: '/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token(stripeToken) {
          store.dispatch(stripeTokenReceived(stripeToken));
        },
        closed() {
          store.dispatch({ type: HIDE_POPUP });
        },
      });
    }
  };
};

const getStripePopup = getStripe();

export function* openStripe(getState) {
  while (true) {
    yield take([USER_REGISTRED_SUCCESS, OPEN_STRIPE]);
    const { plans } = getState();
    const stripePopup = getStripePopup();
    if (plans.id !== undefined) {
      yield put({ type: STRIPE_POPUP });
      yield call(stripePopup.open, {
        name: plans.name,
        description: plans.statement_description,
        amount: plans.price * 100,
      });
    } else {
      yield put({ type: HIDE_POPUP });
    }
  }
}

export function* handleStripeTokenReceived() {
  while (true) {
    const { data } = yield take(STRIPE_TOKEN_RECEIVED);
    const { created, id } = data;
    const stripetoken = `${id}`
    const paiddate = `${created * 1000}`;
    const duedate = `${new Date().getTime() + day * 31}`;
    yield call(updateStripeToken, { paiddate, duedate, stripetoken });
  }
}

export function* stripeInit(getState) {
  yield* [
    fork(openStripe, getState),
    fork(handleStripeTokenReceived, getState),
  ];
}
