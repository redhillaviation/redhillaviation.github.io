---
layout: page
permalink: /our-fleet/
title: Our Fleet
tagline: Our fleet
navigation-title: Our Fleet
tags: [fleet, redhill, flying]
main-class: our-fleet
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
{% capture diviser %}{{ forloop.index0 | divided_by:2 }}{% endcapture %}
{% capture multi %}{{ diviser | times:2 }}{% endcapture %}
{% capture modulo %}{{ forloop.index0 | minus:multi }}{% endcapture %}
{% if modulo == '0' %}
<div class="fleet-row">
{% endif %}
<div class="fleet-aircraft fleet-{% cycle 'left', 'right' %}">
<div class="fleet-name">{{ aircraft.name }}</div>
<div class="fleet-img">
<img src="{{ site.url }}/images/{{ aircraft.img }}" alt="{{ aircraft.alt }}"/>
</div>
</div>
{% if modulo == '1' or forloop.last %}
</div>
{% endif %}
{% endfor %}
