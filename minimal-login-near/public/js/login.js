import {initNEAR, loginNEAR} from './blockchain.js'


async function logged_in(accountId){
  const signed = await near.connection.signer.signMessage(accountId, accountId,
                                                          near.connection.networkId)

  fetch("/user/login", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: accountId, 
                          password: JSON.stringify(signed)})
  }).then(res => res.json())
    .then(res => callback(res))
}

function callback(response){
  if(response['success']){
    console.log('NEAR login succeded, reloading web')
    location.reload()
  }else{
    console.log('NEAR login failed')
  }
}

function flow(){
  let accountId = window.walletAccount.getAccountId()

  if (accountId) {
      logged_in(accountId)
  }else{
      console.log('Not logged in NEAR')
  }
}

window.nearInitPromise = initNEAR()
.then(flow)
.catch(console.error)

window.login = loginNEAR
