import {
  login,
  getInfo,
  sendCode,
  register
} from '@/services/user';
import {
  removeToken
} from '@/utils/auth';
import router from 'umi/router'


export default {
  namespace: 'user',

  state: {
    currentUser: undefined,
    userInfo: undefined
  },

  effects: {
    * login({
      payload,
      callback
    }, {
      call,
      put
    }) {
      const response = yield call(login, payload);
      callback(response)
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    * getInfo({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(getInfo, payload);
      yield put({
        type: 'setInfo',
        payload: response,
      });
    },
    * logout() {
      removeToken()
      yield(router.replace('/user/login'))
    },
    * send({
      payload,
      callback
    }, {
      call,
    }) {
      const response = yield call(sendCode, payload);
      callback(response)
    },
    * submit({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    * result({
      payload
    }, {
      call
    }) {
      console.log(payload)
      yield call(register, payload);
    }
  },

  reducers: {
    saveCurrentUser(state, {
      payload
    }) {
      return {
        ...state,
        currentUser: payload || {},
      }
    },
    setInfo(state, {
      payload
    }) {
      return {
        ...state,
        userInfo: payload || {},
      }
    },
    registerHandle(state, {
      payload
    }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  }
};
