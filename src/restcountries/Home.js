import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name,flags').then(res => {
            setCountries(res.data);
        })
    }, []);

    const handleSort = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
    };

    const sortedList = countries.slice().sort((a, b) => {
        const cityA = a.name.common.toUpperCase();
        const cityB = b.name.common.toUpperCase();
        if (sortOrder === "asc") {
            return cityA < cityB ? -1 : cityA > cityB ? 1 : 0;
        } else {
            return cityA > cityB ? -1 : cityA < cityB ? 1 : 0;
        }
    });

    const filteredList = sortedList.filter((item) => {
        return item.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.official.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <button onClick={handleSort}>
                Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <input
                type="text"
                placeholder="Search by name or flag"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h1>List of Countries</h1>
            {filteredList.map((country, index) => (
                <div key={index} style={{marginBottom: "20px"}}>
                    <h2 style={{color: 'red'}}> Country Name: {country.name.common}</h2>
                    <h3>Official Name: {country.name.official}</h3>
                    <h3>Native Name:</h3>
                    {Object.entries(country.name.nativeName).map(([key, value]) => (
                        <h4 key={key}>- {key}: {value.common}</h4>
                    ))}
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{width: "200px"}}/>
                </div>
            ))}
        </div>
    );
}
