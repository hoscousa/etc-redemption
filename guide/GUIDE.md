# Digix ETC Redemption User Guide

## Overview

This document is a guide for DGD holders outlining the required steps for redeeming ETC. For background, please review previous announcements and documentation on the ETC redemption contract.

DGD holders are credited with DGDR tokens on the ETC chain, which can be used to call the `redeem(_to)` method on the DGDR contract and exchange them for an equivalent ETC balance. This requires executing a transaction on the ETC chain using the same keystore that holds DGD on the main chain. There are several methods available, which one depends on the DGDR holder's keystore type.

The sender of the redemption transaction (DGDR holder) will need a small amount of ETC to preform the transaction.

## Replay Attack Concerns

ETC and ETH addresses are compatible with each other, so you can generate wallets in an ETH client and use it on the ETC chain. There is however the possibility of transactions being replayed from one chain to the other when using older clients or firmware. There is also the possibility of old transactions being replayed if a previously unfunded account becomes funded.

For this reason, when using ETC, try to keep it separate from accounts that have ever used or received ETH.

The `redeem` method on the Redemption Contract needs to be passed an address; `_to` should be set to:

* A *different* (preferably new) ETC address that you control, to prevent potential replay attacks
* A standard address that you can access the keystore of; **NOT an exchange or contract address!**

## Redemption Contract Address

Current ETC *dry-run* test address: 0x2ea9a44fb6bf22f09263eb59807aa5bc7f6dc9e2

The real (not dry-run) deployment address will be announced at a future date and can be seen in the [Spectrum UI](spectrum-alpha.digixdev.com).

## ABI (just the `redeem` method)

```json
[{ "constant": false, "inputs": [{ "name": "_to", "type": "address" }], "name": "redeem", "outputs": [], "payable": false, "type": "function" }]
```

## Recommended Methods for sending `redeem` transaction

- [Spectrum (bespoke UI)][#spectrum]
- [MyEtherWallet][#MyEtherWallet]
- [Parity][#parity]
- [Geth (Ethereum Classic Fork)][#geth]

At present the most battle-tested client is MEW. You can also use the newer (but less tested) Spectrum (by Digix), which has a UI built specifically for the ETC Redemption Contract. These web clients support a range of different features:

- Keystore File (UTC / JSON)
- Ledger Nano S 1.2+ *
- Offline Signing
- TREZOR (MEW only)
- Mnemonic Phrase (MEW Only)
- Parity Phrase (MEW Only)

\* IF using the Ledger Nano S, you need at least firmware version 1.2, but it appears that v 1.2 does not support eip-155 replay protection. This is not an issue if you are only using it to sign the `redeem` method (as this cannot be replayed), but if you are doing any other transactions, it's advised to upgrade to at least v1.3 firmware, which prevents replays in Spectrum and MyEtherWallet.

### Fallback Options

Should all of the public RPC nodes become unavailable for some reason such as a Denial of Service attack, or you just prefer to be decentralized, you can still publish the redemption transaction by running a local ETC node. We would recommend using either Parity, or for hardware wallets, the [local dist version of MEW](https://github.com/kvhnuke/etherwallet#users-non-developers) and either Parity of Geth (ETC Fork).

## Method Method Instructions

### Spectrum

https://www.youtube.com/watch?v=4I61a45Q_t4

### MyEtherWallet

https://myetherwallet.com/#contracts

Select ETC (top right)

![Select ETC (top right)](https://raw.githubusercontent.com/DigixGlobal/etc-redemption/master/guide/451060D0-F428-4609-9A8F-A55B86C6A92D.png)

Open the "contracts" tab

Enter the Contract Address

Paste in the ABI from above

Click "access"

In the 'to' field, enter the address you wish to be sent the redeemed ETC

Select the type of wallet to use for calling the method, and unlock it.

Click "write" to publish the redemption transaction.

Transaction Popup Appears

Amount to send: 0
Gas Limit: Should be automatically set to around at least ~75k, or manually 80k+  

Click Generate Transaction

Click "Yes, I am sure"

You should then see a transaction confirmation, click 'View your transaction' and record the TxID

You should now have the ETC redeemed


### Geth

Download the Ethereum Classic Geth Client


### Parity

Start Parity with `parity --chain classic`

Navigate to URL http://127.0.0.1:8180/

Contracts -> Watch

Select 'Custom Contract'

Click 'Next'

Enter Contract Details

Click "Add Contract"

Select the New Contract

Click "Execute"

Enter a recipient address in the `_to` field

Check "Advanced Sending options"

Click Next

Set Gas to 10000

Click Post Transaction

Enter your Password in parity signer and confirm the request

You should now have a transaction ID, please record it