const handleSignin=(db,bcrypt)=>(req, res) => {
    const { email, pass } = (req.body);
    if(!email||!pass)
    return res.status(400).json('Fill in all details!')
    db.select('*').from('login').where({email})
    .then(data=>{
        if(data.length ){
            if(bcrypt.compareSync(pass, data[0].passHash)){
                db.select('id').from('users').where({email})
                .then(data=>res.json({
                    message: 'success',
                    id: data[0].id}
                    ))
                .catch(err=>res.status(400).json('error'))    

                
        
    }
        else return res.status(400).json('invalid password');
        }
        else return (res.status(404).json('email not registered'))
    })
    .catch(err=>res.status(400).json('connection error'))
    
}

module.exports=({handleSignin:handleSignin})