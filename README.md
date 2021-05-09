# Flash Loans Manager

![](https://media1.tenor.com/images/799f308540b05ee0eaab16718e9d5b71/tenor.gif)

Le but de ce projet est de créer une interface permettant de générer des flash loans à l'aide des plateformes [Uniswap](https://app.uniswap.org/), [Sushiswap](https://sushi.com/) et [AAVE](https://aave.com/).

## Installation

```bash
git clone git@github.com:elcitrovmtgrande/flash-loans-manager.git
cd $_ && yarn install
```

⚠️ En cas de nouvelle dépendance à installer, **utiliser `yarn`** et non npm !!!
Pour installer avec yarn, faire `yarn add dependency-name`

## Lancement en mode développement

```bash
yarn dev
```

## Lancement des tests

```bash
yarn test
```

## Concept

Si vous ne savez pas encore ce qu'est un flash loan, merci de lire ce [super article]().
Ceci étant dit, voici le protocole que devra suivre un programme pour être efficace :

1. Analyser les marchés en temps réel afin de dénicher des erreurs d'arbitrage
2. Définir une stratégie avec un ou plusieurs flash loans
3. Exécuter le ou les flash loans lorsque les circonstances le permettent
4. Affichier une traçabilité de toutes les opérations effectuées afin de pouvoir améliorer le robot

## Upcoming features
Voici la liste des tâches les plus importantes à developper.
Chaque classe devra présenter des tests unitaires.

| Tâche  	| Statut  	|
|---	    |---	      |
| Classe `Pair.js`  	    |   ❌	    |
| Classe `FlashLoan.js`  	    |   ❌	    |
| Classe `Strategy.js`  	    |   ❌	    |
| Création de points d'API permettant d'analyser ou de consulter les FlashLoans et strégies disponibles 	    |   ❌	    |
| Création d'une UI basique permettant de piloter le robot depuis une GUI	    |   ❌	    |

### Class `Pair.js`
La classe `Pair` doit permettre de pouvoir modéliser une paire de devise.
Elle possédera des méthodes lui permettant d'observer en temps réel ou non, ses devises

```javascript
/**
 * Exemple de code pour l'API finale
 * 
*/
const pair = new Pair(['ETH', 'DAI']);
const cb = () => console.log('Opportunité arbitrage trouvée !');

/**
 * Pair.watch
 * Renvoie toutes les 1000 millisecondes les informations de cette paire
 * sur les différentes places de marché
 * @param {Integer} milliseconds Les millisecondes du compte-à-rebours
 * @optional @param {Function} callback Fonction qui serait exécuté en cas d'erreur d'arbitrage
 */
pair.watch(1000, cb);

// Affichera : Opportunité arbitrage trouvée en cas d'opportunité
```

### Class `FlashLoan.js`
La classe `FlashLoan` doit permettre de pouvoir modéliser un flash loan.
Elle prendra au sein de son constructeur une paire de devise, ainsi qu'un objet de configuration
permettant de renseigner le flashloan
Il devra posséder une méthode `exec` permettant d'exécuter le flashLoan
Cette méthode `exec` devra évidemment logger toutes les étapes du Flash Loan du début à la fin.

#### Propriétés du FlashLoan
| Propriété  	| Type  	| Commentaire
|---	    |---	      |---	    
| pair  	| *Pair*  	| La paire de devise concernée par ce Flash loan
| threshold  	| *Float*  	| Le pourcentage d'erreur d'arbitrage acceptable
| borrow  	| *Float*  	| La somme empruntable au moment du Loan
| outputWallet  	| *String*  	| L'addresse publique du portefeuille où déposer l'excédent en cas de succès

```javascript
/**
 * Exemple de code pour l'API finale
 * 
*/
const flashLoan = new FlashLoan({
  pair: new Pair(['BTC', 'EUR']),
  threshold: 0.5,
  borrow: 1000,
  outputWallet: '0xccc23229b45642af11c2c0b1d2b7082bb187cbf3'
});

flashLoan.exec();
```

## Utils resources
- [API GraphQL Uniswap](https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2?selected=logs)