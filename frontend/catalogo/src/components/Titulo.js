//Componente de titulo reutilizable con diferentes nombres por el props

const Titulo = (props) =>{
    const pagina = props.pagina
    return(
    <div>
        <h2 className="text-4xl font-semibold p-4 text-center">{pagina}</h2>
    </div>
    )
}


export default Titulo