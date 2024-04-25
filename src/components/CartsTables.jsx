import React, { useEffect, useState } from "react"
import styles from "./CartsTables.module.css"
import Cart from "./Cart"
import InteractiveMap from "./InteractiveMap"

function CartsTables() {

    const [cartData, setCartData] = useState("")
    const [sortedOption, setSortedOption] = useState("id")

    useEffect(() => {
        fetch("https://test.tspb.su/test-task/vehicles")
        .then(data => data.json())
        .then((data) => {
            setCartData(data)
            console.log(data)
        })
        .catch(() => {
            setCartData("Error")
        })
    }, [])

    function sorted(data) {
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
                <select name="sorter" id="sorter" value={sortedOption} className={styles.select} onChange={(e) => {setSortedOption(e.target.value)}}>
                    <option className={styles.option} value="id">По id</option>
                    <option className={styles.option} value="price">По стоимости</option>
                    <option className={styles.option} value="year">По году выпуска</option>
                </select>
            </div>
            <div className={styles.cartList}>
                {cartData ?
                    (cartData === "Error" ? 
                    <p>Error!</p>
                    :
                        <div className={styles.list}>
                            {sorted(cartData).map((item) => {  
                                    return <Cart item={item} key={item.id} setCartData={setCartData} data={cartData}/>
                                }
                            )}
                        </div>
                    )
                    :
                    <p>Wait</p>
                }
            </div>
            <div className={styles.map}>
                {cartData ? <InteractiveMap data={cartData}/> : <></>}
            </div>
        </div>
    )
}

export default CartsTables