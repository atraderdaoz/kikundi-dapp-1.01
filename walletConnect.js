async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }]
      });
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];
      document.getElementById('wallet-status').innerText = `🦊 Wallet: ${wallet}`;
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x61',
              chainName: 'BSC Testnet',
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
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
