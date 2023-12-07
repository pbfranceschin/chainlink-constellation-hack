export const sponsorDepositText = (targetName, currentUserAmount) => {
  return (
    {
      textPositiveAmount: 
        <p>
          You have a total sponsor amount of <span className="font-semibold text-text1">{currentUserAmount} USDC</span> on the <span className="font-semibold text-text1">{targetName}</span> tournament. How much would you like to deposit?
        </p>,
      textZeroAmount: 
        <p>
          Choose the amount to sponsor the <span className="font-semibold  text-text1">{targetName}</span> tournament.
        </p>
    }
  )
}

export const sponsorWithdrawText = (targetName, currentUserAmount) => {
  return (
    {
      textPositiveAmount: 
        <p>
          You have a total sponsor amount of <span className="font-semibold text-text1">{currentUserAmount} USDC</span> on the <span className="font-semibold text-text1">{targetName}</span> tournament. How much would you like to withdraw?
        </p>,
      textZeroAmount: 
        <p>
          You haven&#39;t sponsor the <span className="font-semibold text-text1">{targetName}</span> tournament yet. 
        </p>
    }
  )
}

export const teamDepositText = (targetName, currentUserAmount) => {
  return (
    {
      textPositiveAmount: 
        <p>
          You have a current bet of <span className="font-semibold">{currentUserAmount} USDC</span> on <span className="font-semibold text-text1">{targetName}</span>. How much would you like to deposit?
        </p>,
      textZeroAmount: 
        <p>
          How much would you like to deposit on <span className="font-semibold">{targetName}</span>? 
        </p>
    }
  )
}

export const teamWithdrawText = (targetName, currentUserAmount) => {
  return (
    {
      textPositiveAmount: 
        <p>
          You have a current bet of <span className="font-semibold">{currentUserAmount} USDC</span> on <span className="font-semibold text-text1">{targetName}</span>. How much would you like to withdraw?
        </p>,
      textZeroAmount: 
        <p>
          You have no deposit on <span className="font-semibold">{targetName}</span> yet.
        </p>
    }
  )
}