import { useLocation, useNavigate } from "react-router"
import styles from "./Cart.module.css"
import { mainData } from "../types/mainData"
import { Dispatch, SetStateAction } from "react"

interface paramsInt {
    item: mainData,
    setCartData: Dispatch<SetStateAction<string | mainData[]>>,
    data: mainData[]
}

function Cart({item, setCartData, data} : paramsInt) {

    const navigation = useNavigate()
    const location = useLocation()

    return (
        <div className={styles.container}>
            <p className={styles.id}>{item.id}</p>
            <div className={styles.mainInfo}>
                <h1 className={styles.name}>{item.name}</h1>
                <h2 className={styles.model}>{item.model}</h2>
            </div>
            <div className={styles.otherInfo}>
                <div className={styles.priceBlock}>
                    <h4 className={styles.year}>{item.year}</h4>
                    <div className={styles.colorContainer}>
                        <h4 className={styles.color}>color: {item.color}</h4>
                        <div className={styles.colorBlock} style={{backgroundColor: item.color}}></div>
                    </div>
                    <h4 className={styles.price}>price: {item.price}</h4>
                </div>
                <div className={styles.mapContainer}>
                    <div className={styles.coords}>
                        <h6>latitude</h6>
                        <h6 className={styles.coord}>{item.latitude}</h6>
                        <h6>longitude</h6>
                        <h6 className={styles.coord}>{item.longitude}</h6>
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.editBtn} ${styles.btn}`} onClick={() => {
                    location.state = { id: item.id, data: data }
                    navigation("/cart/:" + item.id, {state: location.state})
                }}>Редактировать</button>
                <button className={`${styles.deleteBtn} ${styles.btn}`} onClick={() => {
                    setCartData(data.filter((elem) => {
                        return elem.id !== item.id
                    }))
                }}>Удалить</button>
            </div>
        </div>
    )
}

export default Cart