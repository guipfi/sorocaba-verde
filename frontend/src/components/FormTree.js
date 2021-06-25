import React, {useState} from 'react';

import back from './assets/chevron-left-solid.svg';
import axios from 'axios';

import "./styles/FormTree.css";

function FormTree(props) {

    const [quantity, setQuantity] = useState(1);
    const [photosView, setPhotosView] = useState([]);
    const [photos, setPhotos] = useState([]);

    const handlePhoto = (event) =>{
        const uploaded_photos = Array.from(event.target.files)
        const newPhotosView = uploaded_photos.map((value =>{
            return URL.createObjectURL(value);
        }))
        
        setPhotosView(newPhotosView);
        setPhotos(uploaded_photos);
    }
    
    const handleSubmit = (event) => {
        
        event.preventDefault();

        axios.get(`${process.env.REACT_APP_API_URL}/admin/isLogged`,{withCredentials: true, credentials: 'include'})
        .then(res=>{
            if(res.data.code === 1){                
                var bodyFormData = new FormData();
                for(let i = 0; i < photos.length;i++){
                    bodyFormData.append('files', photos[i]);
                }
                bodyFormData.append('address', props.address);
                bodyFormData.append('lat', props.lat);
                bodyFormData.append('lng', props.lng);
                bodyFormData.append('quantity', event.target[1].value);
                bodyFormData.append('name', event.target[2].value);

                if(quantity > 1) {
                    bodyFormData.append('description', event.target[3].value);
                } else {
                    bodyFormData.append('height', event.target[3].value);
                    bodyFormData.append('age', event.target[4].value);
                    bodyFormData.append('description', event.target[5].value);
                }
                           
                axios.post(`${process.env.REACT_APP_API_URL}/trees/new`, bodyFormData)
                .then(res =>{
                    if(res.status === 200){
                        window.location.href = "/sistema/home"
                        window.alert("Árvore cadastrada com sucesso!")
                    } else {
                        console.log(res.statusText);
                    }
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return(
        <div className="form-container" id="form-solicitation">
  
            <h3>
                <div className="button-back" style={{display: 'inline-block', marginRight: '0.5rem'}}>
                    <a href="/sistema/home"><img src={back} alt="Voltar"/></a>
                </div>
                Nova Árvore
            </h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor="address">Endereço</label>
                <input type="text" value={props.address} disabled required></input>

                <label htmlFor="quantity">Quantidade</label>
                <input type="number" placeholder="Quantidade de árvores..." value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required></input>
                
                <label htmlFor="tree-infos">Informações técnicas</label>
                <div className="tree-infos">
                    <label htmlFor="name">Nome</label>
                    <input type="text" placeholder="Nome da árvore..." required></input>
                    {quantity == 1 ? (
                        <div className="tree-attributes">
                            <div>
                                <label htmlFor="height">Altura (em metros)</label>
                                <input type="number" step=".01" min="0.1" placeholder="1,7m" required={quantity == 1 ? true : false}></input> 
                            </div>
                            <div>
                                <label htmlFor="age">Idade (em anos)</label>
                                <input type="number" step="1" min="0" placeholder="5" required={quantity == 1 ? true : false}></input>   
                            </div>
                        </div>
                    ) : (null) }
                    <label htmlFor="description">Descrição</label>
                    <textarea placeholder="Digite uma descrição..." required></textarea>
                </div>
                
                <label>Fotos</label>
                <div class="img-view-container">
                    {photosView.map((value) =>{
                        return <div class="img-view"><img src={value} height={300} width={300} alt="Cadastrando imagem" /></div>
                    })}
                </div>
                <input className="photo-input" type="file" placeholder="Adicionar Imagem" multiple onChange={handlePhoto}></input>

                <div id="button-container">
                    <button onClick={() => window.location.href="/sistema/home"} id="cancel-button">Cancelar</button>
                    <button type="submit">Confirmar</button>
                </div>
            </form>
        </div>

    )
}

export default FormTree;