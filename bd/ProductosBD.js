const ConectarBD=require("./ConectarBD");

class ProductoBD extends ConectarBD{
 constructor(){
    super();
 } 
    async nuevoProducto(producto){
    const sql="INSERT INTO productos values(null,'"+producto.nombre+"','"+producto.precio+"','"+producto.cantidad+"','"+producto.descuento+"');";
        try {
        await this.conectarMySql();
        this.conexion.execute(sql);
        console.log("New Producto");
        await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar producto" + error);
            console.error(sql);
        }
    }
    async mostrarProductos() {
        const sql="SELECT * FROM productos;";
        try {
            await this.conectarMySql();
            const [productosMySql]= await this.conexion.query(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return(productosMySql);
        } catch (error) {
            console.error("Error al obtener los datos "+ error);
            console.error(sql);
        }
    }

    async productoID(id) {
        const sql="SELECT * FROM productos WHERE id="+id+";";
        try {
            await this.conectarMySql();
            const [[producto]]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consulta correcta por id :]");
            return producto;
        } catch (error) {
            console.error("Algo fallo al consultar por id "+error);
            console.error(sql);
            
        }
    }

    async editarProducto(producto){
        const sql="UPDATE productos set nombre='"+producto.nombre+"','"+producto.precio+"','"+producto.cantidad+"','"+producto.descuento+"';";
        const sql2=`UPDATE productos set 
        nombre='${producto.nombre}',
        precio='${producto.precio}',
        cantidad='${producto.cantidad}',
        descuento='${producto.descuento}' 
        WHERE id='${producto.id}' ;`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
            console.log("Actualización exitosa");
        } catch (error) {
            console.error("Error al editar el producto" + error);
            console.error(sql2);
        }
    }

    async borrarProducto(id){
        const sql="DELETE FROM productos WHERE id="+id+";";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto borrado exitosamente");
        } catch (error) {
            console.error("Fallo al borrar el producto" + error);
            console.error(sql);
        }
    }

}

module.exports=ProductoBD;
