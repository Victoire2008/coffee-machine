const prix = { 'thé': 100, 'café': 300, 'chocolat': 500, 'jus d\'orange': 400 };
const codes = { 'thé': 'T', 'café': 'C', 'chocolat': 'H', 'jus d\'orange': 'O' };
const boissonsChaudes = ['thé', 'café', 'chocolat'];

class Traducteur {
  constructor(machine) {
    this.machine = machine;
    this.ventes = {};
    this.total = 0;
  }

  traduire(boisson, sucres = 0, extraChaud = false) {
    let code = codes[boisson];

    if (extraChaud && boissonsChaudes.includes(boisson)) {
      code += 'h';
    }

    if (sucres > 0) {
      return `${code}:${sucres}:0`;
    }

    return `${code}::`;
  }

  message(texte) {
    return `M:${texte}`;
  }

  commander(commande) {
    const { boisson, sucres = 0, argent = 0, extraChaud = false } = commande;
    const manque = prix[boisson] - argent;

    if (manque > 0) {
      this.machine.envoyer(this.message(`Il manque ${manque} FCFA`));
      return;
    }

    this.machine.envoyer(this.traduire(boisson, sucres, extraChaud));
    this.enregistrerVente(boisson);
  }

  enregistrerVente(boisson) {
    this.ventes[boisson] = (this.ventes[boisson] || 0) + 1;
    this.total += prix[boisson];
  }
  rapport() {
    const lignes = Object.keys(prix).map((boisson) => `${boisson}: ${this.ventes[boisson] || 0} ventes`);
    return ['Rapport des ventes', ...lignes, `Total: ${this.total} FCFA`].join('\n');
  }
    imprimerRapport() {
        console.log(this.rapport());
    }
}

module.exports = Traducteur;