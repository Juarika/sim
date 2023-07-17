import { mostrarRuta } from "../modules/rutas.js";

const url = 'http://localhost:3001';
const headers = new Headers ({'Content-Type': 'application/json'});


export async function getData(endPoint, func){
    let data = await (await fetch(`${url}/${endPoint}`)).json();
    func(data);
}

export async function postData(data, endPoint, func){
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }

    let personas = await (await fetch(`${url}/${endPoint}`,config)).json();

}

export async function deleteData(tr,id, endPoint, func){
    let data = Object.fromEntries(new FormData(tr.target));

    let config = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    };

    let del = await(await fetch(`${url}/${endPoint}/${id}`,config)).json();
}

export async function actualizarData(data,id, endPoint, func) {
    let config = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }
    let act = await (await fetch(`${url}/${endPoint}/${id}`,config)).json();
}