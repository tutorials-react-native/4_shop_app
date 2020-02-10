import produce from "immer";

import { actions } from "store";

const INITIAL_STATES = {
  token: null,
  userId: null
};

const auth = produce((draft, action) => {
  switch (action.type) {
    case actions.AUTHENTICATE:
      draft.token = action.token;
      draft.userId = action.userId;
      return;
    case actions.LOG_OUT:
      return INITIAL_STATES;
  }
  return;
}, INITIAL_STATES);

export default auth;
