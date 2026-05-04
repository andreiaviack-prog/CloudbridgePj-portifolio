function saibaMais(){
    document.getElementById("contato").scrollIntoView({
        behavior: "smooth"
    });
}

/* formulário */
document.addEventListener("DOMContentLoaded", () => {

const empresas = [
{nome:"Escritório Rocha Consutoria", status:"fechado", valor:5000, mensal:500},
{nome:"Clinica Vida Plena", status:"negociação", valor:0, mensal:0},
{nome:"TechNova Soluções", status:"fechado", valor:3000, mensal:300},
{nome:"Mercado Boa vista", status:"contato", valor:0, mensal:0},
{nome:"Studio Advance", status:"fechado", valor:9800, mensal:1550}
];

function calcularKPIs(lista){

const total = lista.length;
const fechados = lista.filter(e => e.status === "fechado");
const totalFechado = fechados.length;

const valorTotal = fechados.reduce((acc, e) => acc + e.valor, 0);
const mensal = fechados.reduce((acc, e) => acc + e.mensal, 0);

const conversao = total > 0 ? ((totalFechado/total)*100).toFixed(0) : 0;
const ticket = totalFechado > 0 ? (valorTotal/totalFechado).toFixed(0) : 0;

return [
{titulo:"Empresas", valor:total},
{titulo:"Fechadas", valor:totalFechado},
{titulo:"Conversão", valor:conversao+"%"},
{titulo:"Valor Total", valor:"R$ "+valorTotal},
{titulo:"Ticket Médio", valor:"R$ "+ticket},
{titulo:"Receita Mensal", valor:"R$ "+mensal}
];
}

function renderKPIs(lista){

const container = document.getElementById("kpis");
if(!container) return;

container.innerHTML = "";

const kpis = calcularKPIs(lista);

kpis.forEach(k => {
container.innerHTML += `
<div class="card">
<h4>${k.titulo}</h4>
<p>${k.valor}</p>
</div>
`;
});
}

function renderTabela(lista){

const tabela = document.getElementById("tabelaEmpresas");
if(!tabela) return;

tabela.innerHTML = "";

lista.forEach(e => {
tabela.innerHTML += `
<tr>
<td>${e.nome}</td>
<td>${e.status}</td>
<td>R$ ${e.valor}</td>
<td>R$ ${e.mensal}</td>
</tr>
<span class="logo-pj">PJ</span>

`;
});
}

function filtrar(){

const filtro = document.getElementById("filtroStatus").value;

let filtrado = empresas;

if(filtro !== "todos"){
filtrado = empresas.filter(e => e.status === filtro);
}

renderKPIs(filtrado);
renderTabela(filtrado);
}

const select = document.getElementById("filtroStatus");
if(select){
select.addEventListener("change", filtrar);
}

renderKPIs(empresas);
renderTabela(empresas);

});
function gerarGrafico(lista){

const statusCount = {
fechado: 0,
negociacao: 0,
contato: 0
};

lista.forEach(e => {
statusCount[e.status]++;
});

const ctx = document.getElementById("graficoStatus");

new Chart(ctx, {
type: 'doughnut',
data: {
labels: ['Fechados', 'Negociação', 'Contato'],
datasets: [{
data: [
statusCount.fechado,
statusCount.negociacao,
statusCount.contato
],
backgroundColor: [
'#22c55e',
'#f59e0b',
'#3b82f6'
]
}]
},
options: {
plugins: {
legend: {
labels: {
color: 'white'
}
}
}
}
});
}
