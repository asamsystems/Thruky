## Theme Asam for Thruk Monitoring
Bootstrap 4 wrapped theme for Thruk Monitoring (http://www.thruk.org)  
The idea behind this is to overlay an existing thruk theme (Thruk2) with Bootstrap 4 and lay-out manipulation with jQuery.  
None but 3 existing thruk files needed customization for this to work.  
\
All Thruk features should work because all HTML tags, id's, classes are untouched.  
Go ahead and give it try.  
### Install/enable Asam theme:
First cd to your themes dir eg. `thruk/themes/themes-available`
```
wget github.... 
unzip Asam.zip  (This wil create dir Asam)
cp -r Thruk2 Asam  (some dirs already exist)
mv Asam/stylesheets/Thruk2.css Asam/stylesheets/Asam.css
cp ../../templates/side.tt Asam/templates
cp ../../templates/_footer.tt Asam/templates
cp ../../templates/_header.tt Asam/templates
```
Now all the files are in place. Next, edit the 3 template files:

- Edit Asam/templates/side.tt and insert script bootstrap and common.js near the bottom:  
```
[% IF use_frames %]
<script src='[% url_prefix %]themes/[% theme %]/js/bootstrap.bundle.min.js' type="text/javascript" defer="defer"></script>
<script src='[% url_prefix %]themes/[% theme %]/js/common-footer.js' type="text/javascript" defer="defer"></script>
  </body>
</html>
[% END %]
```
- Edit Asam/templates/_footer.tt and add following near the bottom:  
> Note: eventhough etc/thruk/ssi/common-footer.ssi is available, unfortunately not all \*.tt include common-footer.ssi (eg. config\*,  history.tt, main.tt, side.tt, etc).  
Workaround is to add our footer scripts to _footer.tt
```
Replace: [% ... ssi_footer; ... %] with:
<script src='[% url_prefix %]themes/[% theme %]/js/bootstrap.bundle.min.js' type="text/javascript" defer="defer"></script>
<script src='[% url_prefix %]themes/[% theme %]/js/common-footer.js' type="text/javascript" defer="defer"></script>
```
- Edit Asam/templates/_header.tt and add class _fade_ to body tag. This will minimize screen flickering while page is being loaded:
```
 <body style=.... class=fade ....
```

- Enable the new Asam theme, create a link to thruk/themes/themes-available/Asam:  
	* go to dir **etc**/thruk/themes/themes-enabled  
	* create link eg. `ln -s ../../../share/thruk/themes/themes-available/Asam Asam`  

That's it your done :-)  
Restart Thruk to make it aware of the new theme and files. Once logged on, change your theme to Asam.  
More info can be found here https://www.thruk.org/documentation/themes.html#_installation

--------
