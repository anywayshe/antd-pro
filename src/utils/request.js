// eslint-disable
import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import { getToken } from '@/utils/auth';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const Methods = ['POST', 'PUT', 'DELETE'];
const resCode = {
  success: '10000',
  validToken: '990009',
};
const checkStatus = response => {
  const { status, statusText } = response;
  if ([200].includes(status)) {
    return response;
  }
  const errortext = codeMessage[status] || statusText;
  notification.error({
    message: `请求错误 ${response.status}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};
const checkResCode = response => {
  const { data, code, message } = response;
  if (code !== resCode.success) {
    if (code === resCode.validToken) {
      notification.error({
        message: '登录过期',
      });
      router.push('/user/login');
    } else {
      notification.error({
        message: '接口异常',
        description: message,
      });
    }
    return '';
  }
  return data;
};

function request(method, url, data) {
  const newOptions = {};
  let params;
  let option;
  if (data instanceof FormData) {
    option = {
      token: getToken() ? getToken() : '',
    };
    params = data;
  } else {
    params = JSON.stringify(data);
    option = {
      'Content-Type': 'application/json',
      token: getToken() ? getToken() : '',
    };
  }
  Object.assign(newOptions, {
    method,
    headers: option,
  });
  if (Methods.includes(method)) {
    Object.assign(newOptions, {
      body: params,
    });
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      return response.json();
    })
    .then(checkResCode);
}

function post(url, data) {
  const method = 'POST';
  return request(method, url, data);
}

function get(url) {
  const method = 'GET';
  return request(method, url);
}
export default request;
export { post, get };
