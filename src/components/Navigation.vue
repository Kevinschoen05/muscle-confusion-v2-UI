<template>
<div id="navigation">
        <div aria-hidden="true" class="background-color-div">
            <!--This div is used to overcome a z-index issue where the open
                #navbar-menu is on top of the #navigation. This bar places itself 
                the #navbar-menu so that menu appears behind the #navigation
            -->
        </div>
        <div class="container">
            <!--Main Nav-->
            <nav id="navbar-menu">
                <ul>
                    <li><a class="active" href="/index.html">Home</a></li>
                    <li><a href="/about.html">About Us</a></li>
                    <li><a href="/projects.html">Projects</a></li>
                    <li><a href="/reviews.html">Reviews</a></li>
                    <li><a href="/contact.html">Contact</a></li>
                </ul>
            </nav>

            <!--Mobile Nav toggle-->
            <button class="hamburger-menu">
                <span aria-hidden="true"></span>
            </button>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'NavigationBar', 
    data() {
        return {
            
        }
    },
    methods: {

    },
    mounted() {
    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 1023px) {
  #navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
    height: auto;
  }
  #navigation .background-color-div {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  #navigation .container {
    padding: 0.8125em 0;
    width: 96%;
  }
  #navigation .logo {
    display: inline-block;
    height: 1.875em;
    width: auto;
  }
  #navigation .logo img {
    width: auto;
    height: 100%;
  }
  #navigation .logo .light {
    display: none;
  }
  #navigation .logo .dark {
    display: block;
  }
  #navigation .hamburger-menu {
    position: absolute;
    right: 0em;
    border: none;
    height: 3em;
    width: 3em;
    z-index: 100;
    display: block;
    background: transparent;
    padding: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    -webkit-transition: top .3s;
    transition: top .3s;
  }
  #navigation .hamburger-menu span {
    height: 2px;
    width: 1.875em;
    background-color: #000;
    display: block;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }
  #navigation .hamburger-menu span:before {
    content: '';
    position: absolute;
    display: block;
    height: 2px;
    width: 80%;
    background: #000;
    opacity: 1;
    top: -6px;
    left: 0;
    -webkit-transition: width .3s, left .3s, top .3s, -webkit-transform .5s;
    transition: width .3s, left .3s, top .3s, -webkit-transform .5s;
    transition: width .3s, left .3s, top .3s, transform .5s;
    transition: width .3s, left .3s, top .3s, transform .5s, -webkit-transform .5s;
  }
  #navigation .hamburger-menu span:after {
    content: '';
    position: absolute;
    display: block;
    height: 2px;
    width: 80%;
    background: #000;
    opacity: 1;
    top: 6px;
    left: 0;
    -webkit-transition: width .3s, left .3s, top .3s, -webkit-transform .3s;
    transition: width .3s, left .3s, top .3s, -webkit-transform .3s;
    transition: width .3s, left .3s, top .3s, transform .3s;
    transition: width .3s, left .3s, top .3s, transform .3s, -webkit-transform .3s;
  }
  #navigation .hamburger-menu.clicked span {
    background-color: transparent;
  }
  #navigation .hamburger-menu.clicked span:before {
    width: 100%;
    -webkit-transform: translate(-50%, -50%) rotate(225deg);
            transform: translate(-50%, -50%) rotate(225deg);
    left: 50%;
    top: 50%;
  }
  #navigation .hamburger-menu.clicked span:after {
    width: 100%;
    -webkit-transform: translate(-50%, -50%) rotate(-225deg);
            transform: translate(-50%, -50%) rotate(-225deg);
    left: 50%;
    top: 50%;
  }
  #navigation #navbar-menu {
    position: fixed;
    right: 0;
    padding: 0;
    width: 100%;
    border-radius: 0 0 0.375em 0.375em;
    z-index: -1;
    overflow: hidden;
    -webkit-box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
    top: 4em;
    padding-top: 0;
    height: 0;
    -webkit-transition: height 0.3s, padding-top 0.3s, top 0.3s;
    transition: height 0.3s, padding-top 0.3s, top 0.3s;
  }
  #navigation #navbar-menu ul {
    padding: 0;
    -webkit-perspective: 700px;
            perspective: 700px;
  }
  #navigation #navbar-menu ul li {
    list-style: none;
    margin-bottom: 1.5em;
    text-align: center;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    opacity: 0;
    -webkit-transform: translateY(-0.4375em) rotateX(90deg);
            transform: translateY(-0.4375em) rotateX(90deg);
    -webkit-transition: opacity .5s, -webkit-transform .5s;
    transition: opacity .5s, -webkit-transform .5s;
    transition: opacity .5s, transform .5s;
    transition: opacity .5s, transform .5s, -webkit-transform .5s;
  }
  #navigation #navbar-menu ul li:nth-of-type(1) {
    -webkit-transition-delay: .1s;
            transition-delay: .1s;
  }
  #navigation #navbar-menu ul li:nth-of-type(2) {
    -webkit-transition-delay: .2s;
            transition-delay: .2s;
  }
  #navigation #navbar-menu ul li:nth-of-type(3) {
    -webkit-transition-delay: .3s;
            transition-delay: .3s;
  }
  #navigation #navbar-menu ul li:nth-of-type(4) {
    -webkit-transition-delay: .4s;
            transition-delay: .4s;
  }
  #navigation #navbar-menu ul li:nth-of-type(5) {
    -webkit-transition-delay: .5s;
            transition-delay: .5s;
  }
  #navigation #navbar-menu ul li a {
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    font-size: 1.1875em;
    text-align: center;
    display: inline-block;
    position: relative;
    font-weight: bold;
  }
  #navigation #navbar-menu ul li a.active:before {
    content: '';
    position: absolute;
    display: block;
    height: 0.42105263em;
    background: var(--primary);
    opacity: 1;
    bottom: 0.26315789em;
    border-radius: 0.21052632em;
    left: -0.31578947em;
    right: -0.31578947em;
    z-index: -1;
  }
  #navigation #navbar-menu.open {
    height: 19.125em;
    padding-top: 1.25em;
    z-index: -100;
  }
  #navigation #navbar-menu.open ul li {
    opacity: 1;
    -webkit-transform: translateY(0) rotateX(0);
            transform: translateY(0) rotateX(0);
  }
}
/* Desktop */
@media only screen and (min-width: 64em) {
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0.375em rgba(0, 0, 0, 0.3);
    background-color: #fff;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: #f0f0f0;
  }
  ::-webkit-scrollbar {
    width: 0.75em;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.625em;
    background: var(--primary);
  }
  body.scroll #navigation .background-color-div {
    height: 100%;
    -webkit-box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  body.scroll #navigation .logo .light {
    display: none;
  }
  body.scroll #navigation .logo .dark {
    display: block;
  }
  body.scroll #navigation #navbar-menu ul li a {
    color: #1a1a1a;
  }
  body.scroll #dark-mode-toggle svg path {
    fill: #000;
  }
  body.dark-mode #navigation .background-color-div {
    height: 100%;
    -webkit-box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  #navigation {
    width: 100%;
    height: 6.25em;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200000;
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  #navigation .background-color-div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 0;
    -webkit-transition: height .3s;
    transition: height .3s;
  }
  #navigation .container {
    max-width: 75em;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  #navigation .logo {
    margin-right: auto;
    height: 3.75em;
    width: auto;
  }
  #navigation .logo img {
    width: auto;
    height: 100%;
  }
  #navigation #navbar-menu ul {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  #navigation #navbar-menu ul li {
    list-style: none;
    margin-left: 1.875em;
    padding-top: 0.1875em;
  }
  #navigation #navbar-menu ul li a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1875em;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
    color: #fff;
    -webkit-transition: color .3s;
    transition: color .3s;
  }
  #navigation #navbar-menu ul li a:before {
    content: '';
    position: absolute;
    display: block;
    height: 0.31578947em;
    border-radius: 0.15789474em;
    background: var(--primary);
    opacity: 1;
    bottom: 0.10526316em;
    z-index: -1;
    left: 0;
    width: 0%;
    -webkit-transition: width .3s;
    transition: width .3s;
  }
  #navigation #navbar-menu ul li a:hover:before {
    width: 100%;
  }
  #navigation #navbar-menu ul li a.active:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 0.31578947em;
    background: var(--primary);
    opacity: 1;
    bottom: 0.10526316em;
    border-radius: 0.15789474em;
    left: 0em;
    right: -0.31578947em;
    z-index: -1;
    -webkit-transition: bottom .3s;
    transition: bottom .3s;
  }
  #navigation .hamburger-menu {
    display: none;
  }
}
</style>
  