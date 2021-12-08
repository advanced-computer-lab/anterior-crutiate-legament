const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;



const adminSchema = new Schema ({
        firstName:{
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required : true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    });



adminSchema.methods.updateAdmin= async adminData =>{
    var oldAdmin=Admin.find(adminData._id);
    return await Admin.findByIdAndUpdate(adminData._id,
        {
            firstName: adminData.firstName? adminData.firstName : oldAdmin.firstName,
            lastName: adminData.lastName ? adminData.lastName : oldAdmin.lastName,
            email: adminData.email ? adminData.email : oldAdmin.email,
            password: adminData.password ? adminData.password : oldAdmin.password,
        },
        {new:true},
    );
};


adminSchema.methods.loginAdmin = async searchFilters => {
    if(Object.keys(searchFilters).length === 0) {
        return undefined;
    }
    else{
        if(searchFilters.email) {
            query.push({email:searchFilters.email}) ;
        }
        if(searchFilters.password) {
            query.push({password:searchFilters.password}) ;
        }
        return await Admin.find({$and:query});
    }
}

adminSchema.methods.createAdmin = async requestBody => {
    return await Admin.create(requestBody);
}


var Admin = mongoose.model('Admin',adminSchema);



module.exports = Admin;
