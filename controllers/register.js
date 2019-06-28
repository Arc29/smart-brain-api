const handleRegister = (db) => (req, res) => {
    const { email, passHash, name } = (req.body);
    if(!email||!name)
    return res.status(400).json('Fill in all details!')
    db.transaction(trx => {
        trx.insert({
            email: email,
            passHash: passHash
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        doj: new Date(),
                        email: loginEmail[0]
                    }).then(user => res.json(user[0]))

            })
            .then(trx.commit)
            .catch(err => res.status(400).json('unable to register'))

    })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports=({handleRegister})