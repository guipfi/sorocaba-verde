import "./styles/FormSolicitation.css";
import axios from 'axios';

function FormSolicitation(props) {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const solicitation = {
            "address": event.target[0].value,
            "lat": props.lat,
            "lng": props.lng,
            "type": event.target[1].value,
            "description": event.target[2].value,
            "solicitator": "607f49a6a63ff5779ee24e53"
        }

        axios.post('http://localhost:8082/api/solicitations/new', solicitation)

        window.location = '/user';
    }
    
    return(
        <div className="form-container" id="form-solicitation">
            <h2>Nova solicitação</h2>

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
                    <button id="cancel-button">Cancelar</button>
                    <button type="submit">Confirmar</button>
                </div>
            </form>
        </div>

    )
}

export default FormSolicitation;