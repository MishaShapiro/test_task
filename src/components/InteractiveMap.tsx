import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from 'react-router';
import { mainData } from '../types/mainData';

interface paramType {
    data: mainData[]
}

function InteractiveMap({data}: paramType) {
    const navigation = useNavigate()
    let default_id = 1

    if (data.length <= 1) {
        default_id = 0
    }

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <YMaps>
                <p>Interactive Map</p>
                <Map width="98vw" height="300px" defaultState={{ center: [data[default_id].latitude, data[default_id].longitude], zoom: 10 }}>
                    {
                        data.map((item) => {
                            return <Placemark key={item.id} geometry={[item.latitude, item.longitude]} properties={{iconCaption: item.name}} options={{preset: 'islands#darkGreenDotIcon'}} onClick={() => {navigation("/cart/:" + item.id, {state: { id: item.id, data: data }})}}/>
                        })
                    }
                </Map>
            </YMaps>
        </ErrorBoundary>
    )
}

export default InteractiveMap