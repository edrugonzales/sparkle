import {get} from '../../requests'
import {API} from '../../api-config'


export const getVoucher = async (voucher) => {
	let  response; 
	try{
		response = await fetch(`${API}/voucher/${voucher}`, {
			method: 'GET', 
			headers: {
				Accept: 'application/json'
			}
		})

		return response.json();
	}catch(err) {
		
	}
}