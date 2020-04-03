import React, {Component} from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {
    state = {
        termino: '',
        imagenes:[],
        pagina:''
    }

    scroll=()=>{
        const elemento=document.querySelector('.jumbotron');
        elemento.scrollIntoView('smoth','start');
    }

    paginaAnterior=()=>{
          //sumar state
          let pagina=this.state.pagina;
          //si la pagina es 1  no ir atras
          if(pagina===1) return null;
          //resta 1 la state
          pagina-=1;
  
          //agregar cambio a l state
          this.setState({
              pagina
          },()=>{
              this.consultarApi()
              this.scroll()
          })    
    }
    paginaSiguiente=()=>{
        //sumar state
        let pagina=this.state.pagina;
        //sumar 1 la state
        pagina+=1;

        //agregar cambio a l state
        this.setState({
            pagina
        },()=>{
            this.consultarApi()
            this.scroll()
        })
    }

    consultarApi = () => {
        const termino=this.state.termino;
        const pagina =this.state.pagina;
        const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&per_page=30&page=${pagina}`;
        // console.log(url);
        fetch(url)
        .then(respuesta=>respuesta.json()) 
        .then(resultado=>this.setState({imagenes:resultado.hits}))   
    }

    datosBusqueda = (termino) => {
        this.setState({
            termino:termino,
            pagina:1
        }, () => {
            this.consultarApi();
        })
    }

    render() {
        return ( 
        <div className = "appcontainer " > 
           <div className = "jumbotron">
                    <p className = "lead text-center"> Buscador de imagenes </p> 
                    <Buscador datosBusqueda ={this.datosBusqueda}/> 
           </div > 
            
            <div className="row justify-content-center">
            <Resultado
           imagenes={this.state.imagenes}
                paginaAnterior={this.paginaAnterior}
                paginaSiguiente={this.paginaSiguiente}
           />
            </div>
                    
        </div >
        );
    }
}



export default App;