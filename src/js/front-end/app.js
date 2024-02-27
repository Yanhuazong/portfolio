import Glide from '@glidejs/glide';
import { siblings } from "@glidejs/glide/src/utils/dom";
const check_resize = (glide) => {
    if (glide.slides_count <= glide.settings.perView) {
        glide.update({startAt: 0}).disable();
        glide.controls.classList.add('hidden');
    } else {
        glide.enable();
        glide.controls.classList.remove('hidden');
    }
};

const CustomActiveClass = (Glide, Components, Events) => {
    const Component = {
      mount() {
        this.changeActiveSlide();
      },
  
      changeActiveSlide() {
        const slide = Components.Html.slides[Glide.index];
        const bullets = Components.Controls.items[0];
        const bullet = [...bullets.children].find(
          (bullet) => bullet.getAttribute("data-glide-dir") === `=${Glide.index}`
        );
  
        bullet.classList.remove("is-next", "is-prev");
        bullet.classList.add("is-active");
        slide.classList.remove("is-next", "is-prev");
        slide.classList.add("is-active");
  
        siblings(slide).forEach((sibling) => {
          sibling.classList.remove("is-active", "is-next", "is-prev");
        });
        siblings(bullet).forEach((sibling) => {
          sibling.classList.remove("is-active", "is-next", "is-prev");
        });
  
        if (slide.nextElementSibling) {
          slide.nextElementSibling.classList.add("is-next");
        }
  
        if (slide.previousElementSibling) {
          slide.previousElementSibling.classList.add("is-prev");
        }
        if (bullet.nextElementSibling) {
          bullet.nextElementSibling.classList.add("is-next");
        }
  
        if (bullet.previousElementSibling) {
          bullet.previousElementSibling.classList.add("is-prev");
        }
      },
    };
  
    Events.on("run", () => {
      Component.changeActiveSlide();
    });
  
    return Component;
  };
  // Function to determine if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
  
    // Calculate the middle point of the section
    const sectionMiddle = rect.top + rect.height / 2;
  
    // Calculate the middle point of the viewport
    const viewportMiddle = window.innerHeight / 2;
  
    // Check if the middle point of the section is within the middle range of the viewport
    return sectionMiddle >= 0 && sectionMiddle <= viewportMiddle;
  }

  // Function to handle scroll event
  function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navBar = document.querySelector('nav');

    // Add fixed class to nav bar on scroll
    if (window.scrollY > 0) {
      navBar.classList.add('sticky');
    } else {
      navBar.classList.remove('sticky');
    }

    // Highlight active section
    sections.forEach(section => {
      const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
      if (isInViewport(section)) {
        navLink.parentElement.classList.add('active');
      } else {
        navLink.parentElement.classList.remove('active');
      }
    });
  }

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Add fixed class to nav bar on DOMContentLoaded if not at the top
  document.addEventListener('DOMContentLoaded', () => {
    handleScroll(); // Call the function on DOMContentLoaded
  });

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
    const $aside = document.querySelector('.side-nav')
    const body= document.querySelector('body')
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target
          const $target = [...document.querySelectorAll(`[data-menu='${target}']`)]
          const $button = document.querySelector('.purdue-navbar-black>.navbar-end')
          const expanded = el.getAttribute('aria-expanded') === 'false' ? true : false
          const hamburgerIcon = el.querySelector('.burger-icon')
          const closeIcon = el.querySelector('.close-icon')
          el.setAttribute('aria-expanded', expanded)
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active')
          if(hamburgerIcon.getAttribute('class').indexOf('is-hide') > -1){
            hamburgerIcon.setAttribute('class', hamburgerIcon.getAttribute('class').replace('is-hide', ''));
          }else{
              hamburgerIcon.setAttribute('class', hamburgerIcon.getAttribute('class') + ' is-hide');
          }
          if(closeIcon.getAttribute('class').indexOf('is-active') > -1){
              closeIcon.setAttribute('class', closeIcon.getAttribute('class').replace('is-active', ''));
          }else{
              closeIcon.setAttribute('class', closeIcon.getAttribute('class') + ' is-active');
          }  
          if ($target) {
            $target.forEach((t) => {
  
              if(t.classList.contains('is-active')){
                  t.classList.remove('is-active')           
              }else{
                t.classList.add('is-active')
              }
            })
   
            window.addEventListener(
              'resize',
              (removeActive = (e) => {
                let width = window.innerWidth
                if (width >= 1024) {
                  $target.forEach((t) => {
                    t.classList.remove('is-active')
                  })
                  closeIcon.setAttribute('class', closeIcon.getAttribute('class').replace('is-active', ''));
                  hamburgerIcon.setAttribute('class', hamburgerIcon.getAttribute('class').replace('is-hide', ''));
                  window.removeEventListener('resize', removeActive)
                }
              })
            )
          }
          if ($button) {
            $button.classList.toggle('is-active')
          }
        })
      })
    }



//slider
  //image sliders
  const img_sliders = document.querySelectorAll('.purdue-home-image-slider');

  if(img_sliders && img_sliders.length>0){
    for (let i = 0; i < img_sliders.length; i++) {
      const count = 1;
      const newCount = count>1?count-0.5:1;
      const loop = "carousel";
    let glide = new Glide(img_sliders[i], {
    autoplay: 2000,
      type: loop,
      perView: count,
      gap:24,
      breakpoints: {
        1024:{
          perView: newCount,
        },
        767: {
          perView: 1,
        },
      },
    });
    const nextButton = img_sliders[i].querySelector('.arrow--left');
    const prevButton = img_sliders[i].querySelector('.arrow--right');
    nextButton.addEventListener('click', function (event) {
      event.preventDefault();	  
      glide.go('<');
    })
    
    prevButton.addEventListener('click', function (event) {
      event.preventDefault();	  
      glide.go('>');
    })
    glide.slides_count = img_sliders[i].querySelectorAll('.glide__slide').length;
    glide.controls = img_sliders[i].querySelector('.slider-controls');
    glide.on('resize', () => {
      check_resize(glide);
    });
    glide.mount({CustomActiveClass,});
    check_resize(glide);
  }}