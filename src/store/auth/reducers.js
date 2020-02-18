import produce from "immer";

import { actions } from "store";

const INITIAL_STATES = {
  token: null,
  userId: null,
  triedAutoLogin: false
};

const auth = produce((draft, action) => {
  switch (action.type) {
    case actions.AUTHENTICATE:
      draft.token = action.token;
      draft.userId = action.userId;
      draft.triedAutoLogin = false;
      return;
    case actions.LOG_OUT:
      return { ...INITIAL_STATES, triedAutoLogin: true };
    case actions.SET_DID_TRY_AL:
      draft.triedAutoLogin = true;
      return;
  }
  return;
}, INITIAL_STATES);

export default auth;
