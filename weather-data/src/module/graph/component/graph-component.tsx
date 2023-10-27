import React, { useState } from "react";
import {Line, Bar, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS} from 'chart.js/auto';
import { GraphService } from "../service";
import { GraphModel } from "../model";
import { DataService } from "@/service";

interface Props{
	config: any,
	_dataService: DataService
}

export function GraphComponent({config, _dataService}: Props){
	//this component shows the data in graph form
	
	/**
	 * 1. convert menuConfig into a query to get data from DB
	 * 1.1 query will need the citites, the datapoints, and the start and end data
	 * 1.1.1 - select datapoint, city, date, from table where date between start and end, and cities in (citites)
	 * 2. convert rawdata to a graph config
	 */
	const _graphService: GraphService = GraphService.getGraphService();
	
	const rawData = _dataService.get<rawData>({
		object: 'weatherData',
		fields: ['_id', 'year', 'city', config.datapoint],
		filter:[
			{
				date: 'between config.startDate and config.endDate'
			},
			{
				city: 'IN (config.cities)'
			}
		]
	})
	
	//sort data, group data, make the graph model
	
	const graphConfig: GraphModel = _graphService.getGraphConfig<rawData>({
		datasets: rawData,
		xAxis: 'year', //date - can hard code this for now as it is the only option I will give
		yAxis: config.dataPoint,
		key: 'city', // can hard code this for now as it is the only option I will give
	})
	
	const colorMap: Map<string, string> = new Map()
	for(const ds of config.dataSets){
		colorMap.set(ds.city, ds.color)
	}
	for(const dataset of graphConfig.datasets){
		if(colorMap.has(dataset.label)){
			dataset.backgroundColor = [colorMap.get(dataset.label) as string];
			dataset.borderColor = colorMap.get(dataset.label);
		}
		
	}

	return(
		<div 
			style={{width:'1000px'}}>
			<Scatter
				data={graphConfig}
			/>
		</div>
		
	)
}

interface rawData{
	id: number,
	year?: number,
	userGain?: number,
	userLost?: number,
	city?: string
}