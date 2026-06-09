
const adminAuth = (req,res, next)=>{
        const token = "xyz";
        const isAuthorized = token == "xyz";
        console.log("token authorized");
        if(isAuthorized){
            //res.send("User data Updated");
            next();
        }
        else{
            res.status(401).send("Not AUthorized");
        }
   
};

module.exports = {
    adminAuth
}