const prix = { 'thé': 100, 'café': 300, 'chocolat': 500 };
class Traducteur {

   constructor(machine) {
    this.machine = machine;
  }

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

  commander(commande) {
    const { boisson, sucres = 0, argent = 0 } = commande;
    const manque = prix[boisson] - argent;

    if (manque > 0) {
      this.machine.envoyer(this.message(`Il manque ${manque} FCFA`));
      return;
    }

    this.machine.envoyer(this.traduire(boisson, sucres));
  }
}



module.exports = Traducteur;