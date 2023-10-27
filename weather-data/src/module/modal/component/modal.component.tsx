import React from "react";
import { ModalConfigModel } from "../model";

type Props = {
	config: ModalConfigModel
}
export function ModalComponent({config}:Props){
	return(
		<div 
			style={modalContainer}
			onClick={config.afterClosed}
		>
			<div style={modalBox}>
				<h3>{config.title}</h3>
				<p>{config.body}</p>
				<div className="modal-component">
					{config.component}
				</div>
				<button onClick={config.afterClosed}>Close</button>
			</div>
			
		</div>
	)
}

const modalContainer = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	zIndex: 10,
	backgroundColor: 'rgba(0,0,0,0.15)',
	display: 'grid',
	justifyContent: 'center',
	alignItems: 'center',
}

const modalBox = {
	width: 'max-content',
	height: 'max-content',
	backgroundColor: 'white',
	padding: '1rem',
}