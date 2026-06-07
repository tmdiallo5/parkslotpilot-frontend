import axios from "axios";

type Params = {
    url: string,
    token?: string
}
type CreateParams = {
     url: string,
     token?: string,
     body: any
}



const create = async({url, token, body}: CreateParams) => {
    const response = await axios.post(
         `/api/${url}`,
         body,
         {
            headers: {
                'accept': 'application/json', 
                'content-type': 'application/json', 
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            
         }
                 
    )
    return response;
}

const search = async({url, token}: Params) => {
    const response = await axios.get(

        `/api/${url}`,
        {
            headers: {
                'accept': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            
        }
    );
    const {data} = response;
    return data;

}
export {create, search}