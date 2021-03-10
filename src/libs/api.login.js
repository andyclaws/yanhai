import HttpRequest from '@/libs/axios.login'
import config from '@/config'

const loginBaseUrl = config.baseUrl.login

const axios = new HttpRequest(loginBaseUrl)
export default axios
