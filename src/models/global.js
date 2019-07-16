import { uploadFile } from '@/services/common';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {
    *upload({ payload, callback }, { call }) {
      const response = yield call(uploadFile, payload);
      callback(response);
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
};
