

const handleUsers=(db)=>(req, res) => {
    db.select('*').from('users')
        .then(data => res.json(data))
        .catch(err => res.status(400).json('connection error'))
}

module.exports=
    {handleUsers:handleUsers}
