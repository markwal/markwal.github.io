---
layout: post
title:  "From KiCad 6 to Carbide3D Copper, Gerber settings and tweaks"
date:   2023-02-03 16:23
categories: electronics
comments: True
---
# KiCad
I want to use KiCad because it's open source and frankly quite a bit more
approachable than Autocad Eagle. However, while Carbide3D mentions KiCad
as a source for the gerber files, all the instructions I could find were
for Eagle.  I've got it working, mostly, by experimentation.

# Step 0. Design your board for your machine

I found the following tutorial very helpful in learning how to use KiCad, but
the board you make will need some tweaking before you can cut it out on a
Carbide3D machine.

KiCad Tutorial: https://github.com/MalphasWats/hawk

For the Shapeoko or the Nomad, this probably means 1-sided or if you're more
ambitious, 2-sided, but remember, the through holes and via's won't be plated
after you machine it.  For 1-sided, put all the copper on B_Cu or F_Cu.  You
probably don't want to do any flood areas since the Copper machining approach
is to just isolate your specified routes from the rest of the copper.  That is,
you end up with flood islands anyway, but not connected to anything.  Also,
the default isolation in Copper is approx. 0.248 mm.  It does this with three
passes of a Vee cutter.

# Step 1. Set the Drill Origin
I think you want this to be a the lower left corner of the board.  Or more
precisely where you'll zero to on your CNC machine, but the preview in Copper
assumes it is the lower left corner of your material.  You do this by using 
the Set Drill Origin button on the toolbar on the right.  The button is near
near the bottom of that toolbar:

![Set Drill Origin Button](images/kicad-set-drill-origin-button.png)

Click it, then click the lower left corner of your board.

# Step 2. Output the Gerber files
From the Menu, File->Fabrication Outputs->Gerbers (.gbr).  A lot of the defaults
will cause problems.

* Choose only the one layer you want it to cut (B.Cu).  It's ok
  to leave others selected, it'll just output files you won't use with Copper.
* For General Options, you want "Use drill/place file origin" to be set
* For Gerber Options, you want "Disable aperture macros (not recommended).
  Humorously the hover text says "Use *only* for broken Gerber viewers."  I
  guess KiCad considers Carbide3D Copper to be a broken Gerber viewer.
* Click "Plot" (bottom middle of the dialog) - that will generate
* Project-B_Cu.gbr in the specified output
  directory.  I *think* this will fail silently to update/overwrite an existing
  .gbr file, so if you're on attempt #2 or #36, you might have to delete the
  previous attempts.
* Leave the Plot dialog open because you need it for the next step

# Step 3. Generate the drill file
* Click the "Generate Drill Files..." button on the Plot dialog in step 2.
* Drill File Format: Excellon
* Drill Origin: Drill/place file origin
* Drill Units: Millimeters
* Zeros Format: Suppress leading zeros
* Click Generate Drill File
* You can close the Generate Drill Files and Plot dialogs

# Step 4. Edit/Tweak the drill file
Carbide3D doesn't like the way that KiCad outputs the header or the end and it'll
end up pretending like it understood it but you'll not get any holes.

* Open Project-PTH.drl in a text editor
* Replace all the lines after M48 up to the first tool T1Csomething with M71
* Delete the last two lines (T0 & M30)
* Save the result and use that in Carbide Copper

## Project-PTH.drl before edits:
{% highlight text %}
M48
; DRILL file {KiCad (6.0.11)} date Fri Feb  3 17:03:56 2023
; FORMAT={3:3/ absolute / metric / suppress leading zeros}
; #@! TF.CreationDate,2023-02-03T17:03:56-08:00
; #@! TF.GenerationSoftware,Kicad,Pcbnew,(6.0.11)
; #@! TF.FileFunction,Plated,1,2,PTH
FMAT,2
METRIC,TZ
; #@! TA.AperFunction,Plated,PTH,ComponentDrill
T1C1.000
%
G90
G05
T1
X5080Y12560
X5080Y10020
X5080Y7480
X5080Y4940
X12700Y12560
X12700Y10020
X12700Y7480
X12700Y4940
T0
M30
{% endhighlight %}

## Project-PTH.drl after edits:
{% highlight text %}
M48
M71
T1C1.000
%
G90
G05
T1
X5080Y12560
X5080Y10020
X5080Y7480
X5080Y4940
X12700Y12560
X12700Y10020
X12700Y7480
X12700Y4940
{% endhighlight %}