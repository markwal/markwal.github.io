---
layout: post
title:  "Slicers, gcode and x3g"
date:   2015-04-27 22:53:13
categories: 3dprinting
---
##Turning a 3d model into a plastic thing

Today, on sites like thingiverse.com and youmagine.com, people share 3d models
that you can print on your printer. The standard file format for those models is
[STL](http://wikipedia.org/wiki/STL_%28file_format%29).  The STL file describes
only the surface geometry of the object by a list of triangles and containing
arbitrary units, but by convention in the 3d printing community are treated as
millimeters. It doesn't have any other info in it, like how thick to make the
walls, what's the best way to fill in the body, color, etc. There have recently
been moves to use
[AMF](http://en.wikipedia.org/wiki/Additive_Manufacturing_File_Format) and some
of the software supports it.

We're still a long way away from being able to easily share a file and expect it
to come out the same for you as it did for me. On top of the missing information
in the file format, different printers vary widely in their capabilities as well
as their current state of calibration, etc. In addition, since many of the tools
and languages are under current development there are many differences on things
that will eventually become "standards" (hopefully).

An STL file gets turned into plastic by first "slicing" the STL model into gcode
(in a .gcode file) and then translating that gcode text file into a binary
representation that my flavor of printer understands x3g (in an .x3g file).  I
put that x3g file onto an SD card using my PC.  Put the SD card into the printer
and tell it to print it.

So for my printer, the way one of those STL files gets printed is to first
translate the 3d model into instructions for the printer. Sometimes this is
called a toolpath. The tool that does this is called a _slicer_ because it
slices the model up into thin (usually 0.2mm for me) horizontal slices and
starting from the bottom describes a path in a language called gcode to fill in
that layer and move to the next.

##Slicers

I have four different slicers installed on my computer and three different
engines that translate from gcode to x3g for the SD card:

With the first two, they have both a slicer and an x3g converter for translating
from gcode to x3g.

* [MakerWare Desktop](http://www.makerbot.com/desktop) - MakerWare's proprietary
software that they make available online for free. It works with the MakerBot
clones like FlashForge.

* [ReplicatorG](http://replicat.org) - This is the open source 3d printer
management software that came with my printer. It embeds the Skeinforge slicer.
It also is the tool I use to update the firmware on my printer.  It looks
abandoned. The last release is from November 2012. I think MakerBot used to use
it, recommend it maybe? Before my time in 3d printing. Which is easy to do since
I just started. It looks like there's a fork maintained by Dan Newman that is
getting traffic, so maybe it isn't dead.

For these next two, I use [GPX](http://github.com/markwal/GPX), an open source
tool written by Dr. Henry Thomas to convert gcode to x3g.

* [Slic3r](http://slic3r.org) - Open source project created by Alessandro
Ranellucci for his own reasons, but now is sponsored by Lulzbot, I believe.

* [Cura](http://software.ultimaker.com) - Cura is open source
maintained/supported by Ultimachine as the main
software for their printers.

You can also run generated gcode from one of those slicers through ReplicatorG
to make the x3g file, but it's more convient for me to use GPX because it can
run nicely standalone and most tools have a way for it to run on the gcode
automatically when the gcode file is generated.

Some other slicers that I'm aware of, but haven't tried yet:

* Simplify3D

* KISSlicer

Each of these has different strengths and weaknesses, so I find that I use them
all from time to time depending on what I'm doing.

That started out as a little background for what I really sat down to write
about which is gcode variation.  I got a little carried away so I'll hang on to
the gcode variation for the next post.

