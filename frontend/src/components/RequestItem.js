import './styles/RequestItem.css';

function RequestItem({type,address,date,status}){

    function renderSwitchStatus() {
        switch(status){
            case 1:
                return(<p>Na fila de espera</p>)
            case 2:
                return(<p>Em atendimento</p>)
            case 3:
                return(<p>Concluído</p>)
            default:
                return(<p>Não Definido</p>)
        }
    }

    return(
        <div className="item-container" id="request-item">
            <div className="details">
                <p className="item-title">{type} | {address}</p>
                <p>Data de solicitação: {date}</p>
            </div>
            <div className="status">
                {renderSwitchStatus()}
            </div>
        </div>
    )
}

export default RequestItem;