import React from "react";
import { localUrl } from "../config";

const BackgroundImage = ()=>{
	return(
		<div className="background">
			<video autoplay muted loop>
				<source src= {localUrl + 'media/forest_rain.mp4'}></source>
			</video>
		</div>
	)
}

export default BackgroundImage