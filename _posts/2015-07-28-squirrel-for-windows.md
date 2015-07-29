---
layout: post
title:  "Squirrel for Windows"
date:   2015-07-28 21:07
categories: programming
comments: True
---
# Squirrel: It's like ClickOnce but Works
Squirrel for Windows is nifty. It really meets the goals set out for it in the
[README](https://github.com/Squirrel/Squirrel.Windows/master/README.md).  It's
fast, it makes setup that doesn't need wizards, UAC, etc. And if you already know
how to make nuspec's and nupkg's, it's easy to use for the developer too.

However, I didn't already know how to make nuspec's and nupkg's, plus I wanted
to generate setup.exe from my Makefile after building my .exe without an
intervening GUI. That is, all command line. And using mingw32 entirely without
Visual Studio.

It turns out, it's pretty easy and not tricky, but I couldn't find a step-by-step,
so I thought I'd make one.

## Install the tools

I'm assuming you're already up and running with mingw32 and building your project
with gnu make. So now you need nuget.exe and squirrel.exe.

- Nuget Client, Command-Line Utility version is #4 on the (Installing NuGet
Client)[https://docs.nuget.org/consume/installing-nuget].

- Squirrel.exe is in Squirrel.Windows-0.99.2.zip on the (Squirrel.Windows' github
  releases)[https://github.com/Squirrel/Squirrel.Windows/releases] page.

Unzip 'em and put them in a folder on your path.

## Create the .nuspec file

It's a simple xml text file. Mine is at
(gpx.nuspec)[https://github.com/markwal/GpxUi/blob/master/gpx.nuspec].
{% highlight xml %}
<?xml version="1.0"?>
<package>
  <metadata>
    <id>GpxUi</id>
    <version>0.0.0</version>
    <authors>Mark Walker, WHPThomas, Dan Newman</authors>
    <owners>Mark Walker</owners>
    <licenseUrl>https://raw.githubusercontent.com/markwal/GpxUi/master/LICENSE</licenseUrl>
    <projectUrl>http://github.com/markwal/GpxUi</projectUrl>
    <iconUrl>https://raw.githubusercontent.com/markwal/GpxUi/master/gpx.ico</iconUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>GPX is a post processing utility for converting gcode output from 3D slicing software to x3g files for standalone 3D printing on Makerbot printers.</description>
    <copyright>Copyright 2013-2015, portions copyright 2008, all rights reserved</copyright>
    <tags>gcode x3g makerbot</tags>
  </metadata>
</package>
{% endhighlight %}

[Nuspec Reference](https://docs.nuget.org/Create/NuSpec-Reference)

Some notes: First, "version" is required, but mine is essentially blank, I
intend to override it with a -Version on the command line to nuspec.exe. Also,
the "Publisher" field that shows up on the Uninstall list in Windows Control
Panel comes from `<authors>` above, but it takes only the first author up to the
first comma.  I intended to list the authors with me at the end since that 
would match chronology, but then I put somebody elses name in the publisher
field which seems like if I screw something up gets the wrong person in trouble.
Some nuspec/nupkg authors recommend listing the `<files>` here, but not me, I
make the directory tree hold the files and run nuget on that.

## Create the .nupkg file

First I make a directory tree that contains all the files I want in setup. I
use relative paths and a combination of `cp` and `windeployqt` since this is a
Qt project. And then I call nuget.exe on it.  From the Makefile:
{% highlight make %}
GPXUI_VERSION = $(shell git describe --tag --dirty)
SQUIRRELWIN = build/squirrel.windows/
SQUIRRELWINBIN = build/squirrel.windows/lib/net45/

squirrel.windows:
	mkdir -p $(SQUIRRELWINBIN)
	cp GPX/src/gpx/win32_obj/gpx.exe $(SQUIRRELWINBIN)
	cp build/mingw32/release/GpxUi.exe $(SQUIRRELWINBIN)
	windeployqt --release-with-debug-info --no-plugins --no-translations $(SQUIRRELWINBIN)GpxUi.exe
	nuget pack gpx.nuspec -Version $(GPXUI_VERSION) -BasePath $(SQUIRRELWIN) -OutputDirectory $(SQUIRRELWIN)
{% endhighlight %}

[Nuget CLI Reference](http://docs.nuget.org/consume/Command-Line-Reference)
  (the `pack` command is the interesting one for making squirrel setup)

You'll note here that I put everything (.exe's, .dll's) into lib/net45 hanging
off of my BasePath. This is intentional. It's what Squirrel.Windows expects. I
believe it is an artifact of reusing .nupkg's for the purpose and wanting it to
be a no prompt install.

## And then let Squirrel do its thing

This command goes at the end of that Makefile recipe above, but I break it out
here so I can put in some more links.

{% highlight bash %}
	Squirrel --releasify build/squirrel.windows/GpxUi.$(GPXUI_VERSION).nupkg --releaseDir=$(SQUIRRELWIN)release
{% endhighlight %}

And in that output directory (or in ./releases if you don't specify), you'll
find a setup.exe that puts all of those files from lib/net45 in a folder in
the local appdata folder. Usually %USERPROFILE%/AppData/Local/YourAppNameHere.
Where your app name comes from the `id` tag in the nuspec.

It also drops shortcuts for every .exe on the desktop and puts them in the start
menu. Apparently you can customize this behavior but I haven't got to that yet.

And it runs all the .exe's. Also customizable with an event handler, but like I
say, I haven't got that far yet.

Squirrel.Windows docs:
- [Getting Started](https://github.com/Squirrel/Squirrel.Windows/blob/master/docs/getting-started.md)
- [Squirrel Events](https://github.com/Squirrel/Squirrel.Windows/blob/master/docs/squirrel-events.md)
- [Docs Folder](https://github.com/Squirrel/Squirrel.Windows/tree/master/docs)
