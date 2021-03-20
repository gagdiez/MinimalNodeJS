import {initNEAR, logoutNEAR} from './blockchain.js'

function logout(){
  fetch("/user/logout", {method: "GET"})
  .then(res => res.json())
  .then(res => {logoutNEAR(), callback(res)})
}

function callback(response){
  if(response['success']){
    console.log('Server logout succeed')
    location.reload()
  }else{
    console.log('Server logout failed')
  }
}

window.nearInitPromise = initNEAR()
window.logout = logout
