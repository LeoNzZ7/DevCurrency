import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import { CoinProps } from '../../types/coinProps'
import { LoadingIcon } from '../../components/loading'
import { toast } from 'react-toastify'

export const Details = () => {
    const { cripto } = useParams()
    const navigate = useNavigate()

    const [coin, setCoin] = useState<CoinProps>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getCoin() {
            try {
                await api.get(`${cripto}`)
                    .then((response) => {
                        const price = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        })
                        const priceCompact = Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            notation: "compact"
                        })
                        const result = {
                            ...response.data.data,
                            formatedPrice: price.format(Number(response.data.data.priceUsd)),
                            formatedMarket: priceCompact.format(Number(response.data.data.marketCapUsd)),
                            formatedVolume: priceCompact.format(Number(response.data.data.volumeUsd24Hr))
                        }
                        setCoin(result)
                        setLoading(false)

                        console.log(coin?.formatedMarket)
                    })
            } catch (err) {
                console.log(err)
                navigate('/')
                toast.error("Moeda não encontrada!")
            }
        }

        getCoin()

    }, [cripto])

    if (loading || !coin) {
        return (
            <LoadingIcon />
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.center} >{coin.name}</h1>
            <h1 className={styles.center} >{coin.symbol}</h1>
            <section className={styles.content} >
                <img
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                    alt="cripto logo"
                    className={styles.logo}
                />
                <h1>{coin.name} | {coin.symbol}</h1>
                <p><strong>Preço: </strong>{coin.formatedPrice}</p>
                <a><strong>Mercado: </strong>{coin.formatedMarket}</a>
                <a><strong>Volume: </strong>{coin.formatedVolume}</a>
                <a className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}>
                    <strong>Mudença 24h: </strong>
                    {coin?.formatedVolume}
                </a>
            </section>
            <div className={styles.button} >
                <a className={styles.button} onClick={() => navigate('/')}>Voltar</a>
            </div>
        </div>
    )
}