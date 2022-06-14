
import './style.min.css';
import {useEffect, useState} from 'react';
import {APIbase, selectData} from './config.js';
import BarChart from './components/BarChart'
import Menu from './components/Menu'
import BackgroundImage from './components/BackgroundImage';
import useFetch from './customHooks/useFetch';
import axios from 'axios';

function App() {
	//const url = APIbase + 'get_data?ajax=get_raw_data&city=1,2&column=air_temperature&start=11/07/2021&end=11/08/2021'
	const url = APIbase + selectData + '/1/air_temperature/2021-11-07/2021-11-08';
	const {data, loading, error, refetch} = useFetch(url)
	if(loading) return <h1>LOADING...</h1>;
	if(error) console.log(error);
	if(data){
		return (
			<div
				className='app'
			>
				<Menu func={refetch}/>
				<BarChart
					data = {data.data}
				/>
			</div>
		);
	}
	
}


export default App;
