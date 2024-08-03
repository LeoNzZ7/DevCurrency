import { BsSearch } from 'react-icons/bs'
import styles from './home.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import api from '../../services/api'
import { CoinProps } from '../../types/coinProps'
import { LoadingIcon } from '../../components/loading'

export const Home = () => {
    const [input, setInput] = useState("")
    const [coins, setCoins] = useState<CoinProps[]>([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, [offset])

    async function getData() {
        await api.get(`?limit=10&offset=${offset}`, {
            params: {
                apiKey: "63af9a05-58e7-4541-bbc2-e98352440e3e"
            }
        }).then((response) => {
            const coinsData: CoinProps[] = response.data.data;
            const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            })
            const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact"
            })
            const formatedResult = coinsData.map((item) => {
                const formated = {
                    ...item,
                    formatedPrice: price.format(Number(item.priceUsd)),
                    formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
                }
                return formated;
            })

            const listCoins = [...coins, ...formatedResult]
            setCoins(listCoins)
            setLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (input === "") return

        navigate(`/details/${input}`)
        setInput("")
    }

    function handleGetMore() {
        setOffset(offset + 10)
    }

    if (loading) {
        return (
            <LoadingIcon />
        )
    }

    return (
        <main className={styles.container} >
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder='Digite o nome da moeda... Ex: Bitcoin'
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                <button type="submit">
                    <BsSearch size={30} color="#FFF" />
                </button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th scope='col' >Moeda</th>
                        <th scope='col' >Valor de mercado</th>
                        <th scope='col' >Preço</th>
                        <th scope='col' >Volume</th>
                        <th scope='col' >Mudança 24</th>
                    </tr>
                </thead>
                <tbody id='tbody' >
                    {coins.length > 0 && coins.map((item) => (
                        <tr className={styles.tr} key={item.id} >
                            <td className={styles.tdLabel} data-label="Moeda" >
                                <div className={styles.name} >
                                    <img
                                        className={styles.logo}
                                        src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                                        alt="Cripto logo" />
                                    <Link to={`details/${item.id}`}>
                                        <span>{item.name}</span> | {item.symbol}
                                    </Link>
                                </div>
                            </td>

                            <td className={styles.tdLabel} data-label="Valor de mercado" >{item.formatedMarket}</td>
                            <td className={styles.tdLabel} data-label="Preço" >{item.formatedPrice}</td>
                            <td className={styles.tdLabel} data-label="Volume" >{item.formatedVolume}</td>
                            <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24" >
                                <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={styles.buttonMore} onClick={handleGetMore} >
                Carregar Mais
            </button>
        </main >
    )
}