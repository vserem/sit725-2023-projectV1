const Profile = require("./models/profile");

function checkUserRole(allowedRoles) {
    return (req, res, next) => {
      const user = req.user; 
  
      if (!user || !user.role) {
        // If the user is not authenticated or doesn't have a role, deny access
        return res.redirect("/")
      }
      
      if (!allowedRoles.includes(user.role)) {
        return res.redirect("/")
      }

      Profile.findOne({user:user._id})
      .then(profile=>{
        next();
      }).catch(err=>{
        res.redirect("/profile");
      })
    };
  }
  
  module.exports = checkUserRole;