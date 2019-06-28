const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: '17e3b08bd3f24827bffe3992dc83359a'
  });

const handleAPI=(req,res)=>{
    const {input}=req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL,input)
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('error')) 
}   
 


const handleImage=(db)=>(req, res) => {
    const { id } = req.body;
    db('users').where({ id }).increment('entries', 1)
        .returning('entries')
        .then(data => {
            if (data.length)
                res.json(data[0])
            else
                res.status(404).json('User not found');
        })
        .catch(err => res.status(400).json('connection error'))
}

module.exports=({handleImage,handleAPI})