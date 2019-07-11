import {
  visitList
} from '@/services/list';

export default {
  namespace: 'list',

  state: {},

  effects: {
    * queryList({
      payload,
      callback
    }, {
      call
    }) {
      const response = yield call(visitList, payload);
      callback(response)
    },
  },

};
