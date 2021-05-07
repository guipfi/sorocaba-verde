import "./styles/FormSolicitation.css";
import axios from 'axios';

function FormSolicitation(props) {
    console.log("oi")
    console.log(props)
    console.log("Faaal")
    const handleSubmit = (event) => {
        event.preventDefault();

        const imagesQtd = event.target[3].files.length;
        let photosURL = [];

        for(var i = 0; i < imagesQtd; i++)
            photosURL.push(event.target[3].files[i].name)


        console.log(photosURL);

        axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
        .then(res=>{
            console.log(res)
            if(res.data.code === 1){
                const solicitation = {
                    "address": event.target[0].value,
                    "lat": props.lat,
                    "lng": props.lng,
                    "type": event.target[1].value,
                    "description": event.target[2].value,
                    "solicitator": res.data.user._id
                }
    
                console.log(solicitation);
                axios.post('http://localhost:8082/api/solicitations/new', solicitation)
                .then(res =>{
                    if(res.status === 200){
                        window.location.href = "/" 
                    }
                    console.log(res);
                })
                
            }
        })
    }
    
    return(
        <div className="form-container" id="form-solicitation">
            <h3>Nova solicitação</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor="address">Endereço</label>
                <input type="address" placeholder="Digite seu endereço..." value={props.address} disabled></input>
                
                <label htmlFor="type">Tipo de solicitação</label>
                <select name="type" className="type">
                    <option value="Corte">Corte</option>
                    <option value="Poda">Poda</option>
                    <option value="Substituição">Substituição</option>
                </select>
                
                <label htmlFor="description">Descrição</label>
                <textarea placeholder="Digite uma descrição..."></textarea>
                
                <label>Fotos</label>
                <input className="photo-input" type="file" placeholder="Adicionar Imagem" multiple></input>

                <div id="button-container">
                    <button onClick={() => window.location.href="/"} id="cancel-button">Cancelar</button>
                    <button type="submit">Confirmar</button>
                </div>
            </form>
        </div>

    )
}

export default FormSolicitation;