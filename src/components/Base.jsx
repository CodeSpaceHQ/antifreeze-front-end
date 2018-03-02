import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Particles from 'react-particles-js';

const style = {
  position: 'absolute',
  "z-index": '-1',
  height: '103.5vh',
  width: '100%',
}

const params = {
  "particles": {
    "number": {
      "value": 6,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#99ebff"
    },
    "shape": {
      "type": "image",
      "stroke": {
        "width": 0,
        "color": "#000"
      },
      "polygon": {
        "nb_sides": 8
      },
      "image": {
        "src": "https://clipartion.com/wp-content/uploads/2015/11/ms-gilberts-crew-january-2.png",
        "width": 1115,
        "height": 1275
      }
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 47.34885849793636,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 40,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 5,
      "direction": "bottom",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">Freeze-B-Gone</IndexLink>
      </div>

      <div className="top-bar-right">
        <Link to="/">LOGIN</Link>
        <Link to="/signup">SIGNUP</Link>
      </div>

    </div>
  <Particles id="partiCSS"
  params={ params }
             
  style={ style }>
  
  </Particles>
  {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
