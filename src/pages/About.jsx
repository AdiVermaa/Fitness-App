import React from 'react';
import RankBadge from '../components/RankBadge';
import mainBg from '../assets/main_bg.jpg';


function About() {
  return (
    <div className="about-page" style={{ minHeight: '100vh', backgroundImage: `url(${mainBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="system-box">
        <h2 className="system-title">About The System</h2>
        
        <div className="about-section">
          <h3>Welcome to Solo Leveling Tracker</h3>
          <p>
            Inspired by the popular manhwa/novel "Solo Leveling," this application 
            helps you track your real-life "leveling up" through daily quests and challenges.
          </p>
          
          <h3>How It Works</h3>
          <ul>
            <li>Complete daily quests to earn XP</li>
            <li>Level up as you gain XP</li>
            <li>Rise through the ranks from E to S</li>
            <li>Track your progress over time</li>
          </ul>
          
          <h3>Ranking System</h3>
          <div className="rank-explanation">
            <div className="rank-item">
              <RankBadge rank="E" /> <span>Levels 1-9</span>
            </div>
            <div className="rank-item">
              <RankBadge rank="D" /> <span>Levels 10-19</span>
            </div>
            <div className="rank-item">
              <RankBadge rank="C" /> <span>Levels 20-29</span>
            </div>
            <div className="rank-item">
              <RankBadge rank="B" /> <span>Levels 30-39</span>
            </div>
            <div className="rank-item">
              <RankBadge rank="A" /> <span>Levels 40-49</span>
            </div>
            <div className="rank-item">
              <RankBadge rank="S" /> <span>Levels 50+</span>
            </div>
          </div>
          
          <h3>Daily Quests</h3>
          <p>
            Each day, you will receive 4-5 randomly generated quests based on your current level and rank.
            As you level up, quests will become more challenging but offer greater XP rewards.
          </p>
          
          <h3>Motivation</h3>
          <p className="quote">"I alone level up."</p>
          <p>
            Just like Sung Jin-Woo, your path to greatness is a solo journey.
            Push yourself daily, complete your quests, and watch as you rise through the ranks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;