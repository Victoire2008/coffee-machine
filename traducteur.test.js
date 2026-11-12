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