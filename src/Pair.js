class Pair {
  constructor(pair) {
    this.pair = pair;
  }

  async watch() {
    // todo
    /**
     * 1) Je recupere l'id block ETH de la blockchain ethereum
     * 2) Je recupere le contenu du block grace a son id
     * 3) Je recupere les transactions
     * 4) Je recherche les valeurs pour ma paire
     * 5) Je calcule une moyenne pour ces valeurs s'il y en a plusieurs
     * 6) J'execute la callback en cas d'erreur d'arbitrage
     */
  }
}

export default Pair;
