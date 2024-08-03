export interface CoinProps {
    id: string
    name: string
    symbol: string
    rank: string
    supply: string
    maxSupply: string
    marketCapUsd: string
    volumeUsd24Hr: string
    changePercent24Hr: string
    vwap24hr: string
    explorer: string
    priceUsd: string
    formatedPrice?: string
    formatedMarket?: string
    formatedVolume?: string
}