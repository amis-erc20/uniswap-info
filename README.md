# Uniswap History Mod

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Transaction and liquidity pool stats for https://uniswap.io

This a slightly modified version of https://github.com/Uniswap/uniswap-info.

### Notes
###### DAI event history
In (src/constants/Events.js) contract events on the DAI/ETH exchange are stored up until a certain block. Right now (31-01-2019) this file is around 5MB. In this way the page loads faster for the DAI/ETH pair. No data for other pairs is stored or used.

Using the new API that is being built is essential to keep being able to load the history so a big priority.

###### Fees
- Fees are calculated since *first* liquidity deposit.
- Fees use the pool tokens minted to calculate share of the fee (so transfers are ignored).
- For every transaction the fee times the percentage is added to the total fees.
- The results of this are the `Gross (ETH / TOKEN)` fees.
- The `Net (token)` fee is the net value in token of the values in `Your liquidity change` at the current exchange rate.

###### Your liquidity change
`Your liquidity change` is also calculated since *first* liquidity deposit. So even if you take out liquidity (and realize a loss or gain) and later add some liquidity the value change of the old liquidity is still there.

I am looking to change this so the fees better reflect liquidity change since last liquidity change.

###### APR
The APR is a crude extrapolation. Your current `Net (token)` fees since first deposit linearly extrapolated to a whole year. Then calculated as a percentage of your liquidity value at the moment of providing.

###### Pool token transfers
Transfers of pool tokens (other than minting or burning) are now ignored. Technically moving them to another account makes the percentage for the current account less. If you do not sell though you can still collect the accrued fees.

Also when users start to trade pool tokens this adds a whole new dynamic. I do not know yet how to handle this yet.

### To Start Development

###### Installing dependency
```bash
npm i
```

###### Running locally
```bash
npm start
```

# Loading Exchange Logs and Token Data

First run tools/crawl_exchange_logs.py passing in origin block and infura project id.
Then run tools/pull_exchanges.py after, passing in infura project id.

# TODO
- Handle transfers of pool tokens
- Use Uniswap API instead of web3 directly
- Add more data like total exchange volume, total transaction count, overall transaction size.
- Possibly let user input account to search
- Change layout to fit more data (?)
- Add download options (?)
