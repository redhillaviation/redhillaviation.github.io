---
layout: page
permalink: /about-us/
title: About us
tagline:  Redhill Aviation
navigation-title: About Us
tags: [about, redhill, flying]
team:
  - name: Laurance Harley
    description: Senior Flying Instructor. Laurance started his aviation career aged just 14 on gliders, going solo aged 16 with the Air Cadets. He now holds a CPL/IR & MEP. Laurance instructs PPL, Night, IMC and CPL and is also an examiner. When not flying, he finds time to work as full time Air Traffic Controller at Gatwick Airport!
    img: laurance.jpg
    alt: laurance
  - name: Jim Stevens
    description: Senior Flying Instructor. Jim has been flying since 1974 and instructing since 1978. Jim has a CPL/IR(R) and nearly 10,000 hours. He is a flight examiner, ground examiner and radio telephony instructor. Jim instructs PPL, Night and IMC.
    img: jim.jpg
    alt: jim
  - name: Geoff Pyke
    description: Flying Instructor. Geoff started his career as an instructor, has flown all the classic jets including the 747 and has now returned to instructing. He offers his vast knowledge on a part-time basis.
    img: BOSO.jpg
    alt: BOSO
  - name: Dan Robertson
    description: Qualified Flying Instructor. Dan works at weekends. He holds a CPL/IR and has aided many people to acheive their PPL.
    img: G-BIUY.jpg
    alt: dan
  - name: Dave Thorne
    description: Operations Controller. Dave joined us in 2006 having previously worked as a manager at the Post Office. You will find him very knowledgeable, helpful and ready to answer any queries you may have.
    img: dave2.jpg
    alt: dave
---

<div class="meet-the-team">
<div>Meet our team:</div>
<ul>

{% for person in page.team %}
<li>
<div class="team-member team-{% cycle 'left', 'right' %}">
<div class="team-img">
<img src="{{ site.url }}/images/{{ person.img }}" alt="{{ person.alt }}"/>
</div>
<div class="team-description">{{ person.name }} - {{ person.description }}</div>
</div>
</li>
{% endfor %}
</ul>
</div>