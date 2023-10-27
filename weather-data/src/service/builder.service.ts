import {DataService} from "./data.service";
import {MenuService} from "../module/menu/service/menu.service";
import {QueryService} from "./query.service";

export class BuilderService{
	public static build(queryService: QueryService): ServicesInterface{
		return{
			menuService: MenuService.createMenuSerivce(queryService),
			dataService: DataService.createDataSerivce(queryService),
		}
	}
}

interface ServicesInterface{
	menuService: MenuService;
	dataService: DataService;
}