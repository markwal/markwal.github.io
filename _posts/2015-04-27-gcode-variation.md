---
layout: post
title:  "Gcode variation"
date:   2015-04-27 23:53:13
categories: 3dprinting
---
There's a fair amount of variation in gcode out there.  Basically because as
each vendor has a problem to solve it shows up as a new gcode. Plus since the
code is inprecisely described there's variation just because implementors have
jumped to different conclusions about what is happening.

Most of the time, software describes gcode flavor based on the firmware that
will interpret it. So you choose your machine type and the software makes
adjustments based on heuristics that have basically been discovered one bug at a
time.

For the FlashForge though, it doesn't consume gcode, it consumes x3g commands,
so what matters is what the slicer outputs and how the converter to x3g
interprets that gcode. In this context, there are two main flavors of gcode.
MakerBot flavor that is output and consumed by ReplicatorG (and MakerBot
Desktop) and RepRap flavor that is output by most slicers (like when you choose
Marlin) and can be consumed by GPX. So what's the difference?

##Tool Change
Typical RepRap community gcode for change tools or extruders is just:

{% highlight text %}
T1
{% endhighlight %}

But from what I can tell, whatever tool was specified last is expected to
persist. So a move command with T1 as a parameter is supposed to carry over to
the following line.

{% highlight text %}
G1 X6.476 Y17.116 E0.05057 F1800.000 T1
G1 X4.821 Y17.654 E0.13476
{% endhighlight %}

But MakerWare and ReplicatorG won't take any of those as a toolchange
apparently.  The tool parameter just applies to the command on that line.
To change tools with MakerWare:

{% highlight text %}
M135 T1
{% endhighlight %}

But ReplicatorG both produces (when slicing) and expects (when converting gcode
to x3g) the following.

{% highlight text %}
M108 T1
{% endhighlight %}

RepRap used M108 to mean set the extruder speed (in rpm). It has been deprecated
however.

##Temperatures
Typical RepRap community gcode for setting various temperatures and continuing
or waiting are the following:

{% highlight text %}
M109 S230 T0 ; set T0's temp to 230 degrees celsius and wait
M104 S230 T0 ; set T0's temp to 230 and continue without waiting
M116         ; wait for all set temperatures to be within firmware margin
M140 S100    ; set bed temperature to 100 degrees celsius and wait
M190 S100    ; set bed temperature to 100 and continue without waiting
{% endhighlight %}

But MakerWare and ReplicatorG produce and expect the following:
{% highlight text %}
M109 S100    ; set bed temperature to 100 degrees celsius and continue
{% endhighlight %}

Which unfortunately is the same as set nozzle temp and wait for RepRap!  The
slicers often have a MakerBot switch or a way to set your own temperature gcode,
but as I've come to depend more and more on gpx. I'm inclined to just figure out
how to get all of my gcode into reprap style.

##Fans
The only other reprap flavor issue that gpx takes into consideration is the
heatsink fan vs. cooling fan. The hotend has a fan on it that keeps it from
overheating and melting the platform it is on. You can turn that on and off in
gcode.  You really shouldn't though because it should just run based on the
temperature of the nozzle for longevity of the machine.

RepRap style:
{% highlight text %}
M106 S127 ; Turn the cooling fan on at 50% speed
M106 S0   ; Turn off the cooling fan
M107      ; Also turn off the cooling fan
{% endhighlight %}

MakerWare/ReplicatorG style:
{% highlight text %}
M126 S1   ; Turn on the cooling fan
M126 S0   ; Turn off the cooling fan
M127      ; Turn off the cooling fan
M106 S1   ; Turn on the heatsink fan
M106 S0   ; Turn off the heatsink fan
M107      ; Turn off the heatsink fan
{% endhighlight %}

Oops. This means some slicers output gcode they think will be turning off
cooling for the first few layers to help with bed adherence, but will actually
be putting extra wear and tear on the hotend surround on the bot!  There isn't
really a reason to turn on and off the heatsink fan, so this is another case to
go ahead and use RepRap flavor where possible.

And that's it. Those are all the differences gpx takes into consideration. So
from here on out I'm gonna switch to reprap flavor slicing and use that with
gpx. Unless I'm slicing with MakerWare or RepG for some reason. I was afraid
there was more to it than this, but both Slic3r and gpx's conditionals are only
these cases.

##How about a table

| RepRap | RepG | Intent |
| ------ | ---- | ------ |
| M104 | M104 | Set nozzle temperature and continue |
| M109 |      | Set nozzle temperature and wait |
| M190 | M109 | Set bed temperature and continue |
| M140 |      | Set bed temperature and wait |
| M116 |      | Wait for all temperature targets |
| M106 | M126 | Set cooling fan state |
| M107 | M127 | Cooling fan off |
|      | M106 | Set extruder heatsink fan state |
|      | M107 | Turn off extruder heatsink off and melt the extruder platform |
