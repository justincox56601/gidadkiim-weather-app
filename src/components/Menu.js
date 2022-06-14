import React, {useState} from 'react'
//import useFetch from '../customHooks/useFetch';
import { APIbase, selectData } from '../config';
import CitySelect from './CitySelect';
import ParamSelect from './ParamSelect';
import DateSelect from './DateSelect';
import DateColumns from './DateColumns';

const Menu = ({func})=>{
	const url = APIbase + selectData;
	const [city, setCity] = useState(null)
	const [param, setParam] = useState(null)
	const [dates, setDates] = useState({})
	const [showMenu, setShowMenu] = useState(true)
	const [diffx, setDiffx] = useState(0);
	const [diffy, setDiffy] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [styles, setStyles] = useState({});
	const [dateColumn, setDateColumn] = useState({});

	const fetchData = ()=>{
		const obj = {
			city: city.join(','),
			date: dateColumn,
			param: param,
			start: dates.startDate,
			end: dates.endDate
		}
		
		// check if any of the data is null
		if( Object.values(obj).some(val=>(val===null))){
			alert("please fill out all parameters");
			return;
		}

		//make query
		const query = Object.keys(obj).map((key)=>{
			return obj[key];
		}).join('/');

		func(url + '/' + query);
	}

	const dragStart = (e) =>{
		setDiffx(e.screenX - e.currentTarget.getBoundingClientRect().left);
		setDiffy(e.screenY - e.currentTarget.getBoundingClientRect().top);
		setDragging(true);
	}

	const drag = (e) =>{
		if(dragging){
			let left = e.screenX - diffx;
			let top = e.screenY - diffy;

			setStyles({
				left: left,
				top:top
			});
		}
	}

	const dragEnd = (e) =>{
		setDragging(false);
	}

	return (
		<div 
			className='menu shadow'
			style={styles}
			onMouseDown = {dragStart}
			onMouseMove = {drag}
			onMouseUp = {dragEnd}
		>
			<div
				className='menu-section menu-toggle'
			>
				<h2>Menu</h2>
				<button
					onClick={()=>setShowMenu(!showMenu)}
				>
					{showMenu?'Hide':'Show'}
				</button>
			</div>
			
			{showMenu?<>
				<CitySelect
					func={setCity} //will come back as an array of id numbers
				/>
				<DateColumns
					func ={setDateColumn} // will come back with the date column to use
				/>
				<ParamSelect 
					func={setParam} //comes back as a string for parameter
				/>
				<DateSelect 
					func={setDates} //comes back as an object {startDate, endDate}
				/>
				<button
					onClick={()=>fetchData()}
				>
					Graph Data
				</button>
			</>:null}
			
		</div>
		
	)
}

export default Menu;