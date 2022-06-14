import React, {useState, useEffect} from "react";
import useFetch from "../customHooks/useFetch";
import { APIbase, selectDates } from "../config";

const DateSelect = ({func}) =>{
	const url = APIbase + selectDates;
	const {data} = useFetch(url);
	const [dates, setDates] = useState({startDate:null, endDate:null})

	//callback to update start date
	const changeStart = (date)=>{
		let updatedStart = {startDate:date}
		setDates(dates=>({
			...dates,
			...updatedStart,
		}))
	}

	//callback to update end date
	const changeEnd = (date)=>{
		let updatedEnd = {endDate:date}
		setDates(dates=>({
			...dates,
			...updatedEnd,
		}))
	}

	//useEffect to send back updated dates
	useEffect(()=>func(dates));

	if(!data){return}
	
	let start = new Date(data.data.start_date).toISOString().slice(0,10);
	let end  = new Date(data.data.end_date).toISOString().slice(0,10);
	return(
		<div
			className="menu-section"
		>
			<h3>Date Select</h3>
			<p>Start Date</p>
			<input type="date" name="startDate" id="startDate" min={start} max={end} onChange={(event)=>changeStart(event.target.value)} />
			<p>End Date</p>
			<input type="date" name="endDate" id="endDate" min={start} max={end} onChange={(event)=>changeEnd(event.target.value)}/>


		</div>
	)
}

export default DateSelect;