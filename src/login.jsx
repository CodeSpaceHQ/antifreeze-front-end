// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import ButtonAppBar from 'ButtonAppBar.jsx'
import Home from 'home.jsx'
import Particles from 'react-particles-js';


// Configure Firebase.
const config = {
  apiKey: 'AIzaSyCNhKNfvK9_lU7h0ntDR5-PgQRMO0Ukn80',
  authDomain: 'freeze-b-gone-auth.firebaseapp.com',
  // ...
};

firebase.initializeApp(config);

export default class SignInScreen extends React.Component {

  constructor() {
    super()
    this.style = {
      position: 'absolute',
      "zindex": '-1',
      height: '103.5vh',
      width: '100%',
    }
    this.params = {
      "particles": {
        "number": {
          "value": 10,
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

    // The component's Local state.
    this.state = {
      signedIn: false // Local signed-in state.
    };

    // Configure FirebaseUI.
    this.uiConfig = {
      // Popup signin flow rather than redirect flow.
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: () => false
      }
    };
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => this.setState({ signedIn: !!user })
    );
  }

  render() {
    if (!this.state.signedIn) {
      return (
        <div>
          <ButtonAppBar logout={false} />
          <Particles
            params={this.params}
            style={this.style}>
          </Particles>
          <div style={{ margin: 30 }}>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </div>


      );
    }
    return (
      <div>
        <Home />
      </div>
    );
  }
}

