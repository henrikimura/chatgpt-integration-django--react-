import React, { Component, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';

import image1 from "../assets/images/light_1.webp";
import image2 from "../assets/images/light_2.webp";

import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Home()  {
    const maxLength = 500;
    const [domainInfos, setDomainInfos] = useState([]);
    const [cityInfos, setCityInfos] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cityInputValue, setCityInputValue] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const [domainLoading, setDomainLoading] = useState(true);
    const [cityLoading, setCityLoading] = useState(true);
    const [updateDomain, setUpdateDomain] = useState(false);

    const [open, setOpen] = useState(false);
    const loading = open && cityInfos.length === 0;

    const loadDomainList = () => {
        axios
            .get(`${serverUrl}/api/contents/`)
            .then((res) => {
                setDomainInfos(res.data);
                setDomainLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const loadCityList = (keyword="") => {
        axios
            .get(`${serverUrl}/api/contents/citys/?keyword=${keyword}`)
            .then((res) => {
                setCityInfos(res.data);
                setCityLoading(false);
            })
            .catch((err) => console.log(err));
    }

    const actionReloadDescription = (domain) => {
        setUpdateDomain(true);
        axios
            .get(`${serverUrl}/api/contents/domainupdate/?domain=${domain.name}`)
            .then((res) => {
                setDomainInfos(domainInfos.map(item => item.name == domain.name ? { ...domain, description:res.data.description } : item))
                setUpdateDomain(false);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        loadDomainList();
        loadCityList();
    }, [])

    useEffect(() => {
        if (!cityLoading && !domainLoading) setPageLoading(false);
    }, [cityLoading, domainLoading])

    useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        loadCityList();
    
        return () => {
          active = false;
        };
      }, [loading]);
    
    useEffect(() => {
        if (!open) {
            setSelectedCity("");
        }
    }, [open]);

    return (
        <main>
            <div className="bg1">
                <div className="bg2">
                    <div id="intro-panel">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 p-0 mx-auto">
                                    <div className="card p-3" id="home-card">
                                        <div className="mb-4">
                                            <h3>Websites in the Cities of the United Kingdom</h3>
                                            <p>Let's know about 100 Websites and 2000 Cities</p>
                                            <form id="search-form">
                                                <Autocomplete
                                                    className="search-field"
                                                    id="select-domain"
                                                    disablePortal
                                                    options={ domainInfos.map(item => item.name) }
                                                    value={ selectedDomain }
                                                    onChange={(event: any, newValue: string | null) => {
                                                        setSelectedDomain(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} label="Domain" />}
                                                />
                                                <Autocomplete
                                                    className="search-field"
                                                    id="select-city"
                                                    sx={{ width: 300 }}
                                                    open={open}
                                                    onOpen={() => {
                                                        setOpen(true);
                                                    }}
                                                    onClose={() => {
                                                        setOpen(false);
                                                    }}
                                                    isOptionEqualToValue={(option, value) => option.title === value.title}
                                                    getOptionLabel={(option) => option}
                                                    options={ cityInfos.map(item => item.name) }
                                                    onChange={(event: any, newValue: string | null) => {
                                                        setSelectedCity(newValue);
                                                    }}
                                                    inputValue={ cityInputValue }
                                                    onInputChange={(event, newInputValue) => {
                                                        setCityInputValue(newInputValue);
                                                        loadCityList(newInputValue);
                                                    }}
                                                    loading={loading}
                                                    renderInput={(params) => (
                                                        <TextField
                                                        {...params}
                                                        label="City"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            endAdornment: (
                                                            <React.Fragment>
                                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                            ),
                                                        }}
                                                        />
                                                    )}
                                                    />
                                                <Button id="btn-search"><SearchIcon /></Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-6 -col-sm-6">
                                    <div id="image-slider-box">
                                        <div id="image-slider1">
                                            <img className="MuiBox-root css-12nqhhl" alt="light_1" src={ image1 } />
                                            <img className="MuiBox-root css-12efcmn" alt="light_1" src={ image1 } />
                                        </div>
                                        <div id="image-slider2">
                                            <img className="MuiBox-root css-12nqhhl" alt="light_2" src={ image2 } />
                                            <img className="MuiBox-root css-12efcmn" alt="light_2" src={ image2 }  />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div id="domain-box">
                                    { updateDomain && <p>Updating...</p> }
                                    { domainInfos.map(item => <div className="domain-item">
                                        <Link className="domain-title" to={ 'domain/' + item.name }>
                                            <h3>{item.name}</h3>
                                        </Link>
                                        <Button onClick={ () => actionReloadDescription(item) }>
                                            <ReplayIcon />
                                        </Button>
                                        <p className="domain-description">{item.description.slice(0, maxLength)}...</p>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}