import React, { useState } from "react";
import { SelectOptionModel } from "@/model";
import { MenuDataPointEnum } from "../enum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalComponent, ModalConfigModel } from "@/module";
import { SketchPicker} from 'react-color';

interface Props{
	onSubmit: (args: any) =>void
}
export function MenuComponent({onSubmit}: Props){
	const getRandomHexValue = () =>{
		let n = (Math.random() * 0xfffff * 1000000).toString(16);
  		return '#' + n.slice(0, 6);
	}
	const [formState, setFormState] = React.useState({
		startDate: undefined,
		endDate: undefined,
		dataPoint: undefined,
		dataSets:[
			{
				city: '',
				color: getRandomHexValue()
			}
		]
	})
	const [openModal, setOpenModal] = React.useState(false)
	const [modalConfig, setModalConfig] = React.useState({} as ModalConfigModel)

	const _handleChange = (event: any): void =>{
		setFormState({
			...formState,
			[event.target.id] : event.target.value
		})
	}

	const _addDataSet = () =>{
		setFormState({
			...formState,
			dataSets: [
				...formState.dataSets,
				{
					city:'',
					color:getRandomHexValue()
				}
			]
		})
	}

	const _removeDataSet = (event: any, index: number):void =>{
		const dataSetsCopy = Array.from(formState.dataSets);
		dataSetsCopy.splice(index, 1)
		setFormState({
			...formState,
			dataSets: dataSetsCopy
		})
	}

	const _updateDataSetCity = (event: any, index: number): void =>{
		const dataSetsCopy = Array.from(formState.dataSets)
		dataSetsCopy[index].city = event.target.value;
		setFormState({
			...formState,
			dataSets: dataSetsCopy
		})
		console.log(formState)
	}

	const _onSubmit = ():void =>{
		onSubmit(formState)
	}

	const _openColorPicker = (event: any, index: number):any =>{
		const cityObj = formState.dataSets[index]
		setOpenModal(true)
		setModalConfig({
			title: 'Pick a color for Bemidji',
			body: '',
			component: <SketchPicker
						color={cityObj.color}
						onChange={(color)=>{_changeColor(color, index)}}	
						></SketchPicker>,
			afterClosed: ()=>{setOpenModal(false)}
		})
	}

	const _changeColor = (color: {hex:string}, index: number) =>{
		const dataSetsCopy = Array.from(formState.dataSets);
		dataSetsCopy[index].color = color.hex;
		
		setFormState({
			...formState,
			dataSets: dataSetsCopy,
		})
	}

	

	const dataPointSelectOptions: Array<SelectOptionModel> = [
		{
			text: '',
			value: undefined
		},
		{
			value: MenuDataPointEnum.USER_GAIN,
			text: 'Users Gained'
		},
		{
			value: MenuDataPointEnum.USER_LOST,
			text: 'Users Lost'
		}
	]
	const citySelectOptions: Array<SelectOptionModel> = [
		{
			text: '',
			value: undefined
		},
		{
			value: 'Bemidji',
			text: 'Bemidji'
		},
		{
			value: 'Casslake',
			text: 'CassLake'
		}
	]


	return(
		<div>
			{openModal && <ModalComponent
				config={{
					title: modalConfig.title,
					body: modalConfig.body,
					component: (modalConfig.component),
					afterClosed: modalConfig.afterClosed,
				}}
			></ModalComponent>}
			<form >
				<div>
					<label htmlFor="startDate">Start Date</label>
					<input type="date" name="startDate" id="startDate" onChange={_handleChange}/>
					<label htmlFor="endDate">End Date Date</label>
					<input type="date" name='endDate' id='endDate' onChange={_handleChange}/>
				</div>
				<div>
					<label htmlFor="dataPoint">Data Point</label>
					<select name="dataPoint" id="dataPoint" onChange={_handleChange}>
						{
							dataPointSelectOptions.map((el, index) =>{
								return <option value={el.value} key={index}>{el.text}</option>
							})
						}
					</select>
				</div>
				{
					formState.dataSets.map((dataSet, dsIndex)=>{
						return <div key={dsIndex}>
									<label htmlFor="city">City</label>
									<select name="city" id="city" value={dataSet.city} onChange={(event)=>_updateDataSetCity(event, dsIndex)}>
										{
											citySelectOptions.map((el, index)=>{
												return <option value={el.value} key={index}>{el.text}</option>
											})
										}
									</select>
									<FontAwesomeIcon icon={faPalette} style={{color: dataSet.color}} onClick={(event) =>{_openColorPicker(event, dsIndex)}}/>
									<FontAwesomeIcon icon={faCircleXmark} style={{color:'red'}} onClick={(event) => _removeDataSet(event, dsIndex)}/>
								</div>
					})
				}
				<button type='button' onClick={_addDataSet}>Add City</button>
				<button type="button" onClick={_onSubmit}>Submit</button>
			</form>
		</div>
	)
}