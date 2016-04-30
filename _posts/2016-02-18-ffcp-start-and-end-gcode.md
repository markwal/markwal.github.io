---
layout: post
title:  "My start and end gcode for the FlashForge Creator Pro"
date:   2016-02-18 12:14
categories: programming
comments: True
---
# Assumptions
Several people have asked me for my start and end gcode, so I'm going to post
it here.  However, there are a few caveats that mean Your-Mileage-May-Vary!

* I use gcode that assumes a recent version of GPX, this gcode won't work with
  RepG
* I prefer having the slicers set to "RepRap" mode rather than "MakerBot" mode.
  I do try to avoid any of the gcodes that make a difference in this regard in
  the start gcode (M106, M107, M109), but the slicers don't.
* I prefer to extrude a bead before printing like MakerWare, but I prefer using
  the right or left edge rather than the front because the bed is wider than it
  is deep.
* I've added a fan that takes up some space on the left side of my carriage so
  I don't go as far to the left as the MakerBot default start gcode

# GPX
Therefore, to use these, you need to use GPX to translate from gcode to x3g.
You can use the GPX command line, GpxUi or the GPX OctoPrint plugin.  But it
and the slicer needs to be set to reprap mode.

Also, the machine for GPX is "r1d" or Replicator 1 Dual.  Some folks get
confused and think it is a Replicator 2.  It has a metal frame like a Rep 2,
but from a firmware/software point of view, it's a Rep 1 Dual.  Two nozzle with
the same steps per mm.

# end gcode
I start with the end gcode because I use the same end gcode whether I'm
printing single nozzle left or right or dual nozzle and whether I'm using
Slic3r or Cura

{% highlight text %}
M73 P100 ; end build progress
M140 S0 ; set bed temperature to 0
M104 S0 T0 ; set extruder temperature to 0
M104 S0 T1 ; set other extruder temperature to 0
G1 Z150 F1100 ; send the build plate to the bottom
T0 ; Next job assumes T0 is the current tool
G28 X Y F2500 ; home X and Y axes
M18 ; disable all stepper motors
M70 P5 (We <3 Making Things!)
M72 P1 ; Play Ta-Da song
{% endhighlight %}

# start gcode Slic3r single right
{% highlight text %}
; begin
M73 P0 ; tell the firmware we're starting a build
G130 X118 Y118 A118 B118 ; set vref's to default
; let the Z stepper vref stay at eeprom level (probably 40)
;
; set temps
M140 S[first_layer_bed_temperature] ; set bed temp, don't wait
M104 S[first_layer_temperature_0] T0 ; set nozzle temp, don't wait
;
; home and set coordinates

T0 ; home on the right extruder
G90 ;  set positioning to absolute
G28 X Y Z ; home XYZ at default home feedrates
; home Z again slowly to give more consistent first layer height
G92 X0 Y0 Z0 A0 B0 ; define this as Z=0, the other coords are technically unnecessary but x3g requires them so gpx will make some up
G1 Z5 ; move the platform 5mm down
G28 Z F500 ; so we can home z again slowly
M132 X Y Z  ; Recall stored home offsets
;
; wait for heat up
G1 X110 Y-72 Z30 F3300 ; move to waiting position (front right corner of print bed)
M116 ; wait for target temperatures to be reached. GPX only, RepG doesn't understand
;
; purge and wipe
G92 E0 ; set current extruder position as 0 so that E15 below makes sense
G1 X110 Y-70 Z[first_layer_height] F2400.0 ; move to just on the bed
G1 X110 Y70 E15 F1200.000 ; extrude a line of filament along the right edge of the bed
G92 E0 ; set E to 0 again because the slicer's next extrusion is relative to this 0
{% endhighlight %}

# start gcode Slic3r single left
Use the single left gcode, but change the set nozzle temperature line (M104) to
the following:

{% highlight text %}
M104 S[first_layer_temperature_0] T1 ; set nozzle temp, don't wait
{% endhighlight %}

And insert the switch extruder just before the wait for heatup (M116):
{% highlight text %}
T1
{% endhighlight %}


# start gcode Cura 15.04 (big changes post 15.04) single right
{% highlight text %}
; -- START GCODE --
M136 ; start build
M73 P0
G90 ; absolute coordinates
;
; set temperatures and assert Vref
M140 S{print_bed_temperature}
M104 S{print_temperature} T0
G130 X118 Y118 A118 B118 ; set stepper motor Vref to defaults
; let the Z stepper vref stay at eeprom level (probably 40)
;
; home and recall eeprom home position
T0 ; home on the right nozzle
G28 X Y Z ; home all axes at homing speed
G92 X0 Y0 Z0 A0 B0 ; set all coords to 0 for now
G1 Z5 F500 ; move Z 5mm away so we can carefully hit the limit switch
G161 Z F100 ; home Z slowly
M132 X Y Z ; recall stored home offsets for XYZ axes
;
; wait for heat up
G1 X110 Y-72 Z30 F3300 ; move to waiting position
M116 ; wait for temps
;
; purge and wipe
G92 E0 ; set current extruder position as 0 so that E15 below makes sense
G1 X110 Y-70 Z0.2 F2400.0 ; move to just on the bed
G1 X110 Y70 E15 F1200.000 ; extrude a line of filament along the right edge of the bed
G92 E0 ; set E to 0 again because the slicer's next extrusion is relative to this 0
;
; Sliced at: {day} {date} {time}
; Basic settings: Layer height: {layer_height} Walls: {wall_thickness} Fill: {fill_density}
; Print time: {print_time}
; Filament used: {filament_amount}m {filament_weight}g
; Filament cost: {filament_cost}
; -- end of START GCODE --
{% endhighlight %}

# start gcode Cura 15.04 single left
Use the single right gcode, but change the set nozzle temperature line (M104) to
the following:

{% highlight text %}
M104 S{print_temperature} T1 ; set nozzle temp, don't wait
{% endhighlight %}

And insert the switch extruder just before the wait for heatup (M116):
{% highlight text %}
T1
{% endhighlight %}

# start gcode for a dual print
I'll post this later, if there's interest.
