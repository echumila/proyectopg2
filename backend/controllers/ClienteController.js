var Cliente = require('../models/cliente');

function listar(req, res){
    Cliente.find((err, clientes_data)=>{
        if(clientes_data){
            res.status(200).send({clientes: clientes_data});
        }else{
            res.status(403).send({message: 'no hay clientes en la base de datos'});
        }
    });
}

function get_cliente(req, res){
    var id = req.params['id'];
     
    Cliente.findById(id,(err,cliente_data)=>{
        if(cliente_data){
            res.status(200).send({cliente: cliente_data});
        }
    })
}

function registrar(req, res){
    let data = req.body;
    var cliente = new Cliente();
    cliente.nombres = data.nombres;
    cliente.correo = data.correo;
    cliente.codigo = data.codigo;
    cliente.puntos = 10;
    
    cliente.save((err, cliente_save)=>{
        if(cliente_save){
            res.status(200).send({cliente: cliente_save});
        }else{
            res.status(500).send(err);
        }
    });
}

function editar(req, res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findByIdAndUpdate(id, {nombres: data.nombres, codigo: data.codigo, correo: data.correo}, (err, cliente_edit)=>{
        if(cliente_edit){
            res.status(200).send({cliente: cliente_edit})
        }else{
            res.status(500).send(err);
        }
    });
}

function eliminar(req, res){
    let id = req.params['id'];

    Cliente.findByIdAndRemove(id, (err, cliente_delete)=>{
        if(cliente_delete){
            res.status(200).send({cliente: cliente_delete}) 
        }else{
            res.status(500).send(err);
        }
    });
}

module.exports = {
    listar,
    registrar,
    editar,
    eliminar,
    get_cliente
}