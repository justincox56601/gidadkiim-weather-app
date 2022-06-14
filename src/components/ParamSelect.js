import React, {useState, useEffect} from "react";
import useFetch from "../customHooks/useFetch";
import { APIbase, selectParams } from "../config";

const ParamSelect = ({func})=>{
	const url = APIbase + selectParams;
	const {data} = useFetch(url);
	const [param, setParam] = useState(null);

	//onEffect sends the updated state instead of previous state
	useEffect(()=>func(param));


	const change = (value)=>{
		setParam(value);
	}

	if(!data){return}
	let key = 1;
	return(
		<div
			className="menu-section"
		>
			<h3>Parameter to Graph</h3>
			<select name="param" id="param" onChange={(event)=>change(event.target.value)}>
				<option value="null">Select a parameter</option>
				{data.data.map((d)=>(
					<option value={d} key={key++}>{d.replaceAll('_', ' ')}</option>
				))}
			</select>
		</div>
		
	)
}

export default ParamSelect;