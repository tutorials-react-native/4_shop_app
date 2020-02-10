import produce from "immer";

import { actions } from "store";

const INITIAL_STATES = {
  token: null,
  userId: null
};

const auth = produce((draft, action) => {
  switch (action.type) {
    case actions.SIGN_UP:
      draft.token = action.token;
      draft.userId = action.userId;
      return;
    case actions.LOG_IN:
      draft.token = action.token;
      draft.userId = action.userId;
      return;
  }
  return;
}, INITIAL_STATES);

export default auth;
