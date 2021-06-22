import './styles/RequestItem.css';

function RequestItem({type,address,date,status}){
    return(
        <div className="item-container" id="request-item">
            <div className="details">
                <p className="item-title">{type} | {address}</p>
                <p>Data de solicitação: {date}</p>
            </div>
            <div className="status">
                <p>{status}</p>
            </div>
        </div>
    )
}

export default RequestItem;