
window.onload = () => {
    let socket = io();

    socket.on("hello", (dados, callback) => {
        let arrayCoresSemaforos = [
            dados.Cruzamento1.Semaforo1.cor, dados.Cruzamento1.Semaforo2.cor,
            dados.Cruzamento1.Semaforo3.cor, dados.Cruzamento1.Semaforo4.cor,
            dados.Cruzamento2.Semaforo5.cor, dados.Cruzamento2.Semaforo6.cor,
            dados.Cruzamento2.Semaforo7.cor, dados.Cruzamento2.Semaforo8.cor,
            dados.Cruzamento3.Semaforo9.cor, dados.Cruzamento3.Semaforo10.cor,
            dados.Cruzamento3.Semaforo11.cor, dados.Cruzamento3.Semaforo12.cor,
        ]

        let arrayTemposDeAbertura = [
            dados.Cruzamento1.Semaforo1.tempoDeAbertura, dados.Cruzamento1.Semaforo2.tempoDeAbertura,
            dados.Cruzamento1.Semaforo3.tempoDeAbertura, dados.Cruzamento1.Semaforo4.tempoDeAbertura,
            dados.Cruzamento2.Semaforo5.tempoDeAbertura, dados.Cruzamento2.Semaforo6.tempoDeAbertura,
            dados.Cruzamento2.Semaforo7.tempoDeAbertura, dados.Cruzamento2.Semaforo8.tempoDeAbertura,
            dados.Cruzamento3.Semaforo9.tempoDeAbertura, dados.Cruzamento3.Semaforo10.tempoDeAbertura,
            dados.Cruzamento3.Semaforo11.tempoDeAbertura, dados.Cruzamento3.Semaforo12.tempoDeAbertura,
        ]

        alterarCorSemaforos(arrayCoresSemaforos)
        alterarTempoSemaforos(arrayTemposDeAbertura)
        alteraTotalDeCarros(dados.TotalDeVeiculos)
        callback("got it");

    });
    
    
    btnweek()
    ativaPartsBtn()
    speedCanvas()
    canvaAmount()
    alteraTempo(0, 1)
    
}

setInterval(() => {
    getTime()
    getData()
}, 100)

/**Função para o relógio */
function getTime(){
    const relogio = document.getElementById('relogio')
    const tempo = new Date() 
    var hora = (tempo.getHours() < 10? '0' + tempo.getHours() : tempo.getHours())
    var min = (tempo.getMinutes() < 10? '0' + tempo.getMinutes() : tempo.getMinutes())
    var turno = (hora < 12? 'am' : 'pm')

    relogio.innerHTML = `${hora}:${min}${turno}`
}


/**
 * ---------------------------------------------------------------
 * Funções sidebar
 */

/**Função para retornar a data atual */
function getData(){
    const data_text = document.querySelectorAll('.data')
    const data = new Date()
    var dia = data.getDate()
    var mes = data.getMonth() + 1
    var ano =  data.getFullYear()

    data_text.forEach(element => {
        element.innerHTML = `Hoje, ${dia}-${mes}-${ano}`
    });
}

/** Função de abrir e fechar sidebar */
function botaoSideBar(){
    let btn_svg = document.querySelector('.botao-svg')
    let sidebar = document.querySelector('.sidebar')

    sidebar.classList.toggle('active')
    btn_svg.classList.toggle('active')  
}

/**Função para alterar a cor do semáforo */
function mudaCor(semaforo, cor){
    const cores = ['##32FA12', '#FAE212', '#DB2B2B'] /**Verde, Amarelo, Vermelho */
    const coresNome = ['Verde', 'Amarelo', 'Vermelho']

    let circles = document.querySelectorAll('.status-light')
    let spanTextos = document.querySelectorAll('.color')

    circles[semaforo].style.backgroundColor = cores[cor]
    spanTextos[semaforo].innerHTML = coresNome[cor]    
}

/**Função para alterar a cor de todos os semáforos juntos */
function alterarCorSemaforos(semaforosCores){
    mudaCor(0, semaforosCores[0])
    mudaCor(1, semaforosCores[1])
    mudaCor(2, semaforosCores[2])
    mudaCor(3, semaforosCores[3])
    mudaCor(4, semaforosCores[4])
    mudaCor(5, semaforosCores[5])
    mudaCor(6, semaforosCores[6])
    mudaCor(7, semaforosCores[7])
    mudaCor(8, semaforosCores[8])
    mudaCor(9, semaforosCores[9])
    mudaCor(10,semaforosCores[10])
    mudaCor(11,semaforosCores[11])
}

/**Função para alterar o tempo de abertura do semáforo */
function alteraTempo(semaforo, tempo){
    let listaSemaforos = document.querySelectorAll('.time-opened')
    
    if(tempo >= 0 && tempo <= 9){
        listaSemaforos[semaforo].innerHTML = "0" + tempo + " SEG"
    } else{
        listaSemaforos[semaforo].innerHTML = tempo + " SEG"
    }
}

/**Função para alterar o tempo de todos os semáforos */
function alterarTempoSemaforos(tempos){
    alteraTempo(0, tempos[0])
    alteraTempo(1, tempos[1])
    alteraTempo(2, tempos[2])
    alteraTempo(3, tempos[3])
    alteraTempo(4, tempos[4])
    alteraTempo(5, tempos[5])
    alteraTempo(6, tempos[6])
    alteraTempo(7, tempos[7])
    alteraTempo(8, tempos[8])
    alteraTempo(9, tempos[9])
    alteraTempo(10,tempos[10])
    alteraTempo(11,tempos[11])
}


/**
 * ---------------------------------------------------------------
 * 
 */

/**Função para ativar os botões referentes ao dia da semana */
function btnweek(){
    let botoes = document.querySelectorAll('.week-btn')

    botoes.forEach(element => {
        element.addEventListener('click', () => {
            removeClasses(element, botoes)
        })
    });
}

/**Função para remover/adicionar classes aos botões */
function removeClasses(botao, listaBotoes){
    listaBotoes.forEach((btn) => {
        /**Se o botão que estou percorrendo não for o botão clicado, então a classe 
         * active não é adicionada. Caso contrário a classe active é adicionada ao mesmo.
         */
        if(btn == botao){
            btn.classList.add('active')
        } else {
            btn.classList.remove('active')
        }
    })
}

function alteraTotalDeCarros(qtd){
    let totalDeCarros = document.getElementById('number-of-cars')
    
    if(qtd >= 0 && qtd <= 9) {totalDeCarros.innerHTML = `000.000.00${qtd}`}
    else if(qtd >= 10 && qtd <= 99) {totalDeCarros.innerHTML = `000.000.0${qtd}`}
    else if(qtd >= 100 && qtd <= 999) {totalDeCarros.innerHTML = `000.000.${qtd}`}
    else if(qtd >= 1000 && qtd <= 9999) {totalDeCarros.innerHTML = `000.00${Math.trunc(qtd/1000)}.${qtd-Math.trunc(qtd/1000)*1000}`}
}

function ativaPartsBtn(){
    let partsBtn = document.querySelectorAll('.parts-btn')

    partsBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            partsBtn.forEach(element  => {
                if(element == btn) {element.classList.add('active')}
                else{element.classList.remove('active')}
            })
        })
    })
}

function speedCanvas(){
    const ctx = document.getElementById('canvaSpeed').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0M', '10M', '20M', '30M', '40M', '50M', '60M'],
            datasets: [{
                data: [
                    {x: '0M', y: '10'}, 
                    {x: '10M', y: '25'},
                    {x: '20M', y: '25'},
                    {x: '30M', y: '40'},
                    {x: '40M', y: '3'},
                    {x: '50M', y: '60'},
                    {x: '60M', y: '50'},
                ],
                backgroundColor: [
                    'hsl(112, 96%, 53%)',
                    
                ],
                borderColor: [
                    'hsl(112, 96%, 53%)',
                ],
                borderWidth: 1,
                cubicInterpolationMode: 'monotone'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
            
        }
    });

}

function canvaAmount(){
    const ctx = document.getElementById('canvaAmount').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['10M', '20M', '30M', '40M', '50M', '60M'],
            datasets: [{
                data: [
                    {x: '10M', y: '10'}, 
                    {x: '20M', y: '25'},
                    {x: '30M', y: '125'}
                ],
                backgroundColor: [
                    '#FFE605',
                    
                ],
                borderColor: [
                    '#FFE605',
                ],
                borderWidth: 1,
                borderRadius: 30,
                barThickness: 15,
                borderSkipped: 'middle', 
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }

        }
    });

}