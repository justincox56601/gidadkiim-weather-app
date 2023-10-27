import { GraphOptionsModel } from "./graph-options.model";
import { GraphDataModel } from "./graph-data.model";

export interface GraphModel{
	labels: Array<string>
	datasets: Array<GraphDataModel>
	options?: GraphOptionsModel
}