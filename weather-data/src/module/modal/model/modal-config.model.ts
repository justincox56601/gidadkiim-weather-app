export interface ModalConfigModel{
	title: string,
	body: string,
	component: any,
	afterClosed: (args: any)=>any
}