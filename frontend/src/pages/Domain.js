import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import Button from '@mui/material/Button';

import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Domain()  {
    const { domainParam } = useParams();
    const [domain, setDomain] = useState({});
    const [cities, setCities] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [cityDetail, setCityDetail] = useState(false);
    
    const [cityLoading, setCityLoading] = useState(false);

    const loadData = (keyword="") => {
        axios
            .get(`${serverUrl}/api/contents/domaindetail/?name=${domainParam}`)
            .then((res) => {    
                setDomain(res.data.domaininfo);
                setCities(res.data.cities);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleCityClick = (e) => {
        e.preventDefault();
        const cityParam = e.target.innerHTML;

        displayCityInfo();
        setCityLoading(true);
        setCityDetail({"domain":domainParam, "city":cityParam, "description":"Loading..."});
        axios
            .get(`${serverUrl}/api/contents/citydetail/?domain=${domainParam}&city=${cityParam}`)
            .then((res) => {  
                setCityDetail(res.data);
                setCityLoading(false);
            })
            .catch((err) => console.log(err));
    }

    const displayCityInfo = () => {
        setModalOpen(true);
    }

    const toggle = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <main className="container-fluid" id="domain-page">
            <div className="bg1">
                <div className="bg2">
                    <div className="row">
                        <div className="col-sm-8">
                            <div id="domain-section">
                                <h1>{ domain.name }</h1>
                                <p>{ domain.description }</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div id="cities-section">
                                <h3>2000 cities in the UK</h3>
                                {cities.map(item =>
                                    <Button variant="outlined" className="city-item">
                                        <Link to={ 'city/' + item.name } onClick={ handleCityClick }>{item.name}</Link>
                                    </Button>
                                )} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen ? (
                <Modal
                    toggle={toggle}
                    cityDetail={ cityDetail }
                />
            ) : null}
        </main>
    );
}