const getProfile=(db)=>(req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(data => {
            if (data.length)
                res.json(data[0])
            else
                res.status(404).json('User not found');
        })
        .catch(err => res.status(400).json('connection error'))

}

const deleteProfile=(db)=>(req, res) => {
    const { id } = req.params;
    db.transaction(trx=>{
        trx('users').where({id}).returning('email').del()
        .then(email=>{
            return trx('login').where({email:email[0]}).returning('email').del()
            .then(email=>res.json(email+' was successfully deleted'))
        }).then(trx.commit)
        .catch(err=>res.status(400).json('error'))
    })
    
        .catch(err => res.status(400).json('connection error'))
}

const changePass=(db)=>(req,res)=>{
    const { id } = req.params;
    const passHash=req.body.passHash;
    db.select('email').from('users').where({id})
    .then(data=>{
        db('login').where({email:data[0].email}).update('passHash',passHash)
        .then(data=>res.json('password successfully updated'))
        .catch(err=>res.status(400).json('error'))
    }).catch(err=>res.status(400).json('error'))
}

module.exports=({getProfile,deleteProfile,changePass})