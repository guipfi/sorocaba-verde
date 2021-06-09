import "./styles/FormTree.css";
import back from './assets/chevron-left-solid.svg';
import axios from 'axios';

function FormTree(props) {
    
    const handleSubmit = (event) => {
        
        event.preventDefault();

        const imagesQtd = event.target[3].files.length;
        let photosURL = [];

        for(var i = 0; i < imagesQtd; i++)
            photosURL.push(event.target[3].files[i].name)

        axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
        .then(res=>{
            if(res.data.code === 1){
                
                var bodyFormData = new FormData();
                bodyFormData.append('address', event.target[0].value);
                bodyFormData.append('lat', props.lat);
                bodyFormData.append('lng', props.lng);
                bodyFormData.append('type', event.target[1].value)
                bodyFormData.append('description', event.target[2].value);
                bodyFormData.append('solicitator', res.data.user._id);
                bodyFormData.append('photosURL', event.target[3].files);
                                
                const tree = {
                    "address": event.target[0].value,
                    "lat": props.lat,
                    "lng": props.lng,
                    "type": event.target[1].value,
                    "description": event.target[2].value,
                    "solicitator": res.data.user._id,
                    "photosURL": event.target[3].files
                }
    
                axios.post('http://localhost:8082/api/tree/new', bodyFormData)
                .then(res =>{
                    if(res.status === 200){
                        window.location.href = "/" 
                    }
                })
            }
        })
    }
    
    return(
        <div className="form-container" id="form-solicitation">
  
            <h3>
                <div className="button-back" style={{display: 'inline-block', marginRight: '0.5rem'}}>
                    <a href="/sistema/home"><img src={back} alt="Voltar"/></a>
                </div>
                Nova Árvore'
            </h3>

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

export default FormTree;