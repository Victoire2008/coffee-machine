//te0t de Thé
const Traducteur = require('./traducteur');

test('une commande de thé donne T::', () => {
  const traducteur = new Traducteur();
  expect(traducteur.traduire('thé')).toBe('T::');
});
//test de café
test('une commande de café  donne C::',() => {
  const traducteur = new Traducteur();
  expect(traducteur.traduire('café')).toBe('C::');
});
//test de chocolat
test('une commande de chocolat donne H::',() => {
    const traducteur = new Traducteur();
    expect(traducteur.traduire('chocolat')).toBe('H::');
});
//test avec le sucre
test('une commande de thé avec 1 sucre donne T:1',() => {
    const traducteur = new Traducteur();
    expect(traducteur.traduire('thé', 1)).toBe('T:1:0');
});

test('une commande de café avec 1 sucre donne C:1:0', () => {
  const traducteur = new Traducteur();
  expect(traducteur.traduire('café', 1)).toBe('C:1:0');
});

test('une commande de chocolat avec 1 sucre donne H:1:0', () => {
  const traducteur = new Traducteur();
  expect(traducteur.traduire('chocolat', 1)).toBe('H:1:0');
});

//méthode message
test('un message envoyé avec le préfixe M:', () => {
  const traducteur = new Traducteur();
  expect(traducteur.message('Bonjour')).toBe('M:Bonjour');
});

//itération 2

test('une commande avec assez d\'argent est envoyée à la machine', () => {
  const machine = { envoyer: jest.fn() };
  const traducteur = new Traducteur(machine);

  traducteur.commander({ boisson: 'thé', sucres: 1, argent: 500 });

  expect(machine.envoyer).toHaveBeenCalledWith('T:1:0');
});

test('le montant exact suffit pour un thé', () => {
  const machine = { envoyer: jest.fn() };
  const traducteur = new Traducteur(machine);

  traducteur.commander({ boisson: 'thé', argent: 250 });

  expect(machine.envoyer).toHaveBeenCalledWith('T::');
});

test('argent insuffisant pour un café : message avec le montant manquant', () => {
  const machine = { envoyer: jest.fn() };
  const traducteur = new Traducteur(machine);

  traducteur.commander({ boisson: 'café', argent: 250 });

  expect(machine.envoyer).toHaveBeenCalledWith('M:Il manque 50 FCFA');
  expect(machine.envoyer).toHaveBeenCalledTimes(1);
});

test('argent insuffisant pour un chocolat : message avec le montant manquant', () => {
  const machine = { envoyer: jest.fn() };
  const traducteur = new Traducteur(machine);

  traducteur.commander({ boisson: 'chocolat', argent: 100 });

  expect(machine.envoyer).toHaveBeenCalledWith('M:Il manque 400 FCFA');
});

test('trop d\'argent : la boisson est quand même préparée', () => {
  const machine = { envoyer: jest.fn() };
  const traducteur = new Traducteur(machine);

  traducteur.commander({ boisson: 'café', argent: 2000 });

  expect(machine.envoyer).toHaveBeenCalledWith('C::');
});