class Listamosse {

    /* serve per spostare il muletto
        ad ogni mossa si aggiorna la mappa cambiando il muletto
    */
    mosse = [];

    createMosse(seq){
        for (let i = 0; i < seq.length; i++) {
            this.mosse.push(seq[i]);
        }
    }
    
    isEmpty() {
        return (this.mosse.length == 0 || this.mosse === undefined);
    }

    getMossa() {
        return this.mosse.shift();
    }

    aggiungiMossa(mossa){
        this.mosse.unshift(mossa);
    }
}
module.exports = Listamosse;