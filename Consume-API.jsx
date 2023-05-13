/formas de consumir uma API
import { useEffect, useState } from "react";

//forma 1 - Ajax XMLHttpRequest()
function viaCep(){
    const ajax = new XMLHttpRequest(); //requisição ao site de forma remota (sem navegador)
    ajax.open('GET', 'https://viacep.com.br/ws/23520560/json/');
    ajax.send();
    ajax.onload = function(){
        //exibe em formato de textio JSON
        document.getElementById('area').innerHTML = this.responseText;
        //Transforma o text em objeto
        var obj = JSON.parse(this.responseText);
        //pegou os valores
        let cidade = obj.localidade;
        //saída
        alert(cidade);
    }
}

//forma 2 Fetch API com .then()
function getCEPwithThen(){  
    fetch('https://viacep.com.br/ws/23520560/json/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var dados = (data.logradouro);
        document.getElementById('area').innerHTML = dados
    })
    .catch(error => console.log('Deu erro', error))
    .finally(() => /*aviso de fim do carregamento*/null);    
}

//forma 3 Fetch API com Async/await
async function getCEPwithAsyncAwait(){
    try {
        const response = await fetch('https://viacep.com.br/ws/23520560/json/')
        const data = await response.json()
        console.log(data)
        document.getElementById('area').innerHTML = data.logradouro
    } catch (error) {
        console.log('deu erro', error)
    }
}

const Aula = (texto) => {
//forma 4 - Fetch API com .then() + useEffetc
const [dadosCEP, setdadosCEP] = useState([])
useEffect(() => {
        fetch('https://viacep.com.br/ws/23520560/json/')
        .then(response => response.json())
        .then(data => {
            setdadosCEP(data);
    })
}, []);
    
    return(
        <div>
            <ul>
               {dadosCEP.logradouro}
            </ul>
            <h1 id="area">Aula</h1>
            <button onClick={getCEPwithThen}>CEP then</button><br/>
            <button onClick={getCEPwithAsyncAwait}>CEP async</button>
        </div>
    )

}

export default Aula;
