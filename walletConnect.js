// src/walletConnect.js

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Ask MetaMask to switch to BSC Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }] // 0x61 = 97 (BSC Testnet)
      });

      // Request wallet connection
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];

      document.getElementById('wallet-status').innerText = `🦊 Wallet: ${wallet}`;
      console.log("Wallet connected:", wallet);
    } catch (error) {
      // If BSC Testnet is not added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x61',
              chainName: 'BSC Testnet',
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              nativeCurrency: {
                name: 'BNB',
                symbol: 'tBNB',
                decimals: 18
              },
              blockExplorerUrls: ['https://testnet.bscscan.com']
            }]
          });
        } catch (addError) {
          console.error("Error adding chain:", addError);
        }
      } else {
        console.error("Wallet connection error:", error);
      }
    }
  } else {
    alert("Please install MetaMask to use this DApp.");
  }
}
// walletConnect.js
