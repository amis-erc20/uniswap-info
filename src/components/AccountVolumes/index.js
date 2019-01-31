/**
 * @prettier
 */

import React, { Component } from "react";
import ReactTable from "react-table";

import Loader from "../Loader";

import "./AccountVolumes.css";

class AccountVolumes extends Component {
  render() {
    if (this.props.didReceiveData === false) {
      return <Loader />;
    }

    const data = [];

    this.props.accountVolumesList.forEach(e => {
      var accountLink = "https://etherscan.io/address/" + e.account;

      var account = {
         account: e.account,
         accountLink: accountLink,

         totalEth: Number(e.eth).toFixed(4),
         totalToken: Number(e.tokens).toFixed(4),

         txCount: e.numTx,
         avgTxSize: Number(e.eth/e.numTx).toFixed(2),
         volPercentage: e.volPercentage
      };
      data.push(account);
    });

    const columns = [
      {
        Header: "Address",
        accessor: "account",
        Cell: row => (
          <div
            style={{
              padding: "5px"
            }}
          >
            <a
              href={row.original.accountLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div>{row.value}</div>
            </a>
          </div>
        )
      },
      {
        Header: "Total volume in ETH",
        accessor: "totalEth",
        className: "right"
      },
      {
        Header: "Total volume in " + this.props.curSymbol,
        accessor: "totalToken",
        className: "right"
      },
      {
        Header: "Percentage of ETH volume",
        accessor: "volPercentage",
        className: "right"
      },
      {
        Header: "Total transaction count",
        accessor: "txCount",
        className: "right"
      },
      {
        Header: "Average Transaction size (ETH)",
        accessor: "avgTxSize",
        className: "right"
      }
    ];

    return (
      <ReactTable
        className="AccountVolumes -striped"
        data={data}
        columns={columns}
        showPageSizeOptions={false}
        defaultPageSize={5}
        minRows={5}
        resizable={false}
        showPageSizeOptions={true}
      />
    );
  }
}

export default AccountVolumes;
