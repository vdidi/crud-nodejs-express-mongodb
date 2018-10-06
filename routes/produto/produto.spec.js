const mongoose = require('mongoose')
const Produto = mongoose.model('Produto')

module.exports = (chai, server) => {
    describe('Produto', () => {
        
        //Cleaning the database to start the tests
        beforeEach((done) => {
            Produto.remove()
            .then(()=>{
                const produto_test = Produto({nome: 'mouse', preco: 99.0, descricao: 'This is a mouse'})
                produto_test.save()
                .then(() => {
                    done()
                })
            })
        })

        describe('/GET produto', () => {
            it('it should GET ALL the produtos', (done)=> {
                chai.request(server)
                .get(`${server.APIROOTPATH}/produto?skip=0&limit=1`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body[0].should.to.have.property('title')
                    res.body[0].should.to.have.property('transaction_kind')
                    res.body[0].should.to.have.property('property_nature')
                    res.body[0].should.to.have.property('renting_price')
                    res.body[0].should.to.have.property('description')
                    res.body[0].should.to.have.property('locality')
                    res.body[0].should.to.have.property('country')
                    res.body[0].should.to.have.property('street_number')
                    res.body[0].should.to.have.property('zip_code')
                done()
                })  
            })
        })
    })
}