import React, {useState, useEffect} from "react";
import useFetch from "../customHooks/useFetch";
import { APIbase, selectXColumns } from "../config";

const DateColumns = ({func})=>{
	const url = APIbase + selectXColumns;
	const {data} = useFetch(url);
	const [column, setColumn] = useState(null);

	//onEffect sends the updated state instead of previous state
	useEffect(()=>func(column));


	const change = (value)=>{
		setColumn(value);
	}

	if(!data){return}
	let key = 1;
	return(
		<div
			className="menu-section"
		>
			<h3>Date to Graph</h3>
			<select name="date" id="date" onChange={(event)=>change(event.target.value)}>
				<option value="null">Select a date</option>
				{data.data.map((d)=>(
					<option value={d} key={key++}>{d.replaceAll('_', ' ')}</option>
				))}
			</select>
		</div>
		
	)
}

export default DateColumns;