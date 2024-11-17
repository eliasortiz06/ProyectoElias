var express = require('express');
var router = express.Router();

var datos = require("../data/dataprovider");

/* GET pages */
router.get('/', function(req, res, next) {
  const user = req.session.user || null; 
  res.render("home", { head_title: "Principal", user: user });
});


router.get('/soporte', function(req, res, next) {
  const user = req.session.user || null; 
  res.render("soporte", { head_title: "Soporte", user: user });
});


router.get('/coleccion', function(req, res) {
  if (req.session.login) {
    const user = req.session.user;
    const pelicula = user.coleccion;
    res.render("coleccion", { 
      head_title: "Colección de Películas", 
      pelicula: pelicula,
      user: user 
    });
  } else {
    res.redirect("/login");
  }
});



/* RUTAS LOGIN */
router.get('/login',function(req,res){
  res.render("login",{head_title:"Login"})
});

router.post('/login', function(req, res) {
  const email = req.body.email;
  const pass = req.body.password;
  
  let user = datos.validateUser(email, pass);
  
  if (user) {
    req.session.login = true;
    req.session.user = user; 
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy(); 
  res.redirect('/'); 
});


router.get('/detalles/:id', function(req, res) {
  if (req.session.login) {
    const user = req.session.user;
    const peliculaId = req.params.id;
    const pelicula = user.coleccion.find(p => p.id === peliculaId);

    if (pelicula) {
      console.log("Imagen de la película:", pelicula.imagen); 
      res.render("detalles", {
        head_title: `Detalles de ${pelicula.nombre}`,
        pelicula: pelicula,
        user: user
      });
    } else {
      res.status(404).send("Película no encontrada.");
    }
  } else {
    res.redirect("/login");
  }
});



module.exports = router;
