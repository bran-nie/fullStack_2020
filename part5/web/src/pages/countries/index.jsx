import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash-es";

const CountryItem = ({ country, one }) => {
    console.log(one);
    const [showInfo, setShowInfo] = useState(one);

    const handleShow = () => {
        setShowInfo(!showInfo);
    };
    return (
        <div className="country">
            <h4 className="name">
                {country.name}
                <button style={{ marginLeft: "15px" }} onClick={handleShow}>
                    {showInfo ? "hidden" : "show"}
                </button>
            </h4>
            {showInfo && (
                <div className="info">
                    <p>capital: {country.capital}</p>
                    <p>populaton: {country.population}</p>
                    <h6>languages</h6>
                    <ul>
                        {country.languages.map((language) => {
                            return <li key={language.name}>{language.name}</li>;
                        })}
                    </ul>
                    <img src={country.flag} alt="" />
                </div>
            )}
        </div>
    );
};

const CountryList = ({ countries, len }) => {
    const one = len === 1;
    return (
        <div className="country-list">
            {countries.map((country) => {
                return (
                    <CountryItem
                        key={country.name}
                        country={country}
                        one={one}
                    />
                );
            })}
        </div>
    );
};

const Country = () => {
    const [searchVal, setSearchVal] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const api = "https://restcountries.eu/rest/v2/name/";
        const name = searchVal.trim();
        // 除了字母和空格
        const r = /[^a-zA-Z\s]/;
        if (name === "" || r.test(name)) {
            setCountries([]);
            return;
        }
        axios
            .get(`${api}${name}`)
            .then((res) => {
                setCountries(res.data);
            })
            .catch((error) => {
                console.log(error);
                setCountries([]);
            });
    }, [searchVal]);

    const saveVal = debounce((value) => {
        setSearchVal(value);
    }, 500);
    const handleSearchValChange = (e) => {
        saveVal(e.target.value);
    };

    const countryCount = countries.length;
    let countryEle;
    if (countryCount > 10) {
        countryEle = <div>Too many matches, specify another filter</div>;
    } else {
        countryEle = <CountryList countries={countries} len={countryCount} />;
    }
    return (
        <>
            <h2>Country</h2>
            <div className="search">
                <span>find countries: </span>
                <input onChange={handleSearchValChange} />
            </div>
            <div className="countries">{countryEle}</div>
        </>
    );
};

export default Country;
