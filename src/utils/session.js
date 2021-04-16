const tokenAdmin = "adminToken";
const tabPages = 'tabPages'

export function setToken(value){
    sessionStorage.setItem(tokenAdmin, value)
}

export function getToken(){
    return sessionStorage.getItem(tokenAdmin);
}

export function getTabs(){
    return sessionStorage.getItem(tabPages);
}

export function setTabs(value){
    return sessionStorage.setItem(tabPages, value);
}
