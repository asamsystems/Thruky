## Theme Asam for Thruk Monitoring
Bootstrap 4 wrapped theme for Thruk Monitoring (http://www.thruk.org) version 3.34 and up.  
The idea behind this is to overlay an existing thruk theme (ie. Thruk2) with Bootstrap 4 and manipulate lay-out using jQuery.  
None but 3 existing thruk files needed customization for this to work.  
\
All Thruk features should work because all HTML tags, id's, classes are untouched.  
I am not an expert on Bootstrap nor jQuery so **ALL help and feedback is welcome**.  
Please dot not hesitate to contact me... Go ahead and give it a try.  
### Install/enable Asam theme:
First cd to your themes dir ie. `thruk/themes/themes-available`
```
download zip file here and unzip in thruk/themes/themes-available/
You only need to save the Asam dir from the unzipped file ie. thruk/themes/themes-available/Asam

We wil be using the Thruk2 theme as template: 
Copy all files and dirs in Thruk2 to Asam (some dirs already exist)

mv Asam/stylesheets/Thruk2.css Asam/stylesheets/Asam.css
cp thruk/templates/side.tt thruk/themes/themes-available/Asam/templates
cp thruk/templates/_footer.tt thruk/themes/themes-available/Asam/templates
cp thruk/templates/_header.tt thruk/themes/themes-available/Asam/templates
```
Now all the files are in place. Next, edit the 3 template (*.tt) files:

- Edit Asam/templates/side.tt and insert script bootstrap and common.js:  
```
add class "fade" to body tag. This will minimize screen flickering while page is loading:
<body class='fade navbar'

edit near bottom:

[% IF use_frames %]
<script src='[% url_prefix %]themes/[% theme %]/js/bootstrap.bundle.min.js' type="text/javascript" defer="defer"></script>
<script src='[% url_prefix %]themes/[% theme %]/js/common-footer.js' type="text/javascript" defer="defer"></script>
  </body>
</html>
[% END %]
```
- Edit Asam/templates/_footer.tt and replace and add following near the bottom:  
> Note: eventhough etc/thruk/ssi/common-footer.ssi is available, unfortunately not all \*.tt include common-footer.ssi (eg. config\*,  history.tt, main.tt, side.tt, etc).  
Workaround is to add our footer scripts to _footer.tt
```
Replace: [% ... ssi_footer; ... %] with:
<script src='[% url_prefix %]themes/[% theme %]/js/bootstrap.bundle.min.js' type="text/javascript" defer="defer"></script>
<script src='[% url_prefix %]themes/[% theme %]/js/common-footer.js' type="text/javascript" defer="defer"></script>
```
- Edit Asam/templates/_header.tt and add class _fade_ to body tag. This will minimize screen flickering while page is loading:
```
 <body style=.... class="fade [% page....
```

- Enable the new Asam theme, create a link to thruk/themes/themes-available/Asam:  
	* go to dir **etc**/thruk/themes-enabled  
	* create link eg. `ln -s ../../../share/thruk/themes/themes-available/Asam Asam`  
	* you may change Thruk's theme to Asam.

That's it your done :-)  
Restart Thruk to make it aware of the new theme and files. Once logged on, change your theme to Asam.  
More info can be found here https://www.thruk.org/documentation/themes.html#_installation

