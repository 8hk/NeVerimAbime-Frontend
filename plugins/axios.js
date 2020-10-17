import {AxiosRequestConfig as config} from "axios";

export default function ({ $axios, store }) {
  $axios.defaults.xsrfCookieName = 'csrftoken';
  $axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  $axios.onRequest(request => {
     request.headers.common['Access-Control-Allow-Origin'] = '*'
    return request
  })
  $axios.onResponse(response => {
    return response
  })
}
