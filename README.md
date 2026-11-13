Coffee Machine kata TDD 

Mini-projet d'apprentissage du développement piloté par les tests (TDD).

Le code traduit les commandes des clients d'une machine à café en messages pour la machine à boissons, selon le protocole du kata Coffee Machine. La machine à boissons n'est pas implémentée : elle est simulée dans les tests (mock Jest).

## Technologies

# JavaScript (Node.js)
- Jest (tests et simulation de la machine à boissons)
- Git / GitHub
Prérequis
- Node.js (version LTS)

## Installation
- git clone https://github.com/TON-UTILISATEUR/coffee-machine.git
cd coffee-machine
npm install

## Lancer les tests
- npm test

Résultat attendu : 23 tests réussis

## Structure du projet

coffee-machine/
├── traducteur.js         # code de production (classe Traducteur)
├── traducteur.test.js    
├── package.json
└── README.md

## Fonctionnalités réalisées

- Itération 1 — Préparation des boissons
 _Thé, café et chocolat avec les bons codes (T, C, H).
 _Ajout d'un ou deux sucres.
 _Ajout de la touillette (0) uniquement quand il y a du sucre.
 _Envoi d'un message à afficher (M:...).

- Itération 2 — Lancement de l'entreprise
La machine n'est plus gratuite : la boisson n'est préparée que si l'argent suffit. Sinon, un message indique le montant manquant. Si l'argent est en trop, la boisson est préparée normalement (la machine rend la monnaie).

- Itération 3 — Extra chaud
 _Ajout du jus d'orange (code O, 400 FCFA)
 _Boissons extra chaudes : un h est ajouté au code (Ch::, Hh:1:0, Th:2:0).
 _Le jus d'orange ne peut pas être extra chaud : l'option est ignorée.

- Itération 4 — Gagner de l'argent
un rapport peut être demandé à tout moment. Il indique le nombre vendu de chaque boisson et le total gagné en FCFA. Seules les boissons réellement préparées sont comptées (une commande refusée faute d'argent ne l'est pas). Les données sont conservées en mémoire dans la classe `Traducteur`.

## Étapes réalisées

1. Préparation de l'environnement : installation de Node.js et de Jest, création du projet (npm init), configuration du script test.

2. Premier test rouge : thé sans sucre, qui doit donner T::.

3. Premier code vert : la solution la plus simple, une méthode qui renvoie 'T::' en dur.
4. Café : le deuxième test a fait échouer le code, ce qui a forcé l'ajout d'une condition.

5. Chocolat : test écrit en autonomie, puis condition ajoutée.

6. Sucre : ajout d'un deuxième paramètre à traduire, avec 0 comme valeur par défaut.

7. Message M: : nouvelle méthode message.

8. Simulation de la machine : classe Traducteur construite avec une machine, méthode commander qui envoie la commande. Test avec jest.fn().

## Difficultés rencontrées

## Difficultés rencontrées

**Comprendre l'intérêt du TDD.** Au début, je ne comprenais pas pourquoi il fallait écrire les tests avant le code. Il me semblait plus rapide de coder directement, et écrire un code volontairement très simple  me paraissait étrange. J'ai compris avec le deuxième test, celui du café : il a échoué, ce qui a obligé mon code à évoluer. Mon premier test (le thé) m'a en même temps confirmé que je n'avais rien cassé. Je me suis rendu compte que les tests servent de filet de sécurité quand on modifie le code.

**Comprendre la simulation de la machine.** L'énoncé parle d'un « framework de simulation » et je ne voyais pas à quoi il servait, puisque la machine à boissons n'existe pas. J'ai fini par comprendre qu'on crée une fausse machine (`jest.fn()`) qui retient ce qu'elle reçoit, ce qui permet de vérifier que mon code envoie bien le bon message.

**`npm test` bloqué sous PowerShell.** Dès mon premier lancement, Windows a affiché une erreur de sécurité et les tests ne se lançaient même pas. Le problème ne venait pas de mon code : PowerShell bloque l'exécution de scripts par défaut. Je l'ai résolu en utilisant `npm.cmd test`.

**Mes erreurs en ajoutant le sucre.** J'ai écrit `sucre` au lieu de `sucres` dans une condition, mis `1` comme valeur par défaut au lieu de `0` (un thé simple aurait eu du sucre), et laissé un `return 'T:1:0'` écrit en dur à la fin. Mes tests échouaient. J'ai corrigé en lisant attentivement les messages `Expected` et `Received` de Jest.

**Un test faux, pas le code.** Un test restait rouge alors que mon code était juste : j'avais écrit `T:1` au lieu de `T:1:0` dans le test lui-même. J'ai appris à comparer `Expected` avec le protocole de l'énoncé pour savoir si l'erreur vient du test ou du code.


**Argent inséré ou argent gagné ?** Pour le rapport de l'itération 4, je me suis demandé s'il fallait compter l'argent inséré par le client. Comme la machine rend la monnaie, le total gagné est en réalité la somme des prix des boissons vendues, et une commande refusée n'est pas comptée.

**Choix de la représentation de la commande.** J'ai d'abord passé les informations en arguments séparés, mais avec l'argent puis l'extra chaud, l'appel devenait difficile à lire. Je suis passé à un objet de commande, plus clair. 

**Le manque de temps.** Le délai était court. J'ai mis mon code sur GitHub dès la fin de la première itération, puis je l'ai mis à jour après chaque itération, pour toujours avoir une version prête à rendre. Je n'ai pas eu le temps de réaliser l'itération 5.