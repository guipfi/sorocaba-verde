/* If you changed here, please check the "AdminNav.js" component */
const AdminMenuItems = [
    {   title: "Página Inicial",
        url:"/sistema",
        cName:"nav-links",
        type: 0
    },
    
    {   title: "Solicitações",
        url:"#",
        cName:"dropdown-toggle",
        items:{
            novaSolicitacao:{
                title:"Novas Solicitações",
                url:"/sistema/novas-solicitacoes",
                cName:"dropdown",
                type:0,
            },
            filaSolicitacao:{
                title:"Solicitações na Fila",
                url:"/sistema/solicitacoes",
                cName:"dropdown",
                type:0,
            }
        },
        type: 0
    },

    {   title: "Banco de Árvores",
        url:"#",
        cName:"nav-links",
        type: 0
    },
]

export default AdminMenuItems;