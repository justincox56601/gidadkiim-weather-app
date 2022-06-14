import React, {useState, useEffect} from "react";
import useFetch from "../customHooks/useFetch";
import { APIbase, selectCities } from "../config";

const CitySelect = ({func})=>{
	const url = APIbase + selectCities;
	const {data} = useFetch(url)
	const [cities, setCities] = useState([])

	//callback to update state of the cities
	const change = (element) =>{
		if(element.checked){
			setCities([...cities, element.id]);
			
		}else{
			setCities(cities.filter(item=>item!==element.id))
		}
		
	}

	//useeffect sends the updated cities state instead of the previous state
	useEffect(()=>func(cities))

	if(!data){return}
	return(
		<div
			className="menu-section"
		>
			<h3>City Select</h3>
			{data.data.map((city)=>(
				<div key={city.ID}>
					<input type="checkbox" name="cities" id={city.ID} onChange={(event)=>change(event.target)}/>
					<label htmlFor={city.ID}>{city.Name}</label>
				</div>
				
			))}
			
		</div>
	)
}

export default CitySelect;