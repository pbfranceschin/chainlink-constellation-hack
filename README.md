# Chainlink Constellation Hackathon

<!-- <p align="center">
  <svg 
   src="https://github.com/pbfranceschin/chainlink-constellation-hack/blob/master/packages/frontend/assets/logo.svg" alt="Sublime's custom image" />
</p> -->

# Yield Leagues
Yield Leagues is a smart contract protocol that implements the concept of "lossless betting pools". They are betting pools in which none of the losers lose the amount they put in. To enable this feature the protocol uses yield generating DeFi stategies and distributes the ROI to the game winners. The risk off course is proportional to the DeFi strategy being used. 

## How does it work?
First a user creates a pool based on a "game prediction", e.g., "who will win the next UEFA Champions League?". After all the possible *outcomes* are properly configurated, i.e., all the participant football Clubs are added to the outcomes pool, players can stake an amount of the underlying asset (e.g. USDC) in their favorite picks to win the league. Players can stake and unstake at any time before the results are in. After the final match ends and the champion is crowned, the oracle API comunicates the result to our smart contract at which point the pool will be effectivelly closed. Now all the players who picked the right outcome, in this case the champion, have a claim to a cut of the prize, which is the total yield generated by the pool during its lifetime. All the players can withdraw at least the exact amount they put in, including the losers.

## How is the prize distributed?
Each winner's cut is calculated proportional to the amount they contributed to the total yield. This means that early right picks are rewarded accordingly, i.e., the earlier you make your pick the bigger your prize will potentially be. This also means that even if a player takes his stake off the eventual right pick before the end, he still has a claim to the prize. And also, that players who make late stakes in order to "leech" on the prize have close to nothing to gain from this strategy. Of course that the prize is also directly proportional to the amount staked in the right pick. 

$$ prize = i \cdot \frac{T}{R} $$

In the equation above $i$ stands for the yield generated by the individual stake of the palyer, $T$ the total yield generated by the Pool and $O$ the yield generated by the total stakes in the end result.

The best way to handle the accounting of the pool is to use ERC-4626 pattern. The Pool contract is tailor-made to work with this standard. Below, we show a demo of a pool using an adapted ERC-4626 to work as an API to a USDC Aave Pool.

## The Pool contract
The main component of this proposal is the Pool contract. In essence, the Pool is a manifestation of a conceptual idea of our team, that is why we made it higly open and agnostic to the other necessary components of the protocol. Because of this, it is higlhy flexible to different schemes and composable with other existent dapps. This means that the dev community can leverage it to make any variations of pool with different DeFi strategies and oracle systems.

## The Oracle
As anticipated above the Pool contract is agnostic in regards to the oracle system used. In the Demo below, our preffered alternative was to use Chainlink Functions in conjunction with a mock-API to provide the result of the last match of the league. As this definition is open, we hope that different approaches will emerge and the community will find the best options for each case.

## Use cases
In principle, any prediction can be used to open a Pool. The question is open. However, due to the way the prize is generated, predictions with a short timeline do not fit well with our tool. The ideal cases are predictions that take a relatively long time to be realised, like for example who "will win the next UEFA Champions League" or "who will win the next Ballon D'or" or "NBA MVP".

## Demo