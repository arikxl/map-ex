'use client';

import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet"
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import eventsData from '../data/events';

export interface Events {
    id: number;
    title: string;
    description: string;
    position: [number, number];
    category: string;
}

const getIcon = (category: string) => {
    switch (category) {
        case 'Art':
            return <i className="fa-solid fa-palette" > </i>
        case 'Military Conflict':
            return <i className="fa-solid fa-person-rifle" > </i>
        case 'Politics':
            return <i className="fa-regular fa-handshake" > </i>
        case 'Cultural Movement':
            return <i className="fa-solid fa-landmark-dome" > </i>
        case 'Science':
            return <i className="fa-solid fa-flask-vial"></i>
        case 'Independence':
            return <i className="fa-regular fa-flag"></i>
        case 'Israel':
            return <i className="fa-solid fa-star-of-david"></i>
        case 'Space':
            return <i className="fa-solid fa-satellite"></i>
        case 'Archaeology':
            return <i className="fa-solid fa-landmark-flag"></i>
        default:
            return <i className="fa-solid fa-scroll" > </i>
    }
}


const MapApp = () => {

    const [activeEvent, setActiveEvent] = useState<Events | null>(null);
    const [favs, setFavs] = useState<number[]>(() => {
        const savedFavs = localStorage.getItem('nextMap-favs');
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    const handleFavs = (eventId: number) => {
        let updatedFavs = favs.filter((id) => id !== eventId);
        if (!favs.includes(eventId)) {
            updatedFavs = [eventId, ...updatedFavs];
        }
        setFavs(updatedFavs);
        localStorage.setItem('nextMap-favs', JSON.stringify(updatedFavs));
    }

    const defaultPosition: [number, number] = [31.2565875, 34.7691391];

    const icon: Icon = new Icon({
        iconUrl: 'marker.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
    const emptyStar = <i className="fa-regular fa-star"></i>;
    const fullStar = (
        <i
            className="fa-solid fa-star"
            style={{
                color: "#fdc401",
            }}
        ></i>
    );


    return (
        <div className='content flex gap-4'>
            <div className="flex flex-col w-4/5 h-full">
                <div className="h-12 ">

                </div>
                <MapContainer zoom={12}
                    center={defaultPosition} className="map-container"
                >
                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    <Marker position={defaultPosition} icon={icon} >
                        <Popup>
                            <div className="popup">
                                <h2><ins>My Home</ins></h2>
                                <p>Beer Sheva</p>
                            </div>
                        </Popup>
                    </Marker>
                    {
                        eventsData.map((event) => (
                            <Marker key={event.id} position={event.position} icon={icon}
                                eventHandlers={{ click: () => setActiveEvent(event) }} />


                        ))
                    }
                    {activeEvent && (
                        < Popup position={activeEvent.position}>
                            <div className="popup">
                                <h2>
                                    <span>{getIcon(activeEvent.category)}</span>
                                    <ins>{activeEvent.title}</ins>
                                </h2>
                                <p>{activeEvent.description}</p>
                                <button onClick={() => handleFavs(activeEvent.id)}>
                                    {favs.includes(activeEvent.id) ? (
                                        <span>{fullStar} Unfavorite</span>
                                    ) : (
                                        <span>{emptyStar} Favorite</span>
                                    )}
                                </button>
                            </div>
                        </Popup >
                    )}
                </MapContainer>
            </div>
            <div className="favs-div">
                <h2 className="">{fullStar} {favs?.length} Favorites Events</h2>
                <ul>
                    {favs
                        ?.map((id) => {
                            return eventsData.find((event) => event.id === id);
                        })
                        .map((event) => {
                            return (
                                <li
                                    key={event?.id}
                                    // className="liked-events__event"
                                    // onClick={() => {
                                    //     handleListItemClick(event?.id as number);
                                    // }}
                                >
                                    <h4><span>{getIcon(event?.category)}</span> {event?.title}</h4>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    )
}

export default MapApp

