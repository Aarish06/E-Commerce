import React from "react";
import './about.css' 

const About: React.FC = () => {
  return (
<main className="about">
<section className="about-hero">
<div className="about-hero-inner">
<h1>About Us</h1>
<p>
            We're building more than a clothing brand—we're creating a statement.
            Our project is focused on modern fashion that blends style, comfort,
            and confidence.
</p>
</div>
</section>
 
      <section className="about-content">
<div className="about-card">
<h2>What We Stand For</h2>
<p>
            Clothing should feel good, look sharp, and last longer than a trend
            cycle. Our collections are built around versatility—pieces you can
            wear daily, style your own way, and rely on.
</p>
<ul>
<li>Modern, minimal designs</li>
<li>Everyday comfort with a premium feel</li>
<li>Attention to detail in fit and finish</li>
<li>Style that adapts to you</li>
</ul>
</div>
 
        <div className="about-card">
<h2>Our Approach</h2>
<p>
            This project is built from the ground up with quality in mind. From
            fabric choices to design decisions, we focus on balance—fashion that
            looks bold but feels effortless.
</p>
<p className="about-quote">We don't chase trends. We refine them.</p>
</div>
 
        <div className="about-card">
<h2>Why This Brand</h2>
<p>
            Because style shouldn't try too hard. Good clothing doesn't need
            loud logos or gimmicks to stand out. Confidence comes from how you
            wear it, not what's printed on it.
</p>
</div>
 
        <div className="about-card">
<h2>Our Vision</h2>
<p>
            Our goal is to grow this project into a brand people trust—known for
            consistency, quality, and clean design. Clothing that fits your
            life, not the other way around.
</p>
<p className="about-ending">This is just the beginning.</p>
</div>
</section>
</main>
  );
};
 
export default About;