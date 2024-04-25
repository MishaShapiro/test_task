import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { ErrorBoundary } from "react-error-boundary";

function InteractiveMap({data}) {

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <YMaps>
                <p>Interactive Map</p>
                <Map width="98vw" height="300px" defaultState={{ center: [data[1].latitude, data[1].longitude], zoom: 10 }}>
                    {
                        data.map((item) => {
                            return <Placemark geometry={[item.latitude, item.longitude]} properties={{iconCaption: item.name}} options={{preset: 'islands#darkGreenDotIcon'}} onClick={() => {console.log(item.name)}}/>
                        })
                    }
                </Map>
            </YMaps>
        </ErrorBoundary>
    )
}

export default InteractiveMap