import React, {useState, useEffect} from 'react';
import "./styles/FormSolicitation.css";
import axios from 'axios';
import Modal from './Modal';

import backBtn from './assets/chevron-left-solid.svg';
import '../styles/global.css'

function FormSolicitation(props) {
    const [photos,setPhotos] = useState([])
    const [photosData, setPhotosData] = useState([])
    const [type, setType] = useState('Corte')
    const [message,setMessage] = useState('');
    const [description, setDescription] = useState('')
    const [showModal, setModal] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        if(description.length === 0){
            setMessage("O campo de descrição é obrigatório");
            
        } else{
            axios.get(`${process.env.REACT_APP_API_URL}/users/isLogged`,{withCredentials: true, credentials: 'include'})
            .then(res=>{
                if(res.data.code === 1){
                    
                    const bodyFormData = new FormData();
                    
                    for(let i = 0; i < photosData.length;i++){
                        bodyFormData.append('files', photosData[i]);
                    }

                    bodyFormData.append('address', props.address);
                    bodyFormData.append('lat', props.lat);
                    bodyFormData.append('lng', props.lng);
                    bodyFormData.append('type', type)
                    bodyFormData.append('description', description);
                    bodyFormData.append('solicitator', res.data.user._id);
        
                    axios.post(`${process.env.REACT_APP_API_URL}/solicitations/new`, bodyFormData)
                    .then(res =>{
                        if(res.status === 200){
                            setModal(true)
                            setInterval(() => {
                                window.location.href = "/" 
                            }, 5000);
                        }
                    })
                }
            })
        }
    }

    const handlePhoto = (event) =>{
        const photos = event.target.files
        const photoState =  Array.from(photos).map((value =>{
            return URL.createObjectURL(value);
        }))
        
        setPhotos(photoState)
        setPhotosData(Array.from(photos))
    }

    const onChangeType = (event) =>{
        setType(event.target.value)
    }

    const onChangeDescription = (event) =>{
        setDescription(event.target.value)
    }

    const back = () => {
        props.history.goBack()
    }
    
    if(showModal === false){
        return(
            <div className="form-container" id="form-solicitation">
                <div class="form-solicitation-title">
                    <div class="form-back">
                        <img src={backBtn} onClick={() => back()} alt="Voltar"/>
                    </div>
                    <h3>Nova solicitação</h3>
                </div>

                <form>
                    <label htmlFor="address">Endereço</label>
                    <input type="address" placeholder="Digite seu endereço..." value={props.address} disabled></input>
                    
                    <label htmlFor="type">Tipo de solicitação</label>
                    <select name="type" className="type" onChange={onChangeType} value={type}>
                        <option value="Corte">Corte</option>
                        <option value="Poda">Poda</option>
                        <option value="Substituição">Substituição</option>
                    </select>
                    
                    <label htmlFor="description">Descrição</label>
                    <textarea placeholder="Digite uma descrição..."  onChange={onChangeDescription} value={description} />
                    {message.length > 0 ? <h5 id="alert-newSolicitation">A sua solicitação deve conter uma descrição!</h5>:null}

                    <label>Fotos</label>
                    <div class="img-view-container">
                        {photos.map((value) =>{
                            return <div class="img-view"><img src={value} height={300} width={300} /></div>
                        })}
                    </div>
                
                    <input className="photo-input" type="file" placeholder="Adicionar Imagem" multiple onChange={handlePhoto} />

                    <div id="button-container">
                        <button onClick={() => window.location.href="/"} id="cancel-button">Cancelar</button>
                        <button onClick={handleSubmit} type="submit">Confirmar</button>
                    </div>
                </form>
            </div>

        )
    }
    else{
        return <Modal className={showModal} location="/" />
    }
}

export default FormSolicitation;