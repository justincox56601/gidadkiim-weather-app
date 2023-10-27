import {QueryService} from "../../../service/query.service";

export class MenuService{
	protected static _singleton: MenuService
	private _queryService: QueryService;

	private constructor(
		queryService: QueryService
	){
		this._queryService = queryService
	}

	public static createMenuSerivce(
		queryService: QueryService
	){
		if(MenuService._singleton == null){
			MenuService._singleton = new MenuService(queryService)
		}

		return MenuService._singleton
	}

	public fetchCities(): Array<string>{
		return this._queryService.fetchCities()
	}

	public fetchDataSeries(): Array<string>{
		return this._queryService.fetchDataSeries()
	}
}