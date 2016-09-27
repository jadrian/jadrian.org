var Modes = {
  CV : 0,
  RES: 1
}
var mode, print_mode;

function SetModeResume() {
  mode = Modes.RES;
  var hash = '';
  $('.cv_only').hide();
  if(print_mode) {
    $('.res_only:not(.screen_only)').show();
    hash += 'print';
  } else {
    $('.res_only:not(.print_only)').show();
  }
  $('#sw-eng').insertBefore('#teach');
  $('#pubs').insertAfter('#service');
  $('#education').insertAfter('#work');
  document.location.hash = hash;
  document.title = 'Resumé — Jadrian Miles';
}
function SetModeCV() {
  mode = Modes.CV;
  var hash = 'cv';
  $('.res_only').hide();
  if(print_mode) {
    $('.cv_only:not(.screen_only)').show();
    hash += '&print';
  } else {
    $('.cv_only:not(.print_only)').show();
  }
  $('#teach').insertBefore('#sw-eng');
  $('#pubs').insertBefore('#work');
  $('#education').insertBefore('#pubs');
  document.location.hash = hash;
  document.title = 'Curriculum Vitae — Jadrian Miles';
}
function SetModePrint() {
  print_mode = true;
  $('.screen_only').hide();
  if(mode == Modes.CV) {
    $('.print_only:not(.res_only)').show();
  } else {
    $('.print_only:not(.cv_only)').show();
  }
}
function SetModeScreen() {
  print_mode = false;
  $('.print_only').hide();
  if(mode == Modes.CV) {
    $('.screen_only:not(.res_only)').show();
  } else {
    $('.screen_only:not(.cv_only)').show();
  }
}

function check_width() {
  // Viewport-size code from
  //   http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript
  // via StackOverflow (question 11309859)
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  var width = e[ a+'Width' ];
  // Rearrange header for narrow (mobile) displays.
  if(width <= 572) {
    $('#contact_left').insertAfter('h1');
  } else {
    $('#contact_left').insertBefore('h1');
  }
}
function insert_modeswitcher() {
  $('#modeswitcher').append(
    'Currently viewing in <span class="cv_only">CV style.  <a href="resume-resources/Jadrian Miles - CV.pdf">Download PDF.</a>  <a href="javascript:SetModeResume()">Switch to resum&eacute; style.</a></span><span class="res_only">resum&eacute; style.  <a href="resume-resources/Jadrian Miles - Resume.pdf">Download PDF.</a>  <a href="javascript:SetModeCV()" class="res_only">Switch to CV style.</a>'
  );
}
function body_load_actions() {
  insert_modeswitcher();
  check_width();
  window.onresize = check_width;
  mode = (document.location.hash.indexOf('cv') != -1) ? Modes.CV : Modes.RES;
  print_mode = (document.location.hash.indexOf('print') != -1);
  
  if(mode == Modes.CV) {
    SetModeCV();
  } else {
    SetModeResume();
  }
  if(print_mode) {
    SetModePrint();
  } else {
    SetModeScreen();
  }
}
