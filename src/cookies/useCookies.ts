// export function setCookie(cname: string, cvalue: string, exdays = 7) {
//     const d = new Date();
//     d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//     const expires = 'expires=' + d.toUTCString();
//     document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
// }

//for access token

export function getCookie(cname: string) {
  if (typeof document !== 'undefined') {

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cname}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
}

export function setCookie(cname: string, cvalue: string) {
  let expiryInSec = 6000;
  //eg: expiry for a year should be in seconds (60*60*24*365 or 31536000)
  document.cookie = cname + "=" + cvalue + ";" + "max-age" + "=" + expiryInSec;
}

export function removeCookie(cname: string) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

//for refresh token
export function setRefreshCookie(cname: string, cvalue: string) {
  let expiryInSec = 6000;
  //eg: expiry for a year should be in seconds (60*60*24*365 or 31536000)
  document.cookie = cname + "=" + cvalue + ";" + "max-age" + "=" + expiryInSec;
}
