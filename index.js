// Importar uma biblioteca
const { request } = require('express')
const express = require('express')
const uuid = require('uuid')
const porta = 3000

// Express esta dentro dessa variabel app
const app = express()
app.use(express.json())

// // Rota da aplicação
// app.get('/users/', (request, response) => {

//     const { name, age } = request.body

//     return response.json({ name, age})
// })

// // A porta onde vai rodar a aplicação
// app.listen(porta, () => {
//     console.log(`Servidor Rodando na porta ${porta}!!!`)
// })


 /*
    - Query params => meusite.com/users?name=leonardo&age=28 // FILTROS
    - Route params => /users/2    // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - Request Body => { "name": "Leonardo", "age": "28"}

        CRUD

        - GET               => Buscar informação no back-end
        - POST              => Criar informação no back-end
        - PUT / PATCH       => Atualizar/Alterar informação no back-end
        - DELETE            => Deletar informação no back-end
        - MIDDLEWARW        => INTERCEPTADOR => Tem co poder de parar ou alterar dados da requisição

        CODIGO DO CRUD

        const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name , age } = request.body

    const user = { id: uuid.v4() , name, age }

    users.push(user)

    return response.status(201).json(user)
}) 

app.put('/users/:id', (request, response) => {

    const { id } = request.params
    const { name, age } = request.body

    const updateUser = { id, name, age }

    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json( { message: "Esse usuario não existe!!!"} )
    }

    users[index] = updateUser

    return response.status(200).json(updateUser)
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params


    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json( { message: "Esse usuario não existe!!!"} )
    }


    users.splice(index,1)
    return response.status(204).json()


})

// */ 

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json( { message: "Esse usuario não existe!!!"} )
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name , age } = request.body

    const user = { id: uuid.v4() , name, age }

    users.push(user)

    return response.status(201).json(user)
}) 

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id , name, age }
    users[index] = updateUser

    return response.status(200).json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index,1)
    return response.status(204).json()


})






    app.listen(porta, () => {
         console.log(`Servidor Rodando na porta ${porta}!!!`)
     })