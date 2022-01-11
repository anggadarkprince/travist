import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import {format} from "timeago.js"
import Constants from "./Constants";

function App() {
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -7.2575,
        longitude: 112.7521,
        zoom: 12
    });

    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get(Constants.baseUrl + "/pins")
                setPins(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins()
    }, [])

    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id)
    }

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            >
                {
                    pins.map(pin => (
                        <React.Fragment key={pin._id}>
                            <Marker latitude={pin.lat} longitude={pin.lng} offsetLeft={0} offsetTop={-10}>
                                <RoomIcon style={{fontSize: viewport.zoom * 4, color: "slateblue", cursor: "pointer"}}
                                    onClick={() => handleMarkerClick(pin._id)}/>
                            </Marker>
                            {
                                pin._id === currentPlaceId &&
                                <Popup
                                    latitude={pin.lat}
                                    longitude={pin.lng}
                                    closeButton={true}
                                    closeOnClick={false}
                                    offsetLeft={30}
                                    offsetTop={5}
                                    onClose={() => setCurrentPlaceId(null)}
                                    anchor="left">
                                    <div className="card">
                                        <div className="info-section">
                                            <label>Place</label>
                                            <h4 className="place">{pin.title}</h4>
                                        </div>
                                        <div className="info-section">
                                            <label>Review</label>
                                            <p className="description">{pin.description}</p>
                                        </div>
                                        <div className="info-section">
                                            <label>Rating</label>
                                            <div className="stars">
                                                <StarIcon className="star"/>
                                                <StarIcon className="star"/>
                                                <StarIcon className="star"/>
                                                <StarIcon className="star"/>
                                                <StarIcon className="star"/>
                                            </div>
                                        </div>
                                        <div className="info-section">
                                            <label>Information</label>
                                            <p className="username">Created By <strong>{pin.username}</strong></p>
                                            <p className="date">{format(pin.createdAt)}</p>
                                        </div>
                                    </div>
                                </Popup>
                            }
                        </React.Fragment>
                    ))
                }

            </ReactMapGL>
        </div>
    );
}

export default App;
