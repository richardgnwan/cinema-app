// Number Formater with default configs values
import React from 'react'
import NumberFormat from 'react-number-format'

export default function MyNumberFormat(props) {
  const { displayType = "text" } = props;
  const { thousandSeparator = "." } = props;
  const { decimalSeparator = "," } = props;
  const { prefix = "Rp " } = props;
  const { value = 0 } = props;

  return (
    <NumberFormat
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      prefix={prefix}
      value={value}
    />
  )
}
