import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import styles from "./EditCart.module.css"
import { mainData } from "../types/mainData"

function EditCart() {

    const navigation = useNavigate()
    const location = useLocation()
    const id = location.state.id

    const selecterCar: mainData = location.state.data.filter((item: mainData) => {
        return id === item.id
    })[0]

    const [name, setName] = useState<string>(selecterCar.name)
    const [model, setModel] = useState<string>(selecterCar.model)
    const [price, setPrice] = useState<number>(selecterCar.price)

    return (
        <div className={styles.container}>
            <div className={styles.editor}>
                <div className={styles.inputs}>
                    <input className={styles.input} type="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <input className={styles.input} type="model" value={model} onChange={(e) => {setModel(e.target.value)}}/>
                    <input className={styles.input} type="price" value={price} onChange={(e) => {"1234567890".includes(e.target.value.slice(e.target.value.length - 1, e.target.value.length)) ? setPrice(Number(e.target.value)) : setPrice(price)}}/>
                </div>
                <div className={styles.buttons}>
                    <button className={`${styles.btn} ${styles.btnBack}`} onClick={() => {navigation("/", {state: {data: location.state.data}})}}>Назад</button>
                    <button className={`${styles.btn} ${styles.btnSend}`} onClick={() => {
                        location.state.data.map((item: mainData): mainData => {
                            if (item.id === id) {
                                item.name = name
                                item.model = model
                                item.price = price
                                return item
                            }
                            return item
                        })
                        navigation("/", {state: {data: location.state.data}})
                    }}>Изменить</button>
                </div>
            </div>
        </div>
    )
}

export default EditCart