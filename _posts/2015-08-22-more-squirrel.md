---
layout: post
title:  "More Squirrel"
date:   2015-08-22 19:10
categories: programming
comments: True
---
# Getting fancy
OK, so up through the last post, we'd figured out how to use Squirrel for
Windows to install stuff. In that simple configuration, Squirrel creates an icon
on the desktop and in the start menu for every .exe it finds in the package.

But...

No auto-update yet, and the diffs that it generated are going to waste. And also,
I didn't actually _want_ a shortcut for all of the .exe's.

# Telling Squirrel which shortcuts to make
So first we want to figure out how to install only the shortcuts we want. In my
case, I have a backround .exe that can be used from the command line, but is
entirely useless when launched from a shortcut, so how do we supress the
shortcut for it?

It's worth repeating here that the goal is to use Squirrel for Windows without
using .Net ourselves, so we need to call back and forth from Squirrel without
using those assembly calls. The answer is launching with command line
parameters. In this case, we want to use command line arguments both directions.

We want to call Update.exe with "--createShortcut=our.exe" and we need to handle
"our.exe --install x.y.z.m" after Update.exe installs us so we know when to call
back with createShortcut. Also we need to let Update.exe know that's what we're
doing somehow so it calls us and doesn't create the shortcuts itself.

This first bit on handling events is covered in [Handling Squirrel
Events](https://github.com/Squirrel/Squirrel.Windows/blob/master/docs/squirrel-events.md)

# VERSIONINFO block
The way Squirrel knows we're an enlightened application and want to handle the
events is by including a VERSIONINFO block in the executable with a special
VALUE in it "SquirrelAwareVersion" that is set to "1". You add this to your
exe resources via the rc compiler. Mine looks like this:

{% highlight text %}
#include "build/version.h"
#include <winver.h>

1 ICON DISCARDABLE "gpx.ico"

1 VERSIONINFO
  FILEVERSION GPXUI_RCVERSION
  PRODUCTVERSION GPXUI_RCVERSION
  FILEFLAGSMASK 0x3fL
  FILEFLAGS 0x0L
  FILEOS VOS_NT_WINDOWS32 // 0x40004L  // VOS_NT_WINDOWS32
  FILETYPE VFT_APP // 0x1L    // VFT_APP
  FILESUBTYPE 0x0L
BEGIN
    BLOCK "StringFileInfo"
    BEGIN
        BLOCK "040904b0" // en-us unicode
        BEGIN
            VALUE "CompanyName", "MarkWal"
            VALUE "FileDescription", "File converter from .gcode to .x3g"
            VALUE "FileVersion", GPXUI_VERSION
            VALUE "InternalName", "GpxUi.exe"
            VALUE "LegalCopyright", "Copyright (c) 2015. All rights reserved."
            VALUE "OriginalFilename", "GpxUi.exe"
            VALUE "ProductName", "GpxUi"
            VALUE "ProductVersion", GPXUI_VERSION
            VALUE "SquirrelAwareVersion", "1"
        END
    END
    BLOCK "VarFileInfo"
    BEGIN
        VALUE "Translation", 0x409, 1200 // en-us unicode
    END
END
{% endhighlight %}

There are a few gotchas here. One is that Squirrel looks specifically for the
English US unicode StringInfoBlock, so if you don't have 0x40904b0 there,
Squirrel will miss it. Also, if you don't have the required fields before the
BEGIN block it won't end up in the .exe (and it seemed to me that windres failed
silently).

# Incoming command line
With that SquirrelAwareVersion, now the automatic creating of shortcuts doesn't
happen any more. So we need to do it. Actually, we should handle all of the
command line arguments that squirrel will send and do the necessary and exit
quickly with a success.  Squirrel events that we could see on the command line
are:

{% highlight text %}
--squirrel-install x.y.z.m
--squirrel-firstrun
--squirrel-updated x.y.z.m
--squirrel-obsolete x.y.z.m
--squirrel-uninstall x.y.z.m
{% endhighlight %}

That x.y.z.m as the argument parameter is the version number that squirrel is
acting upon.

Now, when squirrel calls us with --squirrel-install we want to turn around and
launch Update.exe with --createShortcut=our.exe. And likewise when we get
--squirrel-uninstall we want to turn around and call Update.exe with
--removeShortcut=our.exe

# Outgoing command line
We also want to add auto updating to our application, so we need to call
Update.exe for that too. We'll do `Update.exe --download=url` to check for
available updates occasionally and `Update.exe --upgrade=url` to upgrade us to
the latest version. Squirrel will put the new version of our application in a
new folder so it takes effect after the user quits the old one and starts the
app again.

When called this way Update.exe outputs the percentage completed to stdout so if
your app can read that it can show the user progress as squirrel does its work.
Also when --download is complete it returns some json describing the current
version and the most recent available version. You can see it your self by
calling Update.exe from the command line by hand.

# Files in the url location
When you upload your release you need a place to put setup.exe, RELEASES and the
nupkg's. Squirrel builds RELEASES but only puts local paths in it. You can have
them be full urls, so, for example, you could put each releases' packages in
separate folders as long as the path in RELEASES is correct.
