import "./styles/FormSolicitation.css";

function FormSolicitation() {
    
    const handleSubmit = (event) => {
        console.log("AAAAAAAAAAa");
        console.log(event);
    }
    
    return(
        <div className="form-container">
            <h2>Nova solicitação</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="address">Endereço</label>
                <input type="address" placeholder="Digite seu endereço..."></input>
                
                <label htmlFor="type">Tipo de solicitação</label>
                <select name="type" className="type">
                    <option value="corte">Corte</option>
                    <option value="poda">Poda</option>
                    <option value="substituicao">Substituição</option>
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