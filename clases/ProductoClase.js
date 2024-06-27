class Producto{
    constructor(producto1){
        //console.log(producto1);
        this.id=producto1.id;
        this.nombre=producto1.nombre;
        this.precio=producto1.precio;
        this.cantidad=producto1.cantidad;
        this.descuento=producto1.descuento;
    }

    set id(id){
        this._id=id;
    }
    set nombre(nombre){
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if(regexNombre.test(nombre)){
            this._nombre=nombre;
        }

    }
    set precio(precio){
        var regexPrecio = /^[0-9]/;
        if(regexPrecio.test(precio)){
            this._precio=precio;
        }
        
    }
    set cantidad(cantidad){
        var regexCantidad = /^[0-9]/;
        if(regexCantidad.test(cantidad)){
            this._cantidad=cantidad;
        }
        
    }

    set descuento(descuento){
        var regexDescuento = /^[0-9]/;
        if(regexDescuento.test(descuento)){
            this._descuento=descuento;
        }
        
    }


    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get precio(){
        return this._precio;
    }
    get cantidad(){
        return this._cantidad;
    }
    get descuento(){
        return this._descuento;
    }
    get mostrarDatos(){
        return{
            id:this.id,
            nombre:this.nombre,
            precio:this.precio,
            cantidad:this.cantidad,
            descuento:this.descuento
        }
    }
}
module.exports=Producto;