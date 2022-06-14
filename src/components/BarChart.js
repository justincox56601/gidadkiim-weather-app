import React from 'react'
import {Bar, Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart  = ({data}) =>{
	const chartData = setChartData(data);
	
	if(chartData){
		const startDate = new Date(chartData.labels[0]).toLocaleString();
		const endDate = new Date(chartData.labels[chartData.labels.length-1]).toLocaleString();
		const options = {
			plugins:{
				title: {
					display: true,
					text: `${chartData.keys[2]} in ${chartData.cities.join(', ')} between ${startDate} and ${endDate}`,
					position: 'top',
					font: {
						weight: 'Bold',
						size: 24,
					}
				}
			}
		}
		return (
			<div
				className='chart'
			>
				<Line
					data = {chartData}
					options = {options}
				/>
			</div>
			
		)
	}
	
}

function setChartData(data){
	if(data != null){
		//get keys
		const keys = Object.keys(data[0]) //name, date, y value
		//get cities 
		let cities = []
		for(const key in Object.keys(data)){
			if(!cities.includes(data[key]['name'])){
				cities.push(data[key]['name']);
			}
		}
		
		//get labels
		const labels = [...new Set(data.map((data)=>data[keys[1]]))]
		//get datasets
		let dataSets = []
		cities.forEach(city=>{
			const temp = {};
			temp['label'] = city;
			temp['data'] = data.filter((value, index, self)=>{
				return value['name'] === city; 
			});
			temp.data = temp.data.map((data)=>data[keys[2]])
			
			temp.backgroundColor = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.6)`
			
			dataSets.push(temp);
		});

		return {
			cities: cities,
			keys: keys,
			labels: labels,
			datasets: dataSets
		}

	}
	
}

export default BarChart