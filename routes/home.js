const router=require('express').Router();
const withAuth=require('../middleware/auth');
const { User, Playlist, Track }=require('../models/index');

// About page route -not protected

router.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us',
        logged_in:req.session.logged_in
    });

});

// Home page
router.get('/',async(req,res)=>{
    
    try{
        res.render('home',{
        
            title:'Home',
            logged_in:req.session.logged_in
        });
    }    
    catch(err){
        res.status(404).json({message:'404 error'})    }
});



router.get('/welcomePage',withAuth,async(req,res)=>{
    try{
        // Find logged in user based on session ID
        const userData=await User.findByPk(req.session.user_id,{
            attributes:{exclude:['password']}
        });
        const user= userData.get({plain:true});
        console.log(user);


        res.render('welcomePage',{
            title:'Welcome',
            username:user.username,
            email:user.email,
            joinedDate:user.createdAt,
            logged_in:true,
            layout:false
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});





// Login - redirect to profile if already logged in 
router.get('/login',(req,res)=>{
    if(req.session.logged_in){
        res.redirect('/home');
        return;
    }
    res.render('login',{
        title:'Login',
        logged_in:req.session.logged_in
    });

});

// Sign up
router.get('/signup',(req,res)=>{
    res.render('signup');
})

module.exports=router;