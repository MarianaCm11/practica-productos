const ruta =require("express").Router(); // se requiere express pero .Router solo se manda llamar esta de todas sus funciones
const UsuarioClase=require("../clases/UsuarioClase");
const ProductoClase=require("../clases/ProductoClase");
const UsuarioBD=require("../bd/UsuariosBD");
const ProductoBD=require("../bd/ProductosBD");

ruta.get("/",async(req,res)=>{
    //var usuario1= new UsuarioClase();
    const usuariobd=new UsuarioBD();
    const usuariosMySql= await usuariobd.mostrarUsuarios();
    //console.log(usuariosMySql);
    var usuariosCorrectos=[];
    usuariosMySql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);
        if (usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined) {
            usuariosCorrectos.push(usuario);
        }
    });
    console.log(usuariosCorrectos);  
    res.render("mostrarUsuarios",{usuariosCorrectos});
});

ruta.post("/agregarUsuario",(req,res)=>{
    //console.log(req.body);
    var usuario1=new UsuarioClase(req.body);
    //console.log(usuario1);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd=new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.mostrarDatos)
        //console.log(usuario1);
        res.render("inicioU",usuario1.mostrarDatos);
    }else{
      res.render("errorU");
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formularioU");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{ // con : se indica que hay una variable 
    // res.send("Estas en editar "+req.params.id); // params ees para hipervinculo y body para formulario

   try {
    const usuariobd= new UsuarioBD();
    const usuario= await usuariobd.usuarioID(req.params.id);
    res.render("editarUsuario",usuario);
   } catch (errorU) {
    
   }
    // res.end();
    // res.render("editarUsuario")
});

ruta.post("/editarUsuario", async(req,res)=>{
    try {
        const usuariobd= new UsuarioBD();
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado con exito");
        res.redirect("/");
    } catch (errorU) {
        console.log("Error al editar al usuario "+error);

    }
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect("/");
    } catch (errorU) {
        console.log("Algo fallo al borrar"+error);
    }
});

/* PRODUCTO*/
ruta.get("/mostrarProductos",async(req,res)=>{
    const productobd=new ProductoBD();
    const productosMySql= await productobd.mostrarProductos();
    var productosCorrectos=[];
    productosMySql.forEach(producto => {
        var producto1 = new ProductoClase(producto);
        if (producto1.nombre!=undefined && producto1.precio!=undefined && producto1.cantidad!=undefined) {
            productosCorrectos.push(producto);
        }
    });
    console.log(productosCorrectos);  
    res.render("mostrarProductos",{productosCorrectos});
});
ruta.post("/agregarProducto",(req,res)=>{
    //console.log(req.body);
    var producto1=new ProductoClase(req.body);
    console.log(producto1);
    if(producto1.nombre!=undefined && producto1.precio!=undefined && producto1.cantidad!=undefined && producto1.descuento!=undefined){
        const productobd=new ProductoBD();
        //console.log(producto1);
        productobd.nuevoProducto(producto1.mostrarDatos)
        res.render("inicioP",producto1.mostrarDatos);
    }else{
      res.render("errorP");
    }
});
ruta.get("/agregarProducto",(req,res)=>{
    res.render("formularioP");
});
ruta.get("/editarProducto/:id",async(req,res)=>{ 
    try {
     const productobd= new ProductoBD();
     const producto= await productobd.productoID(req.params.id);
     res.render("editarProducto",producto);
    } catch (errorP) {
     
    }
});
ruta.post("/editarProducto", async(req,res)=>{
     try {
         const productobd= new ProductoBD();
         await productobd.editarProducto(req.body);
         console.log("Producto editado con exito");
         res.redirect("/mostrarProductos");
     } catch (errorP) {
         console.log("Error al editar producto "+error);
 
     }
});
ruta.get("/borrarProducto/:id",async(req,res)=>{
    try {
        const productobd=new ProductoBD();
        await productobd.borrarProducto(req.params.id);
        res.redirect("/mostrarProductos");
    } catch (errorP) {
        console.log("Algo fallo al borrar"+error);
    }
});

module.exports=ruta; // para exportar una variable