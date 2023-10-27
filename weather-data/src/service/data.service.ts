import {QueryService} from "./query.service";
export class DataService{
	protected static _singleton: DataService;
	private _queryService: QueryService
	
	private constructor(queryService: QueryService){
		this._queryService = queryService
	}

	public static createDataSerivce(_queryService: QueryService):DataService{
		if(DataService._singleton == null){
			DataService._singleton = new DataService(_queryService)
		}
		return DataService._singleton;
	}

	public get<Tdata>(config:any): Array<Tdata>{
		//implement this later
		console.log(config)
		return fakeData as Array<Tdata>
	}

	public sortData(data: any, sortValue: string): any{
		//implement this later
		return data
	}

	public groupData(data: any, groupBy: Array<string>):any{
		//groups the data by the group by array. eg group into differenct cities
		//returns a map with the groupby value as the key, and the value is a n array of the data points
	}

}

const fakeData = [
	{
		id: 1,
		year: 2016,
		userGain: 80000,
		userLost: 823,
		city: 'Bemidji'
	},
	{
		id: 2,
		year: 2018,
		userGain: 70000,
		userLost: 900,
		city: 'Bemidji'
	},
	{
		id: 3,
		year: 2020,
		userGain: 90000,
		userLost: 700,
		city: 'Bemidji'
	},
	{
		id: 4,
		year: 2022,
		userGain: 10000,
		userLost: 1000,
		city: 'Bemidji'
	},
	{
		id: 5,
		year: 2017,
		userGain: 70000,
		userLost: 823,
		city: 'Casslake'
	},
	{
		id: 6,
		year: 2019,
		userGain: 85000,
		userLost: 900,
		city: 'Casslake'
	},
	{
		id: 7,
		year: 2021,
		userGain: 60000,
		userLost: 700,
		city: 'Casslake'
	},
	{
		id: 8,
		year: 2022,
		userGain: 50000,
		userLost: 1000,
		city: 'Casslake'
	}
]