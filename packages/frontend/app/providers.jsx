'use client'

import { RainbowKitProvider, darkTheme, midnightTheme } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

import { chains, config } from '../wagmi'

const myCustomTheme = {
  ...darkTheme, // or lightTheme, depending on your preference
  colors: {
    accentColor: '#ff5722', 
  },
  // You can also override other theme properties
};

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider 
        theme={darkTheme({
          accentColor: '#C3D350',
          accentColorForeground: '#333333',
        })} 
        chains={chains}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}