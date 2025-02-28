// Objeto do usuário
const usuario = { nome: "Bruno", matricula: "248", pendencia: false, acessibilidade: true };

// Lista de armários disponíveis
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// Função para reservar um armário
function reservarArmario() {
  
  // Obter tipo de armário selecionado pelo usuário no HTML
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // Filtrar os armários disponíveis e acessíveis ao usuário
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // Caso não exista armário disponível, exibir mensagem para o usuário
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Sorteia um armário disponível
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Localiza o armário sorteado na lista e atualiza seu status
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;
  
  // Captura a data e hora atuais
  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toLocaleString(); // Armazena a data da reserva

  // Calcula o prazo de entrega das chaves (24 horas depois)
  let dataEntrega = new Date(dataReserva);
  dataEntrega.setDate(dataEntrega.getDate() + 1); // Adiciona 1 dia (24h)
  armarioEmprestado.prazoEntrega = dataEntrega.toLocaleString(); // Armazena o prazo

  // Atualiza a pendência do usuário
  usuario.pendencia = true;
  
    // Exibe a mensagem de reserva com a data de entrega das chaves no HTML
    document.getElementById("resultado").innerHTML = `
    <strong>Olá, ${usuario.nome}!</strong> <br>
    O armário <strong>${armarioSorteado.id}</strong> foi reservado com sucesso! <br>
    <strong>Data da reserva:</strong> ${armarioEmprestado.dataReserva} <br>
    <strong>Prazo para devolução das chaves:</strong> ${armarioEmprestado.prazoEntrega}
  `;

  // Exibir os dados no console para depuração
  console.log(usuario);
  console.log(armarios);
}
