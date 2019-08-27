# Thruk
Bootstrap 3 wrapped theme and plugin for Thruk Monitoring (http://www.thruk.org)
I have create theme 'Asam' and plugin 'conf_asam'. The idea is to leave as much code a possible untouched while trying to wrap them in Bootstrap. Unfortunately  the wrapping has made it version dependent.

# Version
To find the theme/plugin suitable for your Thruk version have a look at the Github Release/Tag.
Eg. Tag 2.30-3_1 means this theme/plugin is for Thruk version 2.30-3. the `_1` indicates the theme/plugin update sequence.

# Howto Asam theme
Adding the `Asam` theme to your Thruk installation is really simple:
- Download and copy the themes/Asam dir to your thruk/themes/themes-available dir
- create a link from thruk/themes/themes-enabled to thruk/themes/themes-available/Asam
- If you are using OMD: create a link from omd/sites/<your site name>/etc/thruk/themes-enabled to share/thruk/themes/themes-available/Asam
- refresh your thruk page and select theme Asam
