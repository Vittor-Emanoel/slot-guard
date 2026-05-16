# SlotGuard Cinema

Sistema de reserva de assentos de cinema focado em concorrência, bloqueios temporários e prevenção de overbooking.

A ideia principal é permitir que múltiplos usuários tentem reservar assentos ao mesmo tempo, garantindo que apenas um usuário consiga bloquear ou confirmar um assento específico para uma sessão.

## Objetivo

Criar um sistema visual e técnico para demonstrar:

- reserva concorrente de assentos;
- bloqueio temporário de assentos;
- expiração automática de holds;
- prevenção de overbooking;
- atualização em tempo real entre usuários;
- histórico dos eventos do sistema.

## Conceito

Quando um usuário seleciona um assento, o sistema cria um bloqueio temporário chamado `hold`.

Enquanto o hold estiver ativo, outros usuários não podem reservar o mesmo assento.

Se o usuário confirmar a reserva dentro do prazo, o assento fica reservado.

Se o prazo expirar, o assento volta a ficar disponível.

## Estados dos assentos

- `available`: assento disponível;
- `held_by_me`: assento bloqueado pelo usuário atual;
- `held_by_other`: assento bloqueado por outro usuário;
- `reserved_by_me`: assento reservado pelo usuário atual;
- `reserved_by_other`: assento reservado por outro usuário.

## Estados do hold

- `active`: hold ativo;
- `confirmed`: hold confirmado;
- `expired`: hold expirado;
- `released`: hold liberado manualmente.

## Estados da reserva

- `confirmed`: reserva confirmada;
- `cancelled`: reserva cancelada.

---

# Requisitos funcionais

## Filmes e sessões

- [ ] O sistema deve permitir cadastrar filmes.
- [ ] O sistema deve permitir cadastrar salas.
- [ ] O sistema deve permitir cadastrar sessões para um filme.
- [ ] Cada sessão deve estar vinculada a uma sala.
- [ ] Cada sala deve ter uma configuração de fileiras e assentos.
- [ ] O usuário deve conseguir visualizar as sessões disponíveis.
- [ ] O usuário deve conseguir selecionar uma sessão para visualizar os assentos.

## Mapa de assentos

- [ ] O sistema deve exibir o mapa de assentos da sessão selecionada.
- [ ] O sistema deve diferenciar visualmente assentos disponíveis, bloqueados e reservados.
- [ ] O sistema deve mostrar quando um assento está bloqueado pelo próprio usuário.
- [ ] O sistema deve mostrar quando um assento está bloqueado por outro usuário.
- [ ] O sistema deve mostrar quando um assento já está reservado.
- [ ] O usuário não deve conseguir selecionar um assento reservado.
- [ ] O usuário não deve conseguir selecionar um assento bloqueado por outro usuário.

## Holds temporários

- [ ] O sistema deve criar um hold quando o usuário selecionar um assento disponível.
- [ ] Um hold deve ter tempo de expiração.
- [ ] Um hold ativo deve bloquear o assento para outros usuários.
- [ ] O sistema deve impedir a criação de dois holds ativos para o mesmo assento na mesma sessão.
- [ ] O sistema deve impedir a criação de hold para um assento já reservado.
- [ ] O usuário deve conseguir liberar manualmente um hold criado por ele.
- [ ] O sistema deve expirar automaticamente holds vencidos.
- [ ] Quando um hold expirar, o assento deve voltar a ficar disponível.
- [ ] O usuário deve visualizar um contador com o tempo restante do hold.

## Confirmação de reserva

- [ ] O usuário deve conseguir confirmar uma reserva a partir de um hold ativo.
- [ ] O sistema deve validar se o hold ainda está ativo antes de confirmar a reserva.
- [ ] O sistema deve validar se o hold pertence ao usuário atual.
- [ ] O sistema deve impedir a confirmação de um hold expirado.
- [ ] O sistema deve impedir a confirmação de um hold liberado.
- [ ] Ao confirmar a reserva, o assento deve mudar para reservado.
- [ ] Ao confirmar a reserva, o hold deve mudar para confirmado.
- [ ] O sistema deve impedir duas reservas confirmadas para o mesmo assento na mesma sessão.

## Múltiplos usuários

- [ ] A tela deve permitir simular pelo menos dois usuários diferentes.
- [ ] Cada usuário deve possuir uma identificação própria.
- [ ] Um assento bloqueado por um usuário deve aparecer como bloqueado para o outro.
- [ ] Um assento reservado por um usuário deve aparecer como reservado para o outro.
- [ ] As alterações feitas por um usuário devem ser refletidas para os demais usuários.

## Tempo real

- [ ] O sistema deve atualizar o mapa de assentos em tempo real.
- [ ] Quando um hold for criado, outros usuários devem ser notificados.
- [ ] Quando um hold for expirado, outros usuários devem ser notificados.
- [ ] Quando uma reserva for confirmada, outros usuários devem ser notificados.
- [ ] Quando um hold for liberado, outros usuários devem ser notificados.

## Timeline de eventos

- [ ] O sistema deve registrar quando um hold for criado.
- [ ] O sistema deve registrar quando um hold for expirado.
- [ ] O sistema deve registrar quando um hold for liberado.
- [ ] O sistema deve registrar quando uma reserva for confirmada.
- [ ] O sistema deve registrar quando uma tentativa de reserva for rejeitada por conflito.
- [ ] A interface deve exibir uma timeline com os eventos recentes da sessão.
- [ ] Cada evento deve exibir data, tipo, usuário e assento relacionado.

## Simulador de concorrência

- [ ] O sistema deve permitir simular múltiplos usuários tentando reservar o mesmo assento.
- [ ] A simulação deve disparar várias requisições concorrentes.
- [ ] Apenas uma requisição deve conseguir criar o hold.
- [ ] As demais requisições devem ser rejeitadas por conflito.
- [ ] O resultado da simulação deve exibir quantas tentativas foram feitas.
- [ ] O resultado da simulação deve exibir quantos holds foram criados.
- [ ] O resultado da simulação deve exibir quantas tentativas foram rejeitadas.
- [ ] O resultado da simulação deve garantir que não houve overbooking.

## Reservas

- [ ] O usuário deve conseguir visualizar suas reservas confirmadas.
- [ ] O usuário deve conseguir cancelar uma reserva.
- [ ] Ao cancelar uma reserva, o assento deve voltar a ficar disponível.
- [ ] O sistema deve registrar o cancelamento na timeline de eventos.

---

# Requisitos não funcionais

## Concorrência e consistência

- [ ] O sistema não deve permitir overbooking.
- [ ] O backend deve garantir a consistência mesmo com múltiplas requisições simultâneas.
- [ ] A validação de conflito não deve depender apenas do frontend.
- [ ] A criação de hold deve ser uma operação atômica.
- [ ] A confirmação de reserva deve ser uma operação atômica.
- [ ] O banco de dados deve proteger contra duplicidade de reserva para o mesmo assento e sessão.
- [ ] O sistema deve lidar corretamente com requisições repetidas ou duplicadas.

## Segurança

- [ ] O usuário não deve conseguir confirmar hold de outro usuário.
- [ ] O usuário não deve conseguir liberar hold de outro usuário.
- [ ] O usuário não deve conseguir cancelar reserva de outro usuário.
- [ ] O sistema deve validar permissões no backend.
- [ ] Dados sensíveis não devem ser expostos na interface ou nos logs.

## Performance

- [ ] O mapa de assentos deve carregar rapidamente.
- [ ] A atualização em tempo real não deve exigir reload da página.
- [ ] A busca dos assentos deve evitar consultas desnecessárias.
- [ ] A timeline deve ser paginada ou limitada para evitar excesso de dados.
- [ ] O sistema deve suportar múltiplos usuários consultando a mesma sessão.

## Escalabilidade

- [ ] A modelagem deve permitir múltiplos filmes.
- [ ] A modelagem deve permitir múltiplas sessões.
- [ ] A modelagem deve permitir múltiplas salas.
- [ ] A modelagem deve permitir salas com diferentes quantidades de assentos.
- [ ] A lógica de reserva deve poder ser reutilizada para outros tipos de recursos no futuro.

## Observabilidade

- [ ] O sistema deve registrar logs das operações importantes.
- [ ] Erros de conflito devem ser identificáveis nos logs.
- [ ] Expirações automáticas de holds devem ser registradas.
- [ ] Confirmações de reserva devem ser registradas.
- [ ] O sistema deve permitir investigar a linha do tempo de uma reserva.

## Testes

- [ ] Deve haver testes para criação de hold.
- [ ] Deve haver testes para expiração de hold.
- [ ] Deve haver testes para confirmação de reserva.
- [ ] Deve haver testes para tentativa de reservar assento já reservado.
- [ ] Deve haver testes para tentativa de reservar assento com hold ativo.
- [ ] Deve haver testes para confirmar hold expirado.
- [ ] Deve haver testes para confirmar hold de outro usuário.
- [ ] Deve haver testes de concorrência simulando múltiplas tentativas no mesmo assento.
- [ ] Deve haver testes garantindo que apenas um hold seja criado em cenário concorrente.

## Experiência do usuário

- [ ] O usuário deve entender claramente o estado de cada assento.
- [ ] O usuário deve receber feedback quando um assento estiver indisponível.
- [ ] O usuário deve visualizar o tempo restante para confirmar o hold.
- [ ] O usuário deve ser avisado quando o hold expirar.
- [ ] O usuário deve ser avisado quando a reserva for confirmada.
- [ ] O usuário deve ser avisado quando uma tentativa falhar por conflito.

---

# Regras principais do domínio

## Criar hold

Um hold só pode ser criado quando:

- o assento existe;
- a sessão existe;
- o assento pertence à sala da sessão;
- o assento não está reservado;
- o assento não possui hold ativo;
- o usuário ainda não excedeu o limite de holds ativos.

## Confirmar reserva

Uma reserva só pode ser confirmada quando:

- o hold existe;
- o hold pertence ao usuário atual;
- o hold está ativo;
- o hold ainda não expirou;
- o assento ainda não está reservado;
- a operação acontece dentro de uma transação.

## Expirar hold

Um hold deve expirar quando:

- o status está ativo;
- a data atual é maior que `expiresAt`.

Ao expirar:

- o hold muda para `expired`;
- o assento volta a ficar disponível;
- um evento é registrado;
- os usuários conectados são notificados.

---

# Ideias futuras

- [ ] Permitir selecionar múltiplos assentos.
- [ ] Adicionar pagamento fake.
- [ ] Adicionar fila de espera.
- [ ] Adicionar assentos premium.
- [ ] Adicionar preços por sessão.
- [ ] Adicionar cupons.
- [ ] Adicionar cancelamento com política.
- [ ] Adicionar expiração de reserva não paga.
- [ ] Adicionar relatório de ocupação da sessão.
- [ ] Adicionar painel administrativo.
- [ ] Adicionar auditoria detalhada por usuário.
- [ ] Adicionar replay da timeline de eventos.
- [ ] Adicionar modo de stress test visual.

---

# Diferenciais técnicos

- Prevenção de overbooking.
- Controle de concorrência.
- Holds temporários com expiração.
- Atualização em tempo real.
- Timeline de eventos.
- Simulador de concorrência.
- Testes para cenários simultâneos.
- Modelagem baseada em estados.
