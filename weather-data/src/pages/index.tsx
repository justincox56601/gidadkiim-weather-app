import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import { Line, Chart, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ScriptableContext, registerables } from 'chart.js/auto'
import { WeatherData } from '../../public/weatherdata';
ChartJS.register(...registerables);
import {
	QueryService, 
	MenuService, 
	BuilderService,
	DataService
} from '@/service';
import { 
	GraphComponent, 
	MenuComponent
 } from '@/module';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const _queryService = QueryService.createQuerySerivce();
	const {
		menuService, dataService
	} = BuilderService.build(_queryService)
	
	const [weatherData, setWeatherData] = useState(WeatherData);
	const [data, setData] = useState();
	const [graphInput, setGraphInput] = useState({
		startDate: undefined,
		endDate: undefined,
		dataPoint: 'userGain',
		dataSets:[
			{
				city: 'Bemidji',
				color: 'red'
			}
		]
	});

	const configFromMenu = {
		startDate: 2017,
		endDate: 2022,
		dataPoint: 'userGain',
		dataSets:[
			{
				city: 'Bemidji',
				color: 'pink'
			},
			{
				city: 'Casslake',
				color: 'blue'
			}
		]
	}

	const menuCallback = (args: any)  =>{
		const data = _queryService.fetchRecords(args)
		setGraphInput(args)
	}


	return (
	<div style={styles}>
		<MenuComponent
			onSubmit={menuCallback}
		></MenuComponent>	
		<GraphComponent 
			config={graphInput}
			_dataService={dataService}
		></GraphComponent>	
	</div>
	)
}

const styles = {
	padding: '3rem'
}
