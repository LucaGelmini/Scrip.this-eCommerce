const {validationResult} = require('express-validator')
const db = require('../database/models')
const unitsModel = require('../database/models/Status')
const exposition = {
    getAll: function(req,res){
        db.Status.findAll()
            .then(status =>{
     
            
                return res.render('listExposition',{expositions:status})
            })
    },
    crear: function(req,res){
        res.render('expositionCreate')
    },
    creacion: function(req,res){
        const validaciones = validationResult(req)
   
        if(validaciones.errors.length > 0){
            res.render('expositionCreate'
            ,{
                errors: validaciones.mapped(),
                oldData:req.body
            }
            )
        }
        db.Status.create({
            name:req.body.unidad
        })
        res.redirect('/expositions')
    },
    editar: function(req,res){
        
        db.Status.findByPk(req.params.id)
            .then(unit =>{   

                return  res.render('updateExpositions',{expositions:unit})
            })
       
    },
    edicion: function(req,res){
        let unidadEditada=req.body.datoEditar
        let id = req.params.id
   
        
        db.Status.update({name:unidadEditada }
            ,{
            where:{
                id
            }
        }
        )
        res.redirect('/expositions')
    },
    eliminar:function(req,res){
        res.render('unitsDelete')
    },
    eliminacion: function(req,res){
       const idEliminar = req.params.id
   
        db.Status.destroy({
            where:{
                name: idEliminar
            }
        })
        res.redirect('/expositions')
    }

}
module.exports = exposition