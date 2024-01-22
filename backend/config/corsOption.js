const whiteList = [
    "https://www.google.com",
    "http://localhost:5173",
    "https://demo-ashy-phi.vercel.app/"
]

const corsOptions = {
    origin : (origin,callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus : 200
}

export default corsOptions
