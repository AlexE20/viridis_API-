import express from "express";
import cors from "cors"

const app=express();

const PORT=3000;

app.use(cors());
app.use(express.json());

app.get('/',(rq,res)=>{
    res.send('Initial api ');
});

app.listen(PORT,()=>{
    console.log(`Server running correctly on http://localhost:${PORT}`)
});



