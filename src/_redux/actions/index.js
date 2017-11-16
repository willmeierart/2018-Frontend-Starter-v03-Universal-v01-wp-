import axios from 'axios'
import { CHECK_BROWSER, FETCH_WP_PAGES, FETCH_WP_POSTS} from './types'

const BASE_URL = '/'
const PAGES_URL = `${BASE_URL}/wp-json/wp/v2/pages`
const POSTS_URL = `${BASE_URL}/wp-json/wp/v2/posts`

export function fetchWPpages(){
  const request = axios.get(PAGES_URL).then(res=>res)
  return {
    type: FETCH_WP_PAGES,
    payload: request
  }
}
export function fetchWPposts(){
  const request = axios.get(POSTS_URL).then(res=>res)
  return {
    type: FETCH_WP_POSTS,
    payload: request
  }
}

export function checkBrowser(){
  let browser = 'unknown'
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
    browser = 'opera'
  } else if(navigator.userAgent.indexOf("chrome") != -1 ){
    browser = 'chrome'
  } else if(navigator.userAgent.indexOf("Safari") != -1){
    browser = 'safari'
  } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
    browser = 'firefox'
  } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
    browser = 'ie'
  }

  // switch (true) {
  //   case (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0:
  //     browser = 'opera'
  //     break;
  //   case typeof InstallTrigger !== 'undefined':
  //     browser = 'firefox'
  //     break;
  //   case /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || typeof safari !== 'undefined'):
  //     browser = 'safari'
  //     break;
  //   case /*@cc_on!@*/false || !!document.documentMode:
  //     browser = 'IE'
  //     break;
  //   case !!window.StyleMedia:
  //     browser = 'edge'
  //     break;
  //   case !!window.chrome && !!window.chrome.webstore:
  //     browser = 'chrome'
  //     break;
  //   default:
  //     browser = 'chrome'
  // }
  return {
    type: CHECK_BROWSER,
    payload: browser
  }
}
