import React, {useContext, useEffect, useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import {format} from "timeago.js";
import axios from "axios";
import AuthContext from "../../AuthContext";

export default function Explore(props) {
    const auth = useContext(AuthContext);
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [rating, setRating] = useState(0)
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -7.2575,
        longitude: 112.7521,
        zoom: 12
    });

    useEffect(() => {
        props.setHeaderFade(true)
        const getPins = async () => {
            try {
                const res = await axios.get("pins")
                setPins(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins()
    }, [])

    const handleMarkerClick = (id, lat, lng) => {
        setCurrentPlaceId(id)
        setNewPlace(null)
        setViewport({...viewport, latitude: lat, longitude: lng})
    }

    const handleAddPlace = (e) => {
        setCurrentPlaceId(null)

        const [lng, lat] = e.lngLat
        setNewPlace({
            lat: lat,
            lng: lng
        })
    }

    const handleSubmitNewPlace = async (e) => {
        e.preventDefault()

        const newPin = {
            title: title,
            description: description,
            rating: rating,
            lat: newPlace.lat,
            lng: newPlace.lng
        }

        try {
            const res = await axios.post('pins', newPin)
            setPins([...pins, res.data])
            setNewPlace(null)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onDblClick={handleAddPlace}
            doubleClickZoom={false}
            transitionDuration={200}
        >
            {
                pins.map(pin => (
                    <React.Fragment key={pin._id}>
                        <Marker latitude={pin.lat} longitude={pin.lng} offsetLeft={-viewport.zoom * 2} offsetTop={-viewport.zoom * 4}>
                            <RoomIcon style={{
                                fontSize: viewport.zoom * 4,
                                color: (auth.user && pin.username === auth.user?.username) ? "tomato" : "slateblue",
                                cursor: "pointer"
                            }}
                                      onClick={() => handleMarkerClick(pin._id, pin.lat, pin.lng)}/>
                        </Marker>
                        {
                            pin._id === currentPlaceId &&
                            <Popup
                                latitude={pin.lat}
                                longitude={pin.lng}
                                closeButton={true}
                                closeOnClick={false}
                                offsetLeft={10}
                                offsetTop={-32}
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
                                            {Array(pin.rating).fill(<StarIcon className="star"/>)}
                                            {Array(5 - pin.rating).fill(<StarIcon className="star-empty"/>)}
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
            {
                newPlace &&
                <Popup
                    latitude={newPlace.lat}
                    longitude={newPlace.lng}
                    closeButton={true}
                    closeOnClick={false}
                    offsetLeft={30}
                    offsetTop={5}
                    onClose={() => setNewPlace(null)}
                    anchor="left">
                    <div>
                        <form className="formPin" onSubmit={handleSubmitNewPlace}>
                            <div className="input-section">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" required
                                       placeholder="Put location title"
                                       onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className="input-section">
                                <label htmlFor="description">Review</label>
                                <textarea name="description" id="description" rows="1" required
                                          placeholder="Tell something about this place"
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className="input-section">
                                <label htmlFor="rating">Rating</label>
                                <select name="rating" id="rating" required
                                        onChange={(e) => setRating(parseInt(e.target.value))}>
                                    <option value="">Pick a rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <button type="submit" className="submitButton">Add Pin</button>
                        </form>
                    </div>
                </Popup>
            }
        </ReactMapGL>
    )
}