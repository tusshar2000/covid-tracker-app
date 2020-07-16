import React from 'react';

//we made our code readable from adding index.js file in components for
//importing like this.
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from "./api" //no need to explicitly specify from location for index files.

import CorornaImage from "./images/image.png"
class App extends React.Component {
    //No need to call constructor for state.
    state = {
        data: {},
        country: '',
    }

    //componentDidMount is special and thus we can call async in front of it 
    //instead of calling it after the word.
    // From the component lifecycle post, we observed that componentDidMount
    // is the best place to make side effects like making http requests. 
    // Because componentDidMount executes only once in lifetime of a component. 
    // once http request gets completed we can update our state asynchronously 
    // and page will re-render with that updates.
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        // see how we called the same function with Parameter.
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={CorornaImage} alt="COVID-19"/>
                {/* destructured data above so dont use "this.state.data" */}
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;