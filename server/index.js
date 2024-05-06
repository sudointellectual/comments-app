const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const DataAccessObject = require('./dataAccessObject')
const Comment = require('./comment')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const dataAccessObject = new DataAccessObject('database.sqlite3')
const comment = new Comment(dataAccessObject)

comment.createTable().catch((error) => {
    console.log(`Error: ${JSON.stringify(error)}`)
})

app.post('/createComment', function (request, response) {
    const { body } = request
    comment.createComment(body).then((result) => {
        response.send(result)
    })
})

app.get('/getComment', function (request, response) {
    const { body } = request
    const { id } = body
    comment.getComment(id).then((result) => {
        response.send(result)
    })
})

// app.get('/getComments', function (request, response) {
//     comment.getComments().then((result) => {
//         response.send(result)
//     })
// })

app.get('/getComments', (req, res) => {
    comment.getComments().then((comments) => {
        const page = parseInt(req.query.page)
        const pageSize = parseInt(req.query.pageSize)

        // Calculate the start and end indexes for the requested page
        const startIndex = (page - 1) * pageSize
        const endIndex = page * pageSize

        // Slice the comments array based on the indexes
        const paginatedComments = comments.slice(startIndex, endIndex)

        // Calculate the total number of pages
        const totalPages = Math.ceil(comments.length / pageSize)

        // Send the paginated comments and total pages as the API response
        res.json({ comments: paginatedComments, totalPages })
    })
})

app.delete('/deleteComments', function (request, response) {
    comment.deleteComments().then((result) => {
        response.send(result)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
    // const rootDir = __dirname.replace('/server', '');
    // response.sendFile(`${rootDir}/src/index.html`);
})
