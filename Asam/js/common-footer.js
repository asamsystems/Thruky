/*
#<<<
# Copyright (c), 2021 ASAM Systems Manager BV
# ver=[20062]
# Contact: devteam@asamsystems.com
#>>>
// Called by Asam/templates/_footer.tt
// This way all objects (ie. framed-objects) are reachable
*/

$=jQuery;
var _seq=0;

//jstree/jQuery UI and bootstrap js conflict
//See https://github.com/twbs/bootstrap/issues/6094
var oldbtn=$.fn.button;
var newbtn = oldbtn.noConflict(); // reverts $.fn.button to jqueryui btn
$.fn.btn = newbtn; // assigns bootstrap button functionality to $.fn.btn

var insertCard=function(_id,_title,_foot='',_wrapAll=0){
  _seq++;

  if(_wrapAll){   //make master frame
    // https://api.jquery.com/next-adjacent-selector/#next-adjacent1
    // Eg. $('table.top_nav ~ *').wrapAll....  Make sure is child of 'body'
    if(_wrapAll=='prev'){
      $(_id).prev().wrapAll("<div id=card"+_seq+" class=card><div id=card-body"+_seq+"\
        class=card-body></div></div>");  //add card + body
    }else{
      $(_id).wrapAll("<div id=card"+_seq+" class=card><div id=card-body"+_seq+"\
        class=card-body></div></div>");  //add card + body
    }
  }else{
    $(_id).wrap("<div id=card"+_seq+" class=card><div id=card-body"+_seq+"\
      class=card-body></div></div>");  //add card + body
  }
  $("#card-body"+_seq).before("<div id=card-header"+_seq+" \
      class='h6 text-white text-center card-header bg-primary'>"+_title+"</div>"); //add header
  //$("#card-header"+_seq).css({'padding':'unset','background':'unset','color':'white','font-size':'14px'});
  if(_foot.length){
    insertCardFoot();
    $('#mytotal'+_seq).html(_foot);
  }
}

var insertCardFoot=function(_foot,_Seq=_seq){
  if(!$('#mytotal'+_Seq).length){   //dont create if card footer exists already
  $('#card-body'+_Seq).after('<div id=card-footer'+_Seq+' class="card-footer bg-light">\
    <div class=row>\
      <div id=mytotal'+_Seq+' class="col-4 text-left">\
        <!-- Totals here -->\
      </div>\
      <div id=mypagerBottom'+_Seq+' class="col-4 text-center">\
        <!-- pager here -->\
      </div>\
      <div id=myText'+_Seq+' class="col-4 text-right">\
        <!-- extra text here -->\
      </div>\
    </div>\
  </div>');
  }
  //if(_foot.length){$('#mytotal'+_Seq).html(_foot);}
}

var addButton=function(_sel='',_btnName='',_Seq=_seq,_type='dropdown'){  //required to be <a>..</a> links
  if(_type=='dropdown'){
    var _array='';
    $(_sel).each(function(i){
      if(typeof $(this).prop('outerHTML')==='undefined'){return true}
      if($(this).prop('outerHTML').match(/^<a/)){
      $(this).addClass('dropdown-item hint text-left');  //for <a elements only
    }
    _array=_array+$(this).prop('outerHTML');
  });

  _type="<div class=dropdown>\
        &nbsp;<button class='btn btn-sm btn-secondary dropdown-toggle' type=button data-toggle=dropdown>\
          "+_btnName+"\
        </button>\
        <div class='text-nowrap dropdown-menu'>\
          "+_array+"\
        </div>\
      </div>";

  }else if(_type=='link'){
//console.log($(_sel).prop('outerHTML'));
 
    $(_sel).addClass('btn btn-sm btn-secondary').attr('role','button').text(_btnName);
    _type="<div>&nbsp;"+$(_sel).prop('outerHTML')+"</div>";

/*
    _type="<div>\
        &nbsp;<button class='btn btn-sm btn-secondary' type=submit>\
          "+_btnName+"\
        </button>\
      </div>";
*/

  }else if(_type=='submit'){
    _type="<div>\
        &nbsp;<button class='btn btn-sm btn-secondary' type=submit>\
          "+_btnName+"\
        </button>\
      </div>";
  }


/*
  if(_type=='dropdown'){
    _type=_dropdown;
  }else{
    _type=_submit;
  }
*/

/*
  if(!$('#btngrp'+_Seq).length){ 
    addTopRowCardBody(_Seq);
    $('#btngrp'+_Seq).append(_type);
  }else{
    $('#btngrp'+_Seq).append(_type);
  }
*/

  if(!$('#btngrp'+_Seq).length){
    addTopRowCardBody(_Seq);
  }
  $('#btngrp'+_Seq).append(_type);

}

var addTopRowCardBody=function(_Seq=_seq){
  var _a="<div class=container-fluid style=padding:0>\
    <div class=row>\
      <div class='col-4 text-left'>\
        <div id=btngrp"+_Seq+" class=btn-group role=group>\
    </div>\
      </div>\
      <div id=mypagerTop"+_Seq+" class='col-4 text-center'>\
        <!-- pager here -->\
      </div>\
      <div id=myTextTop"+_Seq+" class='col-4 text-right'>\
        <!-- hint here -->\
      </div>\
    </div>\
  </div>\
  <p> </p>\
  <div id=myhint"+_Seq+" class='text-right'></div>";

  $('#card-body'+_Seq).prepend(_a);
}

var quickViewButton=function(){   //Quick View and Filter dropdown
  if($('td.linkBox').length){
    $('td.linkBox br').remove();  //clean up
    var _g='';
    $('td.linkBox').each(function(){  //sometimes <a>.. are separated with <tr>
      _g=_g+this.innerHTML;
    });
    addButton(_g,'Quick View');
    $('td.linkBox').hide();

//    $('td.linkBox br').remove();  //clean up
//    addButton($('td.linkBox').html(),'Quick View');
//    $('td.linkBox').hide();
  }
}

var filterButton=function (_pane='dfl_',_filt='#dfl_filter_button'){  //Filter links + Advanced filter icon
  //Format filter links for dropdown
  var _b=$(_filt+' > a').parent();         //only want the .hint with <a> selector in it
  var _filterPane='<div class=dropdown-divider></div>\
    <a href=# onclick=toggleFilterPane("'+_pane+'");return false;>Advanced</a>'
  if(_b.length){
    var _c=_b.html().replace(/>\s*[-\(\)]\s*<|>\s*\)\s+-\s*</g,'><').replace(/>\s*hosts\s*</,'>include hosts<');
    _b.html(_c);                         //this changes div.hint with <a> selector in it
    _b.append(_filterPane);
    _b=_b.html();
  }else{
    _b=_filterPane;
  }
  addButton(_b,'Filter'); 

  // Filter icon button
             //thruk js FORCES icon to be visible, suppress with opacity
  //$('[id=svc_filter_button],[id=hst_filter_button],[id=dfl_filter_button]').css({'opacity':'0%'});
  $('[id$=_filter_button]').not($('[id$=_new_filter_button]')).css({'opacity':'0%'});

  // Fix filterbox edges
  $('.newfilter').css({'vertical-align':'middle'});                        //Filter box
  $('.filter_container').addClass('table table-sm').css({'width':'auto'}); //Filter box
}

var utilsButton=function(_sel='td > a > button.thruk_btn.secondary',_Seq=_seq){
  //Utils icons
  var _f=[];
  $.each($(_sel), function(){
    var _title=$(this).attr('title');    //catch title value
    if(_title.length){                   //must have title
      var _s=$(this).parent(); //looks like: <a href="#" .."><button.. title="Add bookmark this page"></button></a>
      _s.text(_title);                   //REPLACE button with title value
      _f.push(_s);
    }
  });
  addButton(_f,'Utils',_Seq);  //_f is an array with each <a..>titlename</a>
  $('.hint').hide()
  $('div.dropdown-menu > a.dropdown-item').show(); //Because Tools icons are hidden so is this; unhide
}

var mypager=function(){
  //Pager at Top and Bottom (for Bottom Footer needs to be on) 
  if($('.pager_direct_link_current').length){
    if(!$('#btngrp'+_seq).length){addTopRowCardBody()};
    if(!$('#mypagerBottom'+_seq).length){insertCardFoot();} //create if card footer not exist
    var _pager=['#mypagerTop'+_seq,'#mypagerBottom'+_seq];
    $('.pager_direct_link_current').each(function(i){
      $(this).closest('form').appendTo($(_pager[i]));
    });
  }
}

var pageID=function(_pg){  // show page id on bottom of page
  $('body').append('<div class="small text-right">'+_pg+'</div>');
}

var rmType3=function(_sel){
  //_sel.replace(/[\n\r]+/g, '');
  _sel.contents().filter(function() {   //remove /[\s\(\)...]/
    return this.nodeType == 3;             //Node.TEXT_NODE
  }).remove();
}

//---------------------//
// ------- MAIN ------ //
//---------------------//
$('body').addClass('show');  //prevent flickering on (re-)load. See _header.tt for .fade
//$('body *').removeAttr('border cellspacing cellpadding align valign width');
$('div.navbar').css({'background-image':'unset','font-family':'unset'});
$('body').css({"background-image":"unset"});
$('.thruk_btn').addClass('small').removeClass('big');

// ---- MENU Side
$('.nav_small_logo').css({'width':'80%','position':'unset'}).removeAttr('width height'); //.removeAttr('height');
$('.navbar').css({'padding':'unset','background-color':'#d9d9d9'}); 
$('.navsection').addClass('card').removeClass('navsection').css('width','100%');
$('.navsectiontitle').addClass('card-header bg-primary').css({'padding':'unset','background':'unset','color':'white','font-size':'14px'});
$('div.navsectionlinks').addClass('card-body').css({'padding':'unset','text-align':'left'});

//[1001]Current Status>Hosts
if(referer.match(/status\.cgi.+style=hostdetail/)){ 
  pageID('[1001]');
  // ---- Wrap top_pane with BS Card
  //insertCard('table.top_nav ~ *','Hello','',1);
  insertCard('.infoboxrow','Global');

  var _table=['#hoststatusTable',$('.statusTitle').hide().text(),
    $('div.itemTotalsTitle').hide().text(),'dfl_','td > div.hint'];

  //Format:  insertCard('#hoststatusTable',_title,_foot,_wrapAll);
  insertCard(_table[0],_table[1],_table[2]);
  //SteekSleutel icon if hover over status tableheader:
  $('#'+_table[3]+'_btn_columns_hover').prependTo("#card-body"+_seq);
  quickViewButton();
  filterButton(_table[3],_table[4]);
  utilsButton(); 
  mypager();
  var _dd=$('td > div.hint:contains(with leftclick to send)'); //.hide();
  $('#myhint'+_seq).text(_dd.text());

//[1002]Current Status>Service,SG,HG
}else if(referer.match(/status\.cgi.+(style=detail|host=all|host=(?!.+&))/)){
  pageID('[1002]');
  //notice host=(?!.+&) above: click "View .. detail.." icon has no &style=detail
  insertCard('.infoboxrow','Global');

  var _table=['#statusTable',$('.statusTitle').hide().text(),
    $('div.itemTotalsTitle').hide().text(),'dfl_','td > div.hint'];

  insertCard(_table[0],_table[1],_table[2]);
  $('#'+_table[3]+'_btn_columns_hover').prependTo("#card-body"+_seq);
  quickViewButton();
  filterButton(_table[3],_table[4]);
  utilsButton();  
  mypager();
  var _dd=$('td > div.hint:contains(with leftclick to send)'); //.hide();
  $('#myhint'+_seq).text(_dd.text());

//[1003]Current Status->Problems
}else if(referer.match(/status\.cgi.+style=combined/)){ 
  pageID('[1003]');
  insertCard('table.top_nav ~ *',$('.statusTitle').hide().text(),'',1); //add Master card frame

  //notice 2-dim array
  var _table=[['#hoststatusTable','Host',
    $('div.itemTotalsTitle:contains("Matching Host")').hide().text(),
    'hst_','td > div.hint'],
    ['#statusTable','Service',
     $('div.itemTotalsTitle:contains("Matching Service")').hide().text(),
     'svc_','form > div.hint']
  ];

  $.each(_table,function(i){
    //Format:  insertCard('#hoststatusTable',_title,_total);
    insertCard(_table[i][0],_table[i][1],_table[i][2]);
    //steeksleutel icon if hover over status tableheader
    $('#'+_table[i][3]+'_btn_columns_hover').prependTo("#card-body"+_seq); 
    //Exception "problem page", section Services, has 'form' as parent:
    filterButton(_table[i][3],_table[i][4]);
    $('#card-header'+_seq).addClass('bg-light text-secondary').removeClass('bg-primary');

  });
  utilsButton('td > a > button.thruk_btn.secondary' ,2);  //set button in 2nd Card

  //Problems page, makitweb.com/how-to-add-important-to-css-property-with-jquery/
  $('#dfl_filterForm').attr('style', 'position: unset !important');  //tabel width

//[1004]Current Status->Host/Service Groups
}else if(referer.match(/status\.cgi.+style=overview/)){ 
  pageID('[1004]');
  insertCard('.infoboxrow','Global');
  var _table=['body>div>table',$('.statusTitle').hide().text(),'','dfl_','td > div.hint'];

  insertCard(_table[0],_table[1],_table[2]);
  //$('#'+_table[3]+'_btn_columns_hover').prependTo("#card-body"+_seq);
  quickViewButton();
  filterButton(); //_table[3],_table[4]);
  utilsButton();
  mypager();

  $('#card-body'+_seq+' table').addClass('table table-borderless');
  var _aa=$('#card-body'+_seq+'>table>tbody>tr>td'); //>div>table');
  _aa.each(function(i){
    var _wrap=$(this).children().children()[2]; //wrap the tables
    rmType3($(this).children());

    var _title=$(this).children().children().hide()[1];
    _title=$(_title).text(' [Commands]');
    _title=$(this).children().prop('outerHTML');
    insertCard(_wrap,_title);
    $('#card-header'+_seq).addClass('bg-light').removeClass('bg-primary');
    $('#card'+_seq+' *').show();
  });

//[1005]HG,SG Summary
}else if(referer.match(/status\.cgi.+style=summary/)){
  pageID('[1005]'); //]HG Summary
  insertCard('.infoboxrow','Global');
  var _table=['body>div>table',$('.statusTitle').hide().text(),'','dfl_','td > div.hint'];
  insertCard(_table[0],_table[1],_table[2]);
  $('#card-body'+_seq+'>table').addClass('table table-borderless');
  quickViewButton();
  filterButton(); //_table[3],_table[4]);
  utilsButton();
  mypager();

  var _aa=$('table.statusgroups '+['td.statusEven>a','td.statusOdd>a']).parent();
  rmType3(_aa);

  _aa.each(function(i){
    //rmType3($(this));
    var _bb=$(this).children('a')[1];
    $(_bb).text('[Command]');
  });


//[1006]HG,SG>Group Commands 
}else if(referer.match(/extinfo\.cgi.+type=(8|5)/)){
  pageID('[1006]'); //]HG Summary
  insertCard('.infoboxrow','Global');
  var _table=['body>div>table',$('body>div>table div.dataTitle').hide().text(),'','dfl_','td > div.hint'];
  insertCard(_table[0],_table[1],_table[2]);
  $('#card-body'+_seq+' table').addClass('table table-sm');
  quickViewButton();



//[1007] HG/SG grid view
}else if(referer.match(/status\.cgi.+style=grid/)){
  pageID('[1007]');
  insertCard('.infoboxrow','Global');

  var _as='hello'+_seq;  //lets create our own id
  $('body>div>div.status').parent().attr('id',_as);
  insertCard('#'+_as,$('.statusTitle').hide().text());
  quickViewButton();
  filterButton(); //'dfl_','td > div.hint');
  utilsButton();
  mypager();

  var _df=$('#'+_as);
  rmType3(_df.children('div'));

  var _tab=$(_df).children('table');
  _df.children('div').hide().each(function(i){
    var _bb=$(this).children('a')[1];
    $(_bb).text('[Command]');

    $(this).before('<p></p>');
    insertCard(_tab[i],$(this).html()); //get table[i] 

    $('#card-body'+_seq+'>table').addClass('table table-borderless');
    $('#card-header'+_seq).addClass('bg-light').removeClass('bg-primary');
    $('#card'+_seq+' *').show();
  });

//Network outages
}else if(referer.match(/outages\.cgi/)){
  pageID('[1007]');
  insertCard('.infoboxrow','Global');
  insertCard('body>div>table.data',$('.dataTitle').hide().text(),$('div.itemTotalsTitle').hide().text());
  $('#card-body'+_seq+'>table').addClass('table table-borderless');


//Tactical
}else if(referer.match(/tac\.cgi/)){
  pageID('[1008]');
  insertCard('.infoboxrow','Tactical Monitoring Overview');

  $('table.infoboxrow>tbody>tr').append('<td id=qwe></td>'); //add td with id
  $('table>tbody>tr>td>table.tac').appendTo('#qwe');

  //Network Health: get width of img graph bar
  var _health=[];  //1:host, 2:svc
  $.each($('div.health_bar_bg>img'),function(i){
    _health[i]=$(this).attr('width');
  });

  $('td.healthTitle').closest('table').appendTo('#qwe');
  $('table.infoboxrow *').removeAttr('border cellspacing cellpadding align valign width'); //width removes

  //Add back the img width
  $.each($('div.health_bar_bg>img'),function(i){
    $(this).attr('width',_health[i]);
  });

  insertCard('body>table.tac ~ *','Global State','','prev'); //add Master card frame
  utilsButton('div > a > button.thruk_btn.secondary');


//Performance Info
}else if(referer.match(/extinfo\.cgi\?type=4/)){
  pageID('[1009]');
  insertCard('.infoboxrow','Global');
  insertCard('.extinfo4',$('.dataTitle').hide().text());
  quickViewButton();


//Service/Host Info, extinfo
}else if(referer.match(/extinfo\.cgi\?type=[12]/)){
  pageID('[1010]');
  insertCard('.infoboxrow','Global');

  $('#card-body'+_seq+' *').removeAttr('border cellspacing cellpadding align valign width');
  $('table.infoboxrow').addClass('table table-borderless');
  $('td.ext_head_attributes br').remove();

  var _qq=[];
  $('td.ext_head_attributes').children().each(function(i){
    _qq[i]=[];
    if($(this).hasClass('data')){
      if($(this).text().match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)){
        _qq[i][0]='IP address';
        _qq[i][1]=$(this).text();
      }else{
        _qq[i][0]=$(this).text();
      }
    }else if($(this).hasClass('dataTitle')){  
      if(i>1 && _qq[i-1][0]==_qq[i-2][0]){  //if prev col val is same as the one before that
        _qq[i][0]=_qq[i-1][0];              //set col val same as prev col val
        _qq[i][1]=_qq[i-1][1]+' '+$(this).html(); //concat this val with prev val
        _qq[i-1][1]='';                     // empty [1]val we will select [0] and [1] with val only
      }else{ 
        _qq[i][0]=_qq[i-1][0];
        _qq[i][1]=$(this).html();
      }
    }else{
      if($(this).is('img')){
        _qq[i][0]=' ';
        _qq[i][1]=$(this).prop('outerHTML');
      }else{
        _qq[i][0]='Misc/Notes';
        _qq[i][1]=$(this).text(); //prop('outerHTML'); //.html();
      }
    }
    $(this).hide();  //hide here or outerhtml will include display:none
  });
  $('td.ext_head_attributes').prepend('<table class=infoBox style=width:unset;white-space:unset;><tr><td><div class=container>\
    <div class=row>\
      <div id=qaz class="text-left">\
        <!-- name here -->\
      </div>\
    </div>\
  </div></td></tr></table>');

  $.each(_qq,function(){
    if(this[0] && this[1]){
      //console.log(3,this);
      $('#qaz').append('<div><span class="h6 text-uppercase">'+this[0]+': </span><span class="h6 text-break"> '+this[1]+'</span></div>');
    }
  });


  insertCard('table.extdetails','State Information'); //$('.dataTitle').hide().text());
  quickViewButton();

  $('table.extdetails *').removeAttr('border cellspacing cellpadding align valign width'); //width removes
  $('td.action_menu').css('vertical-align','top');
  $('td.stateInfoPanel>table').addClass('table table-borderless');

  $('td.commentPanel').each(function(){
    insertCard($(this).children(),$(this).children('div.commentTitle').hide().text(),'',1);
    $('#card'+_seq+' [class=commandPanel],[id$=_comments_table],[id$=_downtimes_table]').addClass('text-left table').css('min-width','unset');
    $('#card-header'+_seq).addClass('bg-light text-secondary').removeClass('bg-primary');
    $('#card'+_seq).after('<p> </p>');
    $('#card'+_seq+' br').remove();
  });


}else if(referer.match(/avail\.cgi($|.+report_type=|.+get_date_parts=)/)){
  pageID('[1011]'); //Step 1,2,3 only

  if($('div.report_permalink>a').length){   //Step 3

//console.log(1,$('div.report_permalink>a').parent().contents().first());
//console.log(2,$('div.report_permalink>a'));
//    $('div.report_permalink>a').text('');     //clean <a> text
//    var _cd=$('div.report_permalink').text(); //store <div> text
//    var _cd=$('div.report_permalink>a').parent().contents().first();

//    $('div.report_permalink>a').text(_cd);    //set <a> text with <div> text
  }
  insertCard('.infoboxrow','Availability',$('div.report_permalink'));  //foot is null for step 1,2
  
  //mv data into .databoxrow
  $('table.infoboxrow td:nth-child(2)').append($('div.dateSelectTitle,.reportSelectTitle')).append($('body>div>form'));
  if($('input[name=email]').length){  //Step 3
    $('td.dateSelectItem').append(' or ',$('input[name=email]')); //mv Create E-mail Report btn
    $('div>b').parent().remove();
  }

}else if(referer.match(/avail\.cgi.+(show_log_entries|full_log_entries)|avail\.cgi\?(hostgroup=|servicegroup=)/)){
  pageID('[1012]');
  insertCard('.infoboxrow',$('table.infoboxrow div.dataTitle').hide().text());

  $('table.data,table.logEntries').each(function(i){
    var _dw=$('.dataTitle')[i+1];
    if(_seq==1){
      insertCard($(this),$(_dw).hide().text(),$('div.reportTime').hide().text());
      quickViewButton();
    }else{
      insertCard($(this),$(_dw).hide().text());
    }
    $(this).addClass('table');
  });
  $('table.optBox').addClass('table infoBox table-sm table-borderless');

}else if(referer.match(/trends\.cgi/)){   //($|.+input=)
  pageID('[1013]');
  var _title=$('table.infoboxrow div.dataTitle').hide().text()||'Trends';
  insertCard('.infoboxrow',_title);

  //mv data into .databoxrow
  $('table.infoboxrow td:nth-child(2)').append($('div.dateSelectTitle,.reportSelectTitle')).append($('body>div>form'));
  $('table.optBox').addClass('table infoBox table-sm table-borderless');

  if($('#trendsimage').length){
    insertCard($('div>img#trendsimage').parent(),'Trend');
    quickViewButton();
  }
}else if(referer.match(/history\.cgi/)){
  pageID('[1014]');
  insertCard('.infoboxrow','Alert History');
  $('table.optBox').addClass('table infoBox table-sm table-borderless');
  $('td.filter>table').first().addClass('table');

  //console.log($('form#date_form').next());
  insertCard($('form#date_form').next().next(),$('table.infoboxrow div.dataTitle').hide().text(),$('div.itemTotalsTitle').hide().text());
  //quickViewButton();  //somehow js event handling does not work for btn
  //utilsButton();
  mypager();


}else if(referer.match(/summary\.cgi/)){
  pageID('[1015]');

  insertCard('.infoboxrow','Alert Summary');

  //mv data into .databoxrow to 2nd and 3rd <td
  if($('div.dateSelectTitle').length){
    var _c=0;
    var _fg=$('div.dateSelectTitle');
    $('form').each(function(i){
      if($(this).attr('action')=='summary.cgi'){
        var _g=$(_fg)[_c];
        //console.log(1,_c,this,$(_g).html());
        $('table.infoboxrow td:nth-child('+(_c+2)+')').append($(_g)).append($(this));
        _c++;
      }
    });
  }else if($('table.data').length){
    var _op=$('div.dataSubTitle').contents().first().remove();
    insertCard('table.data',$('table.infoboxrow div.dataTitle').hide().text(),$(_op).text());
    $('table.data').addClass('table');
  }

}else if(referer.match(/notifications\.cgi/)){
  pageID('[1016]');
  insertCard('.infoboxrow','Notifications');
  $('table.optBox').addClass('table infoBox table-sm table-borderless');
  $('td.filter>table').first().addClass('table');

  insertCard($('table.notifications'),$('table.infoboxrow div.dataTitle').hide().text(),$('div.itemTotalsTitle').hide().text());
  $('table.notifications').addClass('table');
  utilsButton('div>a>button.thruk_btn.secondary');
  //mypager();


}else if(referer.match(/showlog\.cgi/)){
  pageID('[1017]');
  insertCard('.infoboxrow','Event Log');
  $('table.optBox').addClass('table infoBox table-sm table-borderless');
  $('td.filter>table').first().addClass('table');

  var _ke=$('div.dateTimeBreak,div.logEntries').wrapAll('<div id=qwe></div>');
  insertCard(_ke,'Log',$('div.itemTotalsTitle').hide().text(),1);

//  insertCard($('form').next().next(),'Log',$('div.itemTotalsTitle').hide().text());
  //$('table.notifications').addClass('table');
  utilsButton();
  mypager();


//Reporting
}else if(referer.match(/reports2\.cgi/)){
  pageID('[1018]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());

  if($('#statusTable').length){
    $('#card1').next().wrapAll('<div id=qwe></div>');
    insertCard('#statusTable',$('.dataTitle').hide().text());

    addTopRowCardBody();
    $('#btngrp'+_seq).html($('div#qwe>table td').first()); 
    $('#mypagerTop'+_seq).html($('div#qwe>table td').first());
    $('#myTextTop'+_seq).html($('div#qwe>table td').first());
    $('#statusTable').addClass('table').css('min-width','unset');
    $('#statusTable td').removeClass('mightOverflow50');
    
  }else if($('table.data.reports').length){
    var _pl='table.data.reports';
    insertCard(_pl,$('.dataTitle').hide().text());
    addButton(_pl+'>tbody>tr>th>a',' < Back ',_seq,'link');
    $('#mypagerTop'+_seq).append($(_pl+'>tbody>tr>th>button'));
    var _op=$(_pl+'>tbody>tr>th')[1];
    $('#card-header'+_seq).text($(_op).text());
    $(_pl+' th').hide();
    $(_pl+' td').css('border','unset');
    $(_pl).addClass('table table-borderless').css({'width':'unset'});

    $(_pl+' td.dataEven').each(function(){
      if($(this).children().hasClass('report_button')){return true;}  //skip create button
      if($(this).attr('colspan')=='3'){$(this).attr('colspan','0').addClass('h6');}
      $(this).addClass('text-right');
    });
  }
  $('.report_button').css('height','27px');


//Comments, Downtimes
}else if((referer.match(/extinfo\.cgi.+type\=[36]/)) && (referer.match(/^((?!recurring).)*$/))){
  pageID('[1019]');
  insertCard('.infoboxrow','Global');

  $('body>div>table').css('width','100%'); //addClass('table table-borderless');
  $('[id$=_comments_table],[id$=_downtimes_table]').each(function(i){
    var _tt=$('div.commentTitle,div.downtimeTitle')[i];
    insertCard($(this),$(_tt).hide().text());
    $('#card'+_seq).after('<p> </p>');

    addTopRowCardBody();     //add top row to BOTH cards
    if(!i){
      utilsButton();
      //$('#myTextTop'+_seq).html($('td.toolbar').children());
      $('#myTextTop'+_seq).html($('#table_search_input').parent().children());
    }
    $('#mypagerTop'+_seq).html($('div.comment')[i]);
    var _hq=$('div.hint')[i];
    $('#myhint'+_seq).html($(_hq).text());
    $(this).addClass('table table-sm');

  });
  //$('td[class^=comment]').css('white-space','unset');
  $('body br').not('#card1 *').remove();


//Recurring Downtimes
}else if(referer.match(/extinfo\.cgi.+recurring/)){
  pageID('[1020]');
  insertCard('.infoboxrow','Global');
  $('#card'+_seq).after('<p> </p>');

  if($('#recurring_downtimes_table_all').length){
  insertCard($('#recurring_downtimes_table_all'),$('div.downtimeTitle').hide().text());
  addTopRowCardBody();     //add top row to BOTH cards

  $('#mypagerTop'+_seq).html($('div.comment'));
  $('#myTextTop'+_seq).html($('#table_search_input').parent().children());
  $('body>div>table').css('width','100%'); //addClass('table table-borderless');
  $('#recurring_downtimes_table_all').addClass('table');
  $('body br').not('#card1 *').remove();
  }else{
    insertCard($('table.data.recurring_downtimes'),'Recurring Downtime');
    //$('table.data.recurring_downtimes').addClass('table table-sm');
  }


//External Command
}else if(referer.match(/cmd\.cgi/)){
  pageID('[1021]');
  insertCard('.infoboxrow','Global');
  insertCard('table.cmdOuterTable',$('div.cmdType').hide().text(),$('div.infoMessage').hide().text());
  $('table.cmdOuterTable').addClass('table table-borderless');


//Process Information
}else if(referer.match(/extinfo.cgi\?type=0/)){
  pageID('[1022]');
  insertCard('.infoboxrow','Global');
  insertCard('table#procInfoTable','Process Information');
  utilsButton('div > a > button.thruk_btn.secondary');
  $('#card'+_seq+' *').removeAttr('nowrap border cellspacing cellpadding align valign width'); //width removes
  $('#card'+_seq+' table').addClass('table'); //.removeClass('stateInfoTable1');
  $('#card'+_seq+' *').removeClass('stateInfoTable1');
  $('table.command td').addClass('table-sm align-middle');
  $('table.procInfo td').css('white-space','normal');

//Scheduling Queue
}else if(referer.match(/extinfo.cgi\?type=7/)){
  pageID('[1023]');
  insertCard('.infoboxrow','Global');
  insertCard('table.queue','Scheduling Queue');
  $('#card'+_seq+' *').removeAttr('nowrap border cellspacing cellpadding align valign width'); //width removes
  $('#card'+_seq+' table').addClass('table table-sm');
  $('table.queue td').addClass('align-middle');
  mypager();
  $('#myhint'+_seq).html($('div.statusSort').hide().text());

//Broadcast
}else if(referer.match(/broadcast\.cgi/)){
  pageID('[1024]');
  insertCard('.infoboxrow','Global');

  if($('table#statusTable').length){  
    insertCard('table#statusTable',$('.statusTitle,.dataTitle').hide().text());
    addButton($('td>a>button.thruk_button_add').parent().hide(),'&nbsp;New&nbsp;');
    var _jj=$('#btngrp'+_seq+' a>button').text();   //prettify button
    $('#btngrp'+_seq+' a').text(_jj);
    $('#myTextTop'+_seq).html($('#table_search_input').parent().children());

    //note used removeAttr for style, somehow width does not get removed
    $('#card'+_seq+' *').removeAttr('style nowrap border cellspacing cellpadding align valign width');
    $('#card'+_seq+' table').addClass('table table-sm');

  }else{
    insertCard('table.data',$('.dataTitle').hide().text());
    $('table.data').removeAttr('style nowrap border cellspacing cellpadding align valign width');
  }

//Configuration
}else if(referer.match(/config\.cgi/)){
  pageID('[1025]');
  insertCard('.infoboxrow','Global');
  $('#card'+_seq).after('<p> </p>');

  if($('div.reportSelectTitle').length){
  $('table.infoboxrow td:nth-child(2)').append($('div.reportSelectTitle')).append($('body>form'));

  }else{
    insertCard('table#configtable',$('.dataTitle').hide().text(),$('div.itemTotalsTitle').hide().text());
    addTopRowCardBody();     //add top row to BOTH cards
    $('#myTextTop'+_seq).html($('#table_search_input'));

    $('#card'+_seq+' *').removeAttr('style nowrap border cellspacing cellpadding align valign width');
    $('table#configtable').addClass('table table-sm text-left');
    //$('table#configtable th,td').css('white-space','normal');
  }

//side --> Config Tool (Overview)
}else if(referer.match(/conf\.cgi(\?sub=(all|thruk|backends|cgi|users|plugins))?$/)&&(!$('.conftoolobj').length)){
  pageID('[1026]');
  insertCard('.infoboxrow',$('div.dataTitle').hide().text()||$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  $('.confTable,.conftool,.conftoolusers').each(function(i){
    $(this).css('width','100%');
    var _kw=$('th.conftoolheader')[i];
    insertCard(this,$(_kw).hide().text());
    $(this).addClass('table'); //.css('width','unset'); 
  });


//Config Tool > Objects Tree browser
}else if(referer.match(/conf\.cgi\?sub=objects.+action=tree/)){
  pageID('[1027]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  insertCard('#treetable','');
  addTopRowCardBody();     //add top row to BOTH cards
  $('#btngrp'+_seq).append($('div.dataTitle>a').prop('outerHTML'));
  $('#btngrp'+_seq+'>a').attr('role','button').addClass('btn btn-sm btn-secondary text-white');
  $('div.dataTitle>a').remove(); //prevent adding this text to cardheader
  $('#card-header'+_seq).text($('div.dataTitle').hide().text());


//Config Tool > filesystem browser
}else if(referer.match(/conf\.cgi\?sub=objects.+action=browser/)){
  pageID('[1028]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');
//  $('table.conftoolobj,table.confdetails').css({'width':'100%','max-width':'unset'});


  var _kw=$('table.conftoolobj').parent();
  insertCard($(_kw)[0],$('#card'+_seq+' .dataTitle').hide().text());
  //$('#card'+_seq+' *').removeAttr('border cellspacing cellpadding align valign width');
  //$('#card'+_seq+' table.conftoolobj').addClass('table'); //.css('width','100%');

  insertCard('.confdetails','Browse filesystem');
  //$('#card'+_seq+' table.confdetails').css('width','100%');
  $('table.conftoolobj,table.confdetails').css({'width':'100%','max-width':'unset'});


  //$('table.conftoolobj,table.confdetails').css({'width':'unset','max-width':'unset'});
  //$('table').removeClass('conftoolobj confdetails');


//Config Tool > Object configuration
}else if(referer.match(/conf\.cgi\?sub=objects.+action=move/)){
  pageID('[1029]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  var _kw=$('table.conftoolobj').parent();
  insertCard($(_kw)[0],$('#card'+_seq+' .dataTitle').hide().text());
  //$('table.conftoolobj').addClass('table').css('width','100%');

  insertCard('table.confdetails',''); 
  addTopRowCardBody();     //add top row to BOTH cards
  $('#btngrp'+_seq).append($('#card'+_seq+' th.data>a').prop('outerHTML'));
  $('#btngrp'+_seq+'>a').attr('role','button').addClass('btn btn-sm btn-secondary text-white');
  $('#card'+_seq+' th.data>a').remove(); //prevent adding this text to cardheader
  $('#card-header'+_seq).text($('#card'+_seq+' th.data').text());

  //$('table.confdetails').css({'width':'unset','max-width':'unset'});
  $('table.conftoolobj,table.confdetails').css({'width':'100%','max-width':'unset'});



//Config Tool > Object configuration
}else if(referer.match(/conf\.cgi\?sub=objects.+apply/)){
  pageID('[1030]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  var _kw=$('table.conftoolobj'); //.parent();
  insertCard($(_kw)[0],$('#card'+_seq+' .dataTitle').hide().text());
  //$('table.conftoolobj').addClass('table').css('width','100%');

  insertCard('table.confdetails',''); //insert title next
  $('#card-header'+_seq).text($('td.dataUserVar').contents().first().text()||$('#card'+_seq+' th.data>a').first().text()||$('#card'+_seq+' td>div.dataTitle').first().hide().text());
// $('#card-header'+_seq).text($('#card'+_seq+' th.data>a').last().text());
//  $('table.confdetails').css({'width':'unset','max-width':'unset'});
  $('table.conftoolobj,table.confdetails').css({'width':'100%','max-width':'unset'});


/*
//Config Tool > Object configuration
}else if(referer.match(/conf\.cgi(\?sub=objects)?$/)){
  pageID('[1031]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  var _kw=$('table.conftoolobj').parent();
  insertCard($(_kw)[0],$('#card'+_seq+' .dataTitle').hide().text());
  //$('table.conftoolobj').addClass('table'); //.css('width','100%');

  insertCard('table.confdetails',''); //insert title next
  $('#card-header'+_seq).text($('td.dataUserVar').contents().first().text()||$('#card'+_seq+' th.data>a').first().text()||$('#card'+_seq+' td>div.dataTitle').first().hide().text());
// $('#card-header'+_seq).text($('#card'+_seq+' th.data>a').last().text());
//  $('table.confdetails').css({'width':'unset','max-width':'unset'});

  $('table.conftoolobj,table.confdetails').css({'width':'100%','max-width':'unset'});
*/



//Config Users
}else if(referer.match(/conf\.cgi\?sub=users/)){
  pageID('[1032]');
  insertCard('.infoboxrow',$('div.dataTitle').hide().text()||$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  $('.conftoolusers').each(function(i){
    //$(this).css('width','100%');
    var _kw=$('th.conftoolheader')[i]||$('td.dataUserVar')[i];
    if($(_kw).text().match(/Roles/)){_kw=$('td.dataUserVar')[i-1];} 
    insertCard(this,$(_kw).hide().text());
    $('#card'+_seq).after('<p> </p>');
    //$(this).addClass('table'); //.css('width','unset');
  });
  $('form>table').addClass('table');
  $('form>table>tbody>tr>td').css({'padding':'unset'});
  $('td.dataVal').css('white-space','unset');
  $('td.dataVal>table td').css('padding','unset');
  $('table.conftoolusers').css({'width':'100%','max-width':'unset'});


//Config Tool > Object configuration
}else if(referer.match(/conf\.cgi(\?sub=objects)?/)){
  pageID('[1031]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');

  var _kw=$('table.conftoolobj').parent();
  insertCard($(_kw)[0],$('#card'+_seq+' .dataTitle').hide().text());
  //$('table.conftoolobj').addClass('table'); //.css('width','100%');

  insertCard('table.confdetails',''); //insert title next
  $('#card-header'+_seq).text($('td.dataUserVar').contents().first().text()||$('#card'+_seq+' th.data>a').first().text()||$('#card'+_seq+' td>div.dataTitle').first().hide().text());
// $('#card-header'+_seq).text($('#card'+_seq+' th.data>a').last().text());
//  $('table.confdetails').css({'width':'unset','max-width':'unset'});

  $('table.conftoolobj,table.confdetails').css({'width':'100%','max-width':'unset'});


//Business Process
}else if(referer.match(/bp\.cgi/)){
  pageID('[1032]');
  insertCard('.infoboxrow',$('div.infoBoxTitle').text());
  $('#card'+_seq).after('<p> </p>');
  $('.infoboxrow br').remove();  //clean up

  if($('table#statusTable').length){
    insertCard('table#statusTable',$('.dataTitle').hide().text(),$('div.itemTotalsTitle').hide().text());
    utilsButton();
    $('#myTextTop'+_seq).html($('#filter').parent().parent());
    $('#myTextTop'+_seq+'>td').addClass('text-right').removeAttr('valign','align');
    $('#mypagerTop'+_seq).html($('a.bp_button').prop('outerHTML'));    
    $('td>div>a.bp_button').hide();
  }

  $('#bp_menu a').css({'width':'unset','height':'unset'});
  $('a[class$=button]').css('height','unset');


//Catch All
}else{
  pageID('[1099]');   //eg. MineMap, uses this bu #side also passes this
  if($('.infoboxrow').length){
    insertCard('.infoboxrow',$('div.infoBoxTitle').text()||'Global');
    $('#card'+_seq).after('<p> </p>');

    if($('.statusTitle,.dataTitle,.confTable').length){
       insertCard('table#statusTable,table.confTable',$('.statusTitle,.dataTitle').hide().text(),$('div.itemTotalsTitle').hide().text());
       if($('td.linkBox').length){quickViewButton();}
       if($('#dfl_filter_button').length){filterButton();}
       if($('td > a > button.thruk_btn.secondary').length){utilsButton();}
       //mypager();
    }
  }
}




