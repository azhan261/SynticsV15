//getting API for showing all the data
import axios from 'axios';

export const getBatches = (gender) => (
	console.log(gender),
	axios.post(`https://syntics.co/batchCreation`)
		.then(res => res.data, )
)

export const getBatchsAll = (gender) => (
	console.log(gender),
	axios.post(`https://syntics.co/batchCreation`)
		.then(res => res.data, )
)
//getting API for inserting the data
export const createBatchs = (todo) => fetch("https://syntics.co/batchCreation/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const updateBatch = (todo, id) => fetch(`https://syntics.co/batchCreation/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for getting specific data
export const getBatch = (id) => fetch(`https://syntics.co/batchCreation/${id}`).then(res => res.json())

export const getRegisterationbatchCreation = id => (
	console.log(id),
	axios.post(`https://syntics.co/batchCreation/specific/${id}`)
		.then(res => res.data, )
		
)

export const getRegisterationbatchCreationById = id => (
	console.log(id),
	axios.post(`https://syntics.co/batchCreation/specific/id/${id}`)
		.then(res => res.data, )
)