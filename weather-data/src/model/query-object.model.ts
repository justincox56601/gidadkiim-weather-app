export interface QueryObjectmodel{
	object: string,
	fields: Array<string>,
	filter: Array<QueryFilterModel>,

}

export interface QueryFilterModel{
	field: {
		[operator:string]: [value:string]
	}
}
