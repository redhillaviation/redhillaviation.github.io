---
layout: page
permalink: /our-fleet/
title: Our Fleet
tagline: Our fleet
navigation-title: Our Fleet
tags: [fleet, redhill, flying]
fleet:
  - name: GBOSO our aerobatic C152
    img: gboso.jpg
    alt: GBOSO
  - name: GBFOE, C152
    img: gbfoe.jpg
    alt: GBFOE
  - name: GBIUY Piper PA28-180 four seat tourer
    img: gbiuy.jpg
    alt: GBIUY
---

Redhill Aviation operates a fleet of Cessna 152, two seat training aircraft and the ubiquitous Piper PA28, an aircraft that can carry up to four people.

{% for aircraft in page.fleet %}
<div class="fleet-aircraft">
    <div class="fleet-name">{{ aircraft.name }}</div>
    <div class="fleet-img">
        <img src="{{ site.url }}/images/{{ aircraft.img }}" alt="{{ aircraft.alt }}"/>
    </div>
</div>
{% endfor %}
