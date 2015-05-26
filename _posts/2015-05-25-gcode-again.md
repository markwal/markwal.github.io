---
layout: post
title:  "Gcode again"
date:   2015-05-25 19:44:00
categories: 3dprinting
comments: True
---
The basics of gcode. First of all, it's just text with basically one command
per line. The units are usually mm, but some gcode interpreters allow other units
via a gcode command that sets it.

{% highlight text %}
G1 X6.476 Y17.116 E0.05057 F1800.000 T1
{% endhighlight %}

The first bit `G1` is the gcode command. `G1` is "controlled move". The rest of
the line are parameters to that command. In this case, positions specified in
millimeters. The positions may be relative to the current position or absolute
which depends on the mode. Other gcode commands select (`G90` and `G91`) absolute or
relative. Positive X is generally to the right and positive Y is away from the
front of the machine.

Different devices choose the origin of the absolute coordinates to be in
different places. The typical 0,0 for many open source printers is the front
left corner when facing the printer. The typical for delta style printers and
MakerBot printers or there clones is the center of the bed.

So the coordinates X & Y is the position on the coordinate plane (there's also
Z). What's the rest of it?

`E` is the extruder position. There might be more than one, so the `E` coordinate is
for the currently selected extruder. It is also absolute if the others are so to
extrude 5mm _more_plastic it has to be 5 more than the last command.

`F` is the feedrate. The units are in mm per minute.  That's just how fast should
the bot travel to get to the specified location.

`T` is the tool selector parameter. The tool numbers count from zero. For my bot,
`T0` is the right hand extruder and `T1` is the left.
