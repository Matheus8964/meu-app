/*
  CONFIGURAÇÃO DOS MÓDULOS
  mode: "iframe" = tenta mostrar o sistema dentro do portal.
  mode: "link"   = abre o sistema em uma nova guia.
  Preencha url com o endereço publicado de cada tela.
  Atenção: alguns sites bloqueiam iframe por segurança. Nesse caso, use mode: "link".
*/
window.APP_CONFIG = {
  appName: "Central de Suporte App RH",
  modules: {
    folgas: {
      title: "Folgas",
      description: "Solicitações e consulta de folgas.",
      url: "",
      mode: "iframe"
    },
    trocas: {
      title: "Trocas",
      description: "Acompanhamento das solicitações de troca de plantão.",
      url: "",
      mode: "iframe"
    },
    atestados: {
      title: "Atestados",
      description: "Acesso ao módulo de atestados.",
      url: "",
      mode: "iframe"
    },
    treinamentos: {
      title: "Treinamentos",
      description: "Capacitações, treinamentos e certificados.",
      url: "",
      mode: "iframe"
    },
    dashboard: {
      title: "Dashboard Planilha",
      description: "Painéis e relatórios conectados a planilhas.",
      url: "",
      mode: "iframe"
    }
  }
};
