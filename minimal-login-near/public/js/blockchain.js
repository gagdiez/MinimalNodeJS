import {getConfig} from './config.js'

const nearConfig = getConfig('development')

window.nearConfig = nearConfig
window.nearAPI = nearApi


// ===== API =====

export async function loginNEAR() {
  await walletAccount.requestSignIn(nearConfig.contractName, 'app');
}

export function logoutNEAR() {
  walletAccount.signOut()
}

export async function initNEAR() {
  // Initializing connection to the NEAR node.
  window.near = await nearAPI.connect(
    Object.assign(nearConfig,
                  {deps: {keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()}})
  );

  // Needed to access wallet login
  window.walletAccount = new nearAPI.WalletConnection(window.near);

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(
    nearConfig.contractName,
    {viewMethods: [],
     changeMethods: [],
     sender: window.walletAccount.getAccountId()}
  );
}

