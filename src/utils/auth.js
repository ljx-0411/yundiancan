import Cookies from 'js-cookie'
// tokenkey是项目登录时得标识，每个项目都应该有不同的key

const TokenKey = 'App-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}