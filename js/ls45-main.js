document.addEventListener('DOMContentLoaded', function () {


   /* Navegación interna: al hacer clic en Inicio, volvemos al comienzo de la página */
   var enlacesInicio = document.querySelectorAll('a[href="#inicio"]');
   enlacesInicio.forEach(function (enlace) {
      enlace.addEventListener('click', function (event) {
         event.preventDefault();
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
      });
   });



   /* Menú móvil: se cierra después de escoger una opción */
   var menuColapsable = document.getElementById('navbarSupportedContent');
   var botonMenu = document.querySelector('.navbar-toggler');

   if (menuColapsable && botonMenu) {
      var enlacesMenu = menuColapsable.querySelectorAll('.nav-link');

      enlacesMenu.forEach(function (enlace) {
         enlace.addEventListener('click', function () {
            if (window.innerWidth < 992 && menuColapsable.classList.contains('show')) {
               menuColapsable.classList.remove('show');
               botonMenu.classList.add('collapsed');
               botonMenu.setAttribute('aria-expanded', 'false');
            }
         });
      });
   }

      /* Galería: antes de abrir el modal, cambiamos imagen y textos */
   var botonesGaleria = document.querySelectorAll('[data-target="#modalGaleria"]');
   var imagenModal = document.getElementById('modalGaleriaImagen');
   var tituloModal = document.getElementById('modalGaleriaTitulo');
   var textoModal = document.getElementById('modalGaleriaTexto');

   botonesGaleria.forEach(function (boton) {
      boton.addEventListener('click', function () {
         var imageUrl = boton.getAttribute('data-img');
         var imageAlt = boton.getAttribute('data-alt') || 'Imagen de galería LS45 Automotriz';
         var imageTitle = boton.getAttribute('data-title') || 'Galería LS45 Automotriz';

         if (imagenModal) {
            imagenModal.setAttribute('src', imageUrl);
            imagenModal.setAttribute('alt', imageAlt);
         }
         if (tituloModal) {
            tituloModal.textContent = imageTitle;
         }
         if (textoModal) {
            textoModal.textContent = imageAlt;
         }
      });
   });

   /* Carrusel del encabezado: control simple para avanzar y retroceder */
   var slider = document.getElementById('banner_slider');
   if (slider) {
      var slides = slider.querySelectorAll('.carousel-item');
      var botonAnterior = slider.querySelector('.carousel-control-prev');
      var botonSiguiente = slider.querySelector('.carousel-control-next');
      var actual = 0;

      slides.forEach(function (slide, index) {
         if (slide.classList.contains('active')) {
            actual = index;
         }
      });

      function mostrarSlide(nuevoIndice) {
         slides[actual].classList.remove('active');
         actual = (nuevoIndice + slides.length) % slides.length;
         slides[actual].classList.add('active');
      }

      if (botonAnterior) {
         botonAnterior.addEventListener('click', function (event) {
            event.preventDefault();
            mostrarSlide(actual - 1);
         });
      }

      if (botonSiguiente) {
         botonSiguiente.addEventListener('click', function (event) {
            event.preventDefault();
            mostrarSlide(actual + 1);
         });
      }
   }

   /* Animación suave al aparecer secciones durante el scroll */
   var elementos = document.querySelectorAll('.ls45-reveal');

   if ('IntersectionObserver' in window) {
      var observador = new IntersectionObserver(function (entradas) {
         entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
               entrada.target.classList.add('ls45-visible');
               observador.unobserve(entrada.target);
            }
         });
      }, { threshold: 0.15 });

      elementos.forEach(function (elemento) {
         observador.observe(elemento);
      });
   } else {
      elementos.forEach(function (elemento) {
         elemento.classList.add('ls45-visible');
      });
   }

   /* Botón flotante: aparece al bajar y permite volver rápidamente al inicio */
   var botonSubir = document.querySelector('.ls45-scroll-top');

   if (botonSubir) {
      function actualizarBotonSubir() {
         if (window.scrollY > 280) {
            botonSubir.classList.add('is-visible');
         } else {
            botonSubir.classList.remove('is-visible');
         }
      }

      actualizarBotonSubir();
      window.addEventListener('scroll', actualizarBotonSubir);

      botonSubir.addEventListener('click', function () {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
      });
   }

});
