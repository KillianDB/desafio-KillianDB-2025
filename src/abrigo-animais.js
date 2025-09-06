class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const datasetDeAnimaisDoAbrigo = {
      Bola: { tipo: "cão", favoritos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
      Rex: { tipo: "cão", favoritos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", favoritos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", favoritos: ["RATO", "BOLA"] },
      Loco: { tipo: "jabuti", favoritos: ["SKATE", "RATO"] },
    };
    const brinquedosValidos = ["CAIXA", "NOVELO", "LASER", "RATO", "BOLA", "SKATE"];

    function todosOsBrinquedosSaoValidosEUnicos(brinquedosPessoa, brinquedosValidos) {
      if (!Array.isArray(brinquedosPessoa) || brinquedosPessoa.length === 0) return false;
      return (
        brinquedosPessoa.every((x) => brinquedosValidos.includes(x)) &&
        new Set(brinquedosPessoa).size === brinquedosPessoa.length
      );
    }

    function todosOsAnimaisSaoValidosEUnicos(ordemAnimais) {
      if (!Array.isArray(ordemAnimais) || ordemAnimais.length === 0) return false;
      return (
        ordemAnimais.every((x) => Object.keys(datasetDeAnimaisDoAbrigo).includes(x)) &&
        new Set(ordemAnimais).size === ordemAnimais.length
      );
    }

    function brinquedosFavoritosNaOrdem(brinquedosPessoa, brinquedosFavoritos) {
      if (!Array.isArray(brinquedosPessoa) || !Array.isArray(brinquedosFavoritos)) return false;
      let idx = 0;
      for (let i = 0; i < brinquedosPessoa.length; i++) {
        if (brinquedosPessoa[i] === brinquedosFavoritos[idx]) idx++;
        if (idx === brinquedosFavoritos.length) return true;
      }
      return false;
    }

    brinquedosPessoa1 = typeof brinquedosPessoa1 === 'string' ? brinquedosPessoa1.split(",") : [];
    brinquedosPessoa2 = typeof brinquedosPessoa2 === 'string' ? brinquedosPessoa2.split(",") : [];
    ordemAnimais = typeof ordemAnimais === 'string' ? ordemAnimais.split(",") : [];

    if (!todosOsAnimaisSaoValidosEUnicos(ordemAnimais) || 
        ordemAnimais.length === 0) {
      return { erro: "Animal inválido", lista: false };
    }
    if (!todosOsBrinquedosSaoValidosEUnicos(brinquedosPessoa1, brinquedosValidos) ||
        !todosOsBrinquedosSaoValidosEUnicos(brinquedosPessoa2, brinquedosValidos) || 
        brinquedosPessoa1.length === 0 || 
        brinquedosPessoa2.length === 0) {
      return { erro: "Brinquedo inválido", lista: false };
    }

    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;
    let resultado = [];

    for (let nomeAnimal of ordemAnimais) {
      if (!datasetDeAnimaisDoAbrigo[nomeAnimal]) {
        resultado.push(`${nomeAnimal} - abrigo`);
        continue;
      }
      let pessoa1PodeAdotar = false;
      let pessoa2PodeAdotar = false;
      let tipo = datasetDeAnimaisDoAbrigo[nomeAnimal].tipo;
      let favoritos = datasetDeAnimaisDoAbrigo[nomeAnimal].favoritos;
      let status = "abrigo";

      switch (tipo) {
        case "jabuti":
          pessoa1PodeAdotar = favoritos.every((fav) => brinquedosPessoa1.includes(fav));
          pessoa2PodeAdotar = favoritos.every((fav) => brinquedosPessoa2.includes(fav));
          if (pessoa1PodeAdotar && adotadosPessoa1 > 0 && adotadosPessoa1 < 3 && !pessoa2PodeAdotar) {
            status = "pessoa 1";
            adotadosPessoa1++;
          } else if (pessoa2PodeAdotar && adotadosPessoa2 > 0 && adotadosPessoa2 < 3 && !pessoa1PodeAdotar) {
            status = "pessoa 2";
            adotadosPessoa2++;
          } else {
            status = "abrigo";
          }
          break;
    
          case "gato":
          pessoa1PodeAdotar = brinquedosFavoritosNaOrdem(brinquedosPessoa1, favoritos);
          pessoa2PodeAdotar = brinquedosFavoritosNaOrdem(brinquedosPessoa2, favoritos);
          if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
            status = "abrigo";
          } else if (pessoa1PodeAdotar && adotadosPessoa1 < 3) {
            status = "pessoa 1";
            adotadosPessoa1++;
          } else if (pessoa2PodeAdotar && adotadosPessoa2 < 3) {
            status = "pessoa 2";
            adotadosPessoa2++;
          } else {
            status = "abrigo";
          }
          break;
    
          case "cão":
          pessoa1PodeAdotar = brinquedosFavoritosNaOrdem(brinquedosPessoa1, favoritos);
          pessoa2PodeAdotar = brinquedosFavoritosNaOrdem(brinquedosPessoa2, favoritos);
          if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
            status = "abrigo";
          } else if (pessoa1PodeAdotar && adotadosPessoa1 < 3) {
            status = "pessoa 1";
            adotadosPessoa1++;
          } else if (pessoa2PodeAdotar && adotadosPessoa2 < 3) {
            status = "pessoa 2";
            adotadosPessoa2++;
          } else {
            status = "abrigo";
          }
          break;
    
          default:
          status = "abrigo";
      }
      resultado.push(`${nomeAnimal} - ${status}`);
    }
    
    resultado.sort((a, b) => a.localeCompare(b));
    return { lista: resultado, erro: null };
}
}
export { AbrigoAnimais as AbrigoAnimais };
