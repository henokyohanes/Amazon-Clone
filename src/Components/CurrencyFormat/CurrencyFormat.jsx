import React from "react";
import numeral from "numeral";

export default function CurrencyFormat({ value }) {
    return <>{numeral(value).format("$0,0.00")}</>;
}