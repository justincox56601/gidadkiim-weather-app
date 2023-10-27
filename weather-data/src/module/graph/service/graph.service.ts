import { DataService } from "@/service";
import { GraphModel, GraphDataModel } from "../model";

export class GraphService{
	private static _singleton: GraphService;

	private constructor(){
	}

	public static getGraphService():GraphService{
		if(GraphService._singleton == null){
			GraphService._singleton = new GraphService();
		}
		return GraphService._singleton
	}

	public getGraphConfig<Tdata>(params: {
		datasets: Array<Tdata>, 
		xAxis: keyof Tdata,
		yAxis: keyof Tdata,
		key: keyof Tdata,
	}):GraphModel{
		const sortedData = this._sortDataset(params.datasets, params.xAxis)
		const labels: Array<string> =  this._getLabels(sortedData, params.xAxis)
		const dataMap: Map<string, Array<Tdata>> = this._mapData(params.datasets, params.key)
		const datasets: Array<GraphDataModel> = []

		for(const [key, dataset] of dataMap){
			datasets.push({
				label: key, //what does this piece of data represent
				data: this._getDataset(dataset, params.xAxis, params.yAxis),
				backgroundColor: ['rgb(75, 192, 192)'], // array of colors to fill in bars / pie wedges / line points
				borderColor: 'blue', //color for border around bars / pie wedges / color of line for line chart
				borderWidth: 2, //thickness of the border
				showLine: true,
			})
		}

		return {
			labels: labels,
			datasets: datasets,
		}
	}

	//these will go into the data service
	private _getLabels<Tdata>(data: Array<Tdata>, label: keyof Tdata): Array<string>{
		const response: Set<string> = new Set()
		for(const d of data){
			response.add(d[label] as string)
		}

		return Array.from(response)
	}

	private _getDataset<Tdata>(data: Array<Tdata>, xAxis: keyof Tdata, yAxis:keyof Tdata): Array<{x:any, y:any}>{
		return data.map(el => {
			return {
				x: el[xAxis],
				y: el[yAxis] as number
			}
		})
	}

	private _sortDataset<Tdata>(data: Array<Tdata>, xAxis: keyof Tdata): Array<Tdata>{
		return data.sort((a,b)=> {return a[xAxis] - b[xAxis]})
	}

	private _mapData<Tdata>(data: Array<Tdata>, key: keyof Tdata): Map<string, Array<Tdata>>{
		const response: Map<string, Array<Tdata>> = new Map();

		for(const d of data){
			let k: string = d[key] as string
			if(response.get(k) == null){
				response.set(k, [])
			}

			response.get(k)?.push(d)
		}

		return response
	}

}

interface rawData{
	id: number,
	year?: number,
	userGain?: number,
	userLost?: number
}