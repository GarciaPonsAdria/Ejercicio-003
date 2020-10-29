/*
    Insertamos una serie de valores concretados en el documento de "Query Documents".
    Usaremos una nueva colección llamada "inventory" dentro de mi base de datos "Adri".

    Los insertaremos mediante la función "insertMany".

    Estructura: {
        item: string
        qty: int
        size: object
            h: int
            w: int
            uom: string
        status: string
    }
*/

db.inventory.insertMany([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);

/* Tras insertar los documentos concretados arriba (sacados del manual de mongo) insertamos
más documentos respetando el formato. */

db.inventory.insertMany([
   { item: "pencil", qty: 250, size: { h: 1, w: 4, uom: "cm" }, status: "B" },
   { item: "carpet", qty: 5, size: { h: 10, w: 12, uom: "in" }, status: "A" },
   { item: "rubber", qty: 500, size: { h: 3, w: 2, uom: "cm" }, status: "C" },
   { item: "tipex", qty: 12, size: { h: 1, w: 4, uom: "cm" }, status: "A" },
   { item: "keyboard", qty: 5, size: { h:5 , w: 40, uom: "cm" }, status: "B" }
]);

/* Insertamos los documentos concretados arriba y comenzamos a realizar querys

    Atención: Los recursos utilizados en cada una de las siguientes Querys vendrán explicados en el documento pdf adjunto.

 */

// Encuentra todos los documentos de una cantidad menor a 100 o cuyo status sea B o C.
db.inventory.find({ $or: [ { qty: { $lt: 100 } }, { status: { $in: ["B","C"] } } ] } )

// Encuentra todos los documentos de una cantidad mayor a 50 y cuyo status A.
db.inventory.find({ $and: [ { qty: { $gte: 50 } }, { status: "A" } ] } )

// Encuentra los documentos que no tengan una cantidad igual a 250 o 100 y su "h" sea inferior a 5.
db.inventory.find({ $and: [ { qty: { $nin: [250,100] } }, { 'size.h': { $lt: 5 } } ] } )

// Encuentra todos los documentos cuyo status sea "B" y tengan por cantidad 250 
db.inventory.find({status:"B", qty:250})

// Encuentra todos los items que no empiecen por la letra "p"
db.inventory.find({ item: { $not: /^p.*/ } } )

// Encuentra todos los documentos cuyo status no sea B o su size.h no sea igual a 1.
db.inventory.find( { $nor: [ { 'size.h': {h:1} }, { status: "B" } ]  } )