var paths = [
    "/bin/sh",
    "/bin/bash",
    "/etc/apt",
    "/usr/bin/sshd",
    "/usr/sbin/sshd",
    "/usr/libexec/sftp-server",
    "/private/var/stash",
    "/private/var/lib/apt",
    "/private/var/lib/cydia",
    "/private/var/tmp/cydia.log",
    "/Applications/Icy.app",
    "/Applications/Cydia.app",
    "/Applications/MxTube.app",
    "/Applications/RockApp.app",
    "/Applications/SBSettings.app",
    "/Applications/IntelliScreen.app",
    "/Applications/WinterBoard.app",
    "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
    "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
    "/Library/MobileSubstrate/MobileSubstrate.dylib",
    "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
    "/Library/MobileSubstrate/DynamicLibraries/LiveClock.list",
];

try {
    var resolver = new ApiResolver('objc');

    resolver.enumerateMatches('*[* *jail**]', {
        onMatch: function(match) {
            var ptr = match["address"];
            Interceptor.attach(ptr, {
                onEnter: function() {},
                onLeave: function(retval) {
                    retval.replace(0x0);
                }
            });
        },
        onComplete: function() {}
    });

    resolver.enumerateMatches('*[* fileExistsAtPath*]', {
        onMatch: function(match) {
            var ptr = match["address"];
            Interceptor.attach(ptr, {
                onEnter: function(args) {
                    var path = ObjC.Object(args[2]).toString();
                    this.jailbreakCall = false;
                    for (var i = 0; i < paths.length; i++) {
                        if (paths[i] == path) {
                            this.jailbreakCall = true;
                        }
                    }
                },
                onLeave: function(retval) {
                    if (this.jailbreakCall) {
                        retval.replace(0x0);
                    }
                }
            });
        },
        onComplete: function() {}
    });

    resolver.enumerateMatches('*[* canOpenURL*]', {
        onMatch: function(match) {
            var ptr = match["address"];
            Interceptor.attach(ptr, {
                onEnter: function(args) {
                    var url = ObjC.Object(args[2]).toString();
                    this.jailbreakCall = false;
                    if (url.indexOf("cydia") >= 0) {
                        this.jailbreakCall = true;
                    }
                },
                onLeave: function(retval) {
                    if (this.jailbreakCall) {
                        retval.replace(0x0);
                    }
                }
            });
        },
        onComplete: function() {}
    });

} catch (e) {
    console.log("error");
}
