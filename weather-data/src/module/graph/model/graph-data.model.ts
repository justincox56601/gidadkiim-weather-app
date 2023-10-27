export interface GraphDataModel{
	label: string,
	data: Array<{x:any, y:any}>,
	backgroundColor?: Array<string>,
	borderColor?: string,
	borderWidth?: number,  
	showLine?: boolean,
}