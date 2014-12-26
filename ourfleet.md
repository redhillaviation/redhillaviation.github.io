---
layout: page
permalink: /our-fleet/
title: Our Fleet
tagline: Our fleet
navigation-title: Our Fleet
tags: [fleet, redhill, flying]
fleet:
  - name: G-BOSO our aerobatic C152
    img: BOSO2.jpg
    alt: GBOSO
  - name: G-BIUY Piper PA28-180, our four-seat tourer - with Garmin 430 & leather seats
    img: gbiuy2.jpg
    alt: GBIUY
  - name: G-BOLV, our C152
    img: gbolv.jpg
    alt: GBOLV
  - name: G-BMUO, another aerobatic C152
    img: gbmuo.jpg
    alt: GBMUO
---

Redhill Aviation operates a fleet of Cessna 152, two-seat training aircraft and the ubiquitous Piper PA28, an aircraft that can carry up to four people. It is the 180hp variant, with a Garmin 430 and leather seats.

{% for aircraft in page.fleet %}
<div class="fleet-aircraft">
    <div class="fleet-name">{{ aircraft.name }}</div>
    <div class="fleet-img">
        <img src="{{ site.url }}/images/{{ aircraft.img }}" alt="{{ aircraft.alt }}"/>
    </div>
</div>
{% endfor %}
