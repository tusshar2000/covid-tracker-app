import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    try {
        let changeableUrl = url;
        if(country){
            changeableUrl = `${url}/countries/${country}`
        }
        // Using axios.get(url) we then get a promise which returns a
        // response object.

        // Since we destructure data here, lot's of syntax writing has been saved,
        // and instead of assigning new variables object, we directly returned the value.
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl); //wait until promise is returned

        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error) {

    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    }
    catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name);

    } catch (error) {

    }
}