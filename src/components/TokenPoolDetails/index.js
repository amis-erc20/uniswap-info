/**
 * @prettier
 */

import React, { Component } from "react";

import ReactTable from "react-table";

import "./TokenPoolDetails.css";

class TokenPoolDetails extends Component {
  render() {
    var tokenLink =
      "https://www.etherscan.io/address/" + this.props.tokenAddress;
    var exchangeLink =
      "https://www.etherscan.io/address/" + this.props.exchangeAddress;

    var accruedFees =
      this.props.myCollectedEthFees + this.props.myCollectedTokenFees;

    if (accruedFees.length === 0) {
      accruedFees = "-";
    }

    var rateDisplay =
      this.props.exchangeRate > 0
        ? ("1 ETH = " + this.props.exchangeRate.toFixed(2) + " " + this.props.curSymbol)
        : "-";

    const data = [
      {
        symbol: this.props.curSymbol,
        token: this.props.tokenAddress,
        exchange: this.props.exchangeAddress,
        poolSize: this.props.curEthPoolTotal,
        poolSizeToken: this.props.curTokenPoolTotal,
        poolShare: this.props.curPoolShare,
        avgDepRate: this.props.avgDepRate,
        accruedFees: accruedFees,
        tokenFees: this.props.netCollectedTokenFees,
        aprDisplay: this.props.aprDisplay,
        rate: rateDisplay
      }
    ];

    var headerTokenLiquidity = "Liquidity (" + this.props.curSymbol + ")";

    const columns = [
      {
        Header: "Symbol",
        accessor: "symbol",
        Cell: row => <b>{row.value}</b>,
        maxWidth: 60
      },
      {
        Header: "Token",
        accessor: "token",
        Cell: row => (
          <a href={tokenLink} rel="noopener noreferrer" target="_blank">
            <div className="truncate">{row.value}</div>
          </a>
        ),
        maxWidth: 65
      },
      {
        Header: "Exchange",
        accessor: "exchange",
        Cell: row => (
          <div
            style={{
              padding: "2px"
            }}
          >
            <a href={exchangeLink} rel="noopener noreferrer" target="_blank">
              <div className="truncate">{row.value}</div>
            </a>
          </div>
        ),
        maxWidth: 65
      },
      {
        Header: "Rate",
        accessor: "rate",
        className: "right",
        minWidth: 120,
        maxWidth: 150
      },
      {
        Header: "Liquidty (ETH)",
        accessor: "poolSize",
        className: "right",
        maxWidth: 90
      },
      {
        Header: headerTokenLiquidity,
        accessor: "poolSizeToken",
        className: "right",
        maxWidth: 100
      },
      {
        Header: "Avg deposit rate",
        accessor: "avgDepRate",
        className: "right"
      },
      {
        Header: "Your Share",
        accessor: "poolShare",
        className: "right",
        maxWidth: 90
      },
      {
        Header: "Your liquidity change",
        accessor: "accruedFees",
        className: "right"
      },
      {
        Header: "Net (token) / Gross(ETH / Token)",
        accessor: "tokenFees",
        className: "right",
        minWidth: 130
      },
      {
        Header: "APR",
        accessor: "aprDisplay",
        className: "right",
        maxWidth: 70
      }
    ];

    return (
      <ReactTable
        className="TokenPoolDetails"
        data={data}
        minRows={1}
        showPagination={false}
        sortable={false}
        columns={columns}
        resizable={false}
      />
    );
  }
}

export default TokenPoolDetails;
