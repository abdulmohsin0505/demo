const whiteList = [
    "https://www.google.com",
    "http://localhost:5173",
    "demo-cdtk4rcsb-mohsin050595-gmailcoms-projects.vercel.app"
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

module.exports = corsOptions