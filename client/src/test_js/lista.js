class Lista {
    
    lista = ['a', 'c', 'b', 'i', 's'];
    constructor() {}
  
    getLista() {
      return this.listaToString();
    }
    
    listaToString() {
      let out = "";
      for (let i = 0; i < this.lista.length; i++) {
        out += this.lista[i];
      }
      return out += "";
    }
  }
  
  module.exports = Lista;
