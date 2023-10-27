
import { QueryObjectmodel } from '@/model/query-object.model';
import { WeatherData } from '../../public/weatherdata';


export class QueryService {
	protected static _singleton: QueryService;

	private constructor(){}

	public static createQuerySerivce(){
		if(QueryService._singleton == null){
			QueryService._singleton = new QueryService()
		}
		return QueryService._singleton;
	}

	public fetchRecords<T>(query: QueryObjectmodel){
		console.log(query)
	}

}
