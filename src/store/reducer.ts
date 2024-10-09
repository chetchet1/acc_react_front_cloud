// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';
import budgetReducer from './redux-saga/reducer/budget/budgetReducer';
import detailTrialReducer from './slices/detailTrial';
import budgetStatusReducer from './slices/budget/budgetStatus';
import slipReducer from './slices/slip';
import baseReducer from './slices/base';
import postingReducer from './slices/posting';
import operateReducer from './redux-saga/reducer/operate/operateReducer';
import settlementReducer from './redux-saga/reducer/settlement/settlementReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'berry-'
    },
    cartReducer
  ),
  kanban: kanbanReducer,
  customer: customerReducer,
  contact: contactReducer,
  product: productReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  user: userReducer,
  menu: menuReducer,
  budget: budgetReducer,
  detailTrial: detailTrialReducer,
  budgetStatus: budgetStatusReducer,
  slip: slipReducer,
  base: baseReducer,
  posting: postingReducer,
  operate: operateReducer,
  settlement: settlementReducer,
});

export default reducer;
