class Traducteur {
  traduire(boisson, sucres = 0) {
    const codes = { 'thé': 'T', 'café': 'C', 'chocolat': 'H' };
    const code = codes[boisson];

    if (sucres > 0) {
      return `${code}:${sucres}:0`;
    }

    return `${code}::`;
  }
  message(texte) {
    return `M:${texte}`;
  }
}

module.exports = Traducteur;