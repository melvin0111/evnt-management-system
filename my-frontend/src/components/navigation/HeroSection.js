import React from 'react';
import '../../App.css'
import { Button } from '../button/Button';
import '../navigation/HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'> 
      <video src='/vids/video-1.mp4' autoPlay loop muted />

      <h1>YOU'VE GOT PLANS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button className='btns' buttonStyle='btn--outline'
        buttonSize='btn--large'>
        Get Started 
        </Button>

        <Button className='btns' buttonStyle='btn--primary'
        buttonSize='btn--large'>
            Book Event <i class="fa fa-bookmark-o" aria-hidden="true"></i>
        </Button>


      </div>
    </div>
  )
}

export default HeroSection;