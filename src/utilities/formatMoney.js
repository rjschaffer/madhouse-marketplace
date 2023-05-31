

function formatMoney(price) {
    const currencyFormatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', 
        maximumFractionDigits: 0
    })

  return (
    currencyFormatter.format(price)
  )
}

export default formatMoney


