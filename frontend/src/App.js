import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';

function App() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -7.2575,
        longitude: 112.7521,
        zoom: 12
    });

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            >
                <Marker latitude={-7.2575} longitude={112.7521} offsetLeft={0} offsetTop={-10}>
                    <RoomIcon style={{fontSize: viewport.zoom * 5, color: "slateblue"}} />
                </Marker>
                <Popup
                    latitude={-7.2575}
                    longitude={112.7521}
                    closeButton={true}
                    closeOnClick={false}
                    offsetLeft={40}
                    offsetTop={0}
                    anchor="left" >
                    <div className="card">
                        <div className="info-section">
                            <label>Place</label>
                            <h4 className="place">Eiffel Tower</h4>
                        </div>
                        <div className="info-section">
                            <label>Review</label>
                            <p>Beautiful place, I like it.</p>
                        </div>
                        <div className="info-section">
                            <label>Rating</label>
                            <div className="stars">
                                <StarIcon/>
                                <StarIcon/>
                                <StarIcon/>
                                <StarIcon/>
                                <StarIcon/>
                            </div>
                        </div>
                        <div className="info-section">
                            <label>Information</label>
                            <p className="username">Created By <strong>anggadarkprince</strong></p>
                            <p className="date">1 hour ago</p>
                        </div>
                    </div>
                </Popup>
            </ReactMapGL>
        </div>
    );
}

export default App;
