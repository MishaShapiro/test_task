import { SetStateAction, useEffect, useState } from "react"
import styles from "./CartsTables.module.css"
import Cart from "./Cart"
import InteractiveMap from "./InteractiveMap"
import { useLocation } from "react-router"
import { mainData } from "../types/mainData"

function CartsTables() {

    const [cartData, setCartData] = useState<mainData[] | string>("")
    const [sortedOption, setSortedOption] = useState("id")
    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            setCartData(location.state.data)
            window.history.replaceState({}, '') // Используем, чтоб при перезагрузке  пропадал location state и страница заново запрашивала данные с сервера
        } else {
            fetch("https://test.tspb.su/test-task/vehicles")
            .then((data) => data.json())
            .then((data: SetStateAction<string>) => {
                setCartData(data)
            })
            .catch(() => {
                setCartData("Error")
            })
        }
    }, [])

    function sorted(data : mainData[]): mainData[] {
        return data.sort((x, y) => {
            switch(sortedOption) {
                case "id":
                    return x.id - y.id    
                case "price":
                    return x.price - y.price    
                case "year":
                    return x.year - y.year
                default:
                    return x.id - y.id  
            }
        })
    }

    return (
        <div className={styles.cart}>
            <div className={styles.sorter}>
                {cartData.length > 0 ?
                    <select name="sorter" id="sorter" value={sortedOption} className={styles.select} onChange={(e) => {setSortedOption(e.target.value)}}>
                        <option className={styles.option} value="id">По id</option>
                        <option className={styles.option} value="price">По стоимости</option>
                        <option className={styles.option} value="year">По году выпуска</option>
                    </select>
                    :
                    <></>
                }
            </div>
            <div className={styles.cartList}>
                {cartData ?
                    (typeof cartData === "string"? 
                        <p className={styles.attention}>Error!</p>
                        :
                        (cartData.length > 0 ?
                            <div className={styles.list}>
                                {sorted(cartData).map((item: mainData) => {  
                                        return <Cart item={item} key={item.id} setCartData={setCartData} data={cartData}/>
                                    }
                                )}
                            </div>
                        
                        :
                        <p className={styles.attention}>No Data!</p>
                        )
                    )
                    :
                    <p className={styles.attention}>Wait</p>
                }
            </div>
            <div className={styles.map}>
                {(cartData && typeof cartData !== "string" && cartData.length > 0) ? <InteractiveMap data={cartData}/> : <></>}
            </div>
        </div>
    )
}

export default CartsTables